const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('开始构建 Windows 7 兼容版本（内置服务器版）...');

try {
  // 1. 清理之前的构建
  console.log('1. 清理之前的构建...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  if (fs.existsSync('out')) {
    fs.rmSync('out', { recursive: true, force: true });
  }

  // 2. 安装依赖
  console.log('2. 安装依赖...');
  execSync('npm install', { stdio: 'inherit' });

  // 3. 构建前端
  console.log('3. 构建前端...');
  execSync('npm run build', { stdio: 'inherit' });

  // 4. 验证dist目录
  console.log('4. 验证构建输出...');
  if (!fs.existsSync('dist')) {
    throw new Error('dist 目录不存在，构建失败');
  }

  // 5. 备份原始main.js并替换为内置服务器版本
  console.log('5. 准备内置服务器版main.js...');
  if (fs.existsSync('main.js')) {
    fs.copyFileSync('main.js', 'main.js.backup');
  }
  fs.copyFileSync('build/main-embedded.js', 'main.js');
  
  // 复制兼容性配置文件
  console.log('5.1. 复制兼容性配置文件...');
  fs.copyFileSync('build/win7-compatibility.js', 'win7-compatibility.js');

  // 6. 打包Electron应用
  console.log('6. 打包Electron应用...');
  execSync('npx electron-packager . checker --platform=win32 --arch=ia32 --electron-version=22.3.26 --overwrite --download.mirrorOptions.mirror=https://npmmirror.com/mirrors/electron/ --out=./out --ignore=src --ignore=.git --ignore=out --ignore=build --ignore=main.js.backup', { stdio: 'inherit' });

  // 7. 恢复原始文件
  console.log('7. 恢复原始文件...');
  if (fs.existsSync('main.js.backup')) {
    fs.copyFileSync('main.js.backup', 'main.js');
    fs.unlinkSync('main.js.backup');
  }
  
  // 删除临时复制的兼容性配置文件
  if (fs.existsSync('win7-compatibility.js')) {
    fs.unlinkSync('win7-compatibility.js');
  }

  // 8. 验证打包结果
  console.log('8. 验证打包结果...');
  const appPath = path.join('out', 'checker-win32-ia32');
  if (!fs.existsSync(appPath)) {
    throw new Error('打包失败，应用目录不存在');
  }

  console.log('✅ Windows 7 兼容版本构建成功！（内置服务器版）');
  console.log(`应用位置: ${appPath}`);
  console.log('可以在 Windows 7 系统上运行 checker.exe');
  console.log('注意：此版本使用内置HTTP服务器，不依赖外部模块');

} catch (error) {
  console.error('❌ 构建失败:', error.message);
  
  // 确保恢复原始main.js
  if (fs.existsSync('main.js.backup')) {
    fs.copyFileSync('main.js.backup', 'main.js');
    fs.unlinkSync('main.js.backup');
  }
  
  process.exit(1);
} 