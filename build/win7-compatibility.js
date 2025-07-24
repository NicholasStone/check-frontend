// Windows 7 兼容性配置
const win7Config = {
  // Electron 版本兼容性设置
  electronVersion: '22.3.26',
  
  // 命令行参数
  commandLineSwitches: [
    '--disable-gpu-sandbox',
    '--disable-software-rasterizer', 
    '--disable-dev-shm-usage',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-renderer-backgrounding',
    '--disable-features=TranslateUI',
    '--disable-ipc-flooding-protection',
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ],
  
  // BrowserWindow 配置
  browserWindowOptions: {
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      experimentalFeatures: false
    }
  },
  
  // 应用设置
  appSettings: {
    disableHardwareAcceleration: true,
    allowRendererProcessReuse: false
  }
};

module.exports = win7Config; 