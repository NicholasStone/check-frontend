const { app, BrowserWindow, session } = require('electron')
const { join } = require("path");
const { format } = require("url");
const isDev = process.env.NODE_ENV === 'development';
const http = require('http');
const fs = require('fs');
const url = require('url');

// Windows 7 兼容性配置
const win7Config = require('./win7-compatibility');

// Windows 7 兼容性设置
if (process.platform === 'win32') {
  if (win7Config.appSettings.disableHardwareAcceleration) {
    app.disableHardwareAcceleration();
  }
  
  // 应用所有命令行开关
  win7Config.commandLineSwitches.forEach(switchArg => {
    app.commandLine.appendSwitch(switchArg);
  });
}

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow;
let server;

// 简单的MIME类型映射
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject'
};

function getMimeType(filePath) {
  const ext = require('path').extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

function createServer(port, distPath) {
  return new Promise((resolve, reject) => {
    const httpServer = http.createServer((req, res) => {
      let filePath = url.parse(req.url).pathname;
      
      // 默认提供 index.html
      if (filePath === '/') {
        filePath = '/index.html';
      }
      
      // 移除开头的斜杠
      if (filePath.startsWith('/')) {
        filePath = filePath.substring(1);
      }
      
      const fullPath = join(distPath, filePath);
      
      // 安全检查：确保文件路径在dist目录内
      if (!fullPath.startsWith(distPath)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      
      fs.readFile(fullPath, (err, data) => {
        if (err) {
          // 如果文件不存在，尝试提供 index.html（用于SPA路由）
          if (filePath !== 'index.html') {
            const indexPath = join(distPath, 'index.html');
            fs.readFile(indexPath, (indexErr, indexData) => {
              if (indexErr) {
                res.writeHead(404);
                res.end('File not found');
              } else {
                res.writeHead(200, {
                  'Content-Type': 'text/html',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                });
                res.end(indexData);
              }
            });
          } else {
            res.writeHead(404);
            res.end('File not found');
          }
          return;
        }
        
        const contentType = getMimeType(fullPath);
        res.writeHead(200, {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        res.end(data);
      });
    });

    httpServer.listen(port, 'localhost', () => {
      console.log(`✅ 内置服务器运行在 http://localhost:${port}/`);
      resolve(httpServer);
    }).on('error', (err) => {
      console.error('❌ 内置服务器错误:', err);
      reject(err);
    });
  });
}

function createWindow() {
  const distPath = join(__dirname, 'dist');
  
  // 检查dist目录是否存在
  if (!fs.existsSync(distPath)) {
    console.error(`Error: dist directory not found at ${distPath}`);
    console.error('Please run "npm run build" first to build the frontend');
    app.quit();
    return;
  }

  session.defaultSession.clearCache(() => {
    console.log('Cache cleared===========================');
  });

  const windowOptions = {
    width: 800,
    height: 600,
    ...win7Config.browserWindowOptions,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      ...win7Config.browserWindowOptions.webPreferences
    }
  };

  mainWindow = new BrowserWindow(windowOptions);

  // 启动内置服务器并加载应用
  const port = 8070;
  createServer(port, distPath)
    .then((httpServer) => {
      server = httpServer;
      
      // 加载应用
      const appUrl = `http://localhost:${port}`;
      console.log('Loading app:', appUrl);
      mainWindow.loadURL(appUrl);

      // 页面加载完成后显示窗口
      mainWindow.once('ready-to-show', () => {
        mainWindow.show();
      });

      // 开发环境下打开开发者工具
      if (isDev) {
        mainWindow.webContents.openDevTools();
      }
    })
    .catch((error) => {
      console.error('Failed to start server:', error);
      app.quit();
    });

  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null;
    if (server) {
      server.close();
    }
  });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow);

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow();
  }
});

app.on("render-process-gone", function (event, webContents, details) {
  // 输出一下错误，进行具体处理
  console.error("render-process-gone", details);
  // 重启应用
  app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) });
  // 关闭所有窗口
  app.quit();
}); 