const { app, BrowserWindow } = require('electron')
const { join } = require("path");
const { format } = require("url");
const isDev = process.env.NODE_ENV === 'development';
const { createServer } = require('http-server');

// app.disableHardwareAcceleration();  // 禁用硬件加速（在旧版系统更稳定）

// 保持window对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let mainWindow

// vite build后的dist文件夹只能用http-server来启动服务, 直接点击加载不出来js
const triggerServer = (host, port, directory) => {
  const server = createServer({
    root: join(__dirname, directory) // 指定服务器根目录
  });

  server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`)
  })
  return server;
}

function createWindow() {
  const port = "8070"
  const server1 = triggerServer("localhost", port, "dist");
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false, // 可以使用require方法
      enableRemoteModule: true, // 可以使用remote方法
      webSecurity: false, // 它将禁用同源策略 (通常用来测试网站), 如果此选项不是由开发者设置的默认为true
    },
  })

  mainWindow.loadURL("http://localhost:" + port);

  mainWindow.webContents.openDevTools()

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


