const { app, BrowserWindow, session } = require('electron')
const { join } = require("path");
const { format } = require("url");
const isDev = process.env.NODE_ENV === 'development';

// 检查并加载必要的模块
let createServer;
let httpProxy;

try {
  const httpServer = require('http-server');
  createServer = httpServer.createServer;
  console.log('✅ http-server 模块加载成功');
} catch (error) {
  console.error('❌ http-server 模块加载失败:', error.message);
  console.error('请确保 http-server 已正确安装并打包到应用中');
  app.quit();
  return;
}

try {
  httpProxy = require('http-proxy');
  console.log('✅ http-proxy 模块加载成功');
} catch (error) {
  console.error('❌ http-proxy 模块加载失败:', error.message);
  // http-proxy 不是必需的，所以不退出应用
}

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

// // 创建代理服务器
// const proxy = httpProxy.createProxyServer({});

// // 启动代理服务器
// const proxyServer = proxy.listen(8080, 'localhost', () => {
//   console.log('Proxy server running on http://localhost:8080');
// });
// app.disableHardwareAcceleration();  // 禁用硬件加速（在旧版系统更稳定）

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow

// 启动本地服务器来服务静态文件
const triggerServer = (host, port, directory) => {
  const distPath = join(__dirname, directory);
  
  // 检查dist目录是否存在
  const fs = require('fs');
  if (!fs.existsSync(distPath)) {
    console.error(`Error: ${directory} directory not found at ${distPath}`);
    console.error('Please run "npm run build" first to build the frontend');
    app.quit();
    return null;
  }

  // 尝试使用 http-server，如果失败则使用内置的 http 模块
  if (createServer) {
    try {
      const server = createServer({
        root: distPath, // 指定服务器根目录
        cache: -1, // 禁用缓存
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });

      server.listen(port, host, () => {
        console.log(`✅ http-server running at http://${host}:${port}/`)
      }).on('error', (err) => {
        console.error('❌ http-server error:', err);
        if (err.code === 'EADDRINUSE') {
          console.error(`Port ${port} is already in use`);
        }
      });
      
      return server;
    } catch (error) {
      console.error('❌ http-server 启动失败，尝试使用内置服务器:', error.message);
    }
  }

  // 使用内置的 http 模块作为备选方案
  try {
    const http = require('http');
    const url = require('url');
    const path = require('path');
    const mime = require('mime-types');

    const server = http.createServer((req, res) => {
      let filePath = url.parse(req.url).pathname;
      
      // 默认提供 index.html
      if (filePath === '/') {
        filePath = '/index.html';
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
          res.writeHead(404);
          res.end('File not found');
          return;
        }
        
        const contentType = mime.lookup(fullPath) || 'application/octet-stream';
        res.writeHead(200, {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        res.end(data);
      });
    });

    server.listen(port, host, () => {
      console.log(`✅ 内置服务器 running at http://${host}:${port}/`)
    }).on('error', (err) => {
      console.error('❌ 内置服务器 error:', err);
    });
    
    return server;
  } catch (error) {
    console.error('❌ 内置服务器启动失败:', error.message);
    return null;
  }
}

function createWindow() {
  const port = "8070"
  const server1 = triggerServer("localhost", port, "dist");
  
  if (!server1) {
    return; // 如果服务器启动失败，直接返回
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

  mainWindow.loadURL("http://localhost:" + port);

  // 页面加载完成后显示窗口
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 开发环境下打开开发者工具
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // 关闭window时触发下列事件.
  mainWindow.on('closed', function () {
    mainWindow = null
    server1.close();
  })
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
app.on('ready', createWindow)

// 所有窗口关闭时退出应用.
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow()
  }
})

app.on("render-process-gone", function (event, webContents, details) {
  // 输出一下错误，进行具体处理
  console.error("render-process-gone", details);
  // 重启应用
  app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) });
  // 关闭所有窗口
  app.quit();
});


