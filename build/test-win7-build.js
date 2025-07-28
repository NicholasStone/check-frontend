const fs = require('fs');
const path = require('path');

console.log('🔍 验证 Windows 7 构建...');

const appPath = path.join('out', 'checker-win32-ia32');
const exePath = path.join(appPath, 'checker.exe');
const distPath = path.join(appPath, 'resources', 'app', 'dist');
const mainJsPath = path.join(appPath, 'resources', 'app', 'main.js');
const compatibilityPath = path.join(appPath, 'resources', 'app', 'win7-compatibility.js');

// 检查必要文件是否存在
const checks = [
  { name: '应用目录', path: appPath, type: 'dir' },
  { name: '可执行文件', path: exePath, type: 'file' },
  { name: 'dist目录', path: distPath, type: 'dir' },
  { name: 'main.js', path: mainJsPath, type: 'file' },
  { name: '兼容性配置', path: compatibilityPath, type: 'file' }
];

let allPassed = true;

checks.forEach(check => {
  try {
    const exists = check.type === 'dir' ? 
      fs.existsSync(check.path) && fs.statSync(check.path).isDirectory() :
      fs.existsSync(check.path) && fs.statSync(check.path).isFile();
    
    if (exists) {
      console.log(`✅ ${check.name}: 存在`);
    } else {
      console.log(`❌ ${check.name}: 不存在`);
      allPassed = false;
    }
  } catch (error) {
    console.log(`❌ ${check.name}: 检查失败 - ${error.message}`);
    allPassed = false;
  }
});

// 检查dist目录内容
if (fs.existsSync(distPath)) {
  const distFiles = fs.readdirSync(distPath);
  console.log(`📁 dist目录包含 ${distFiles.length} 个文件/目录`);
  
  if (distFiles.includes('index.html')) {
    console.log('✅ index.html 存在');
  } else {
    console.log('❌ index.html 不存在');
    allPassed = false;
  }
  
  if (distFiles.includes('assets')) {
    console.log('✅ assets 目录存在');
  } else {
    console.log('❌ assets 目录不存在');
    allPassed = false;
  }
}

// 检查文件大小
if (fs.existsSync(exePath)) {
  const stats = fs.statSync(exePath);
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(1);
  console.log(`📦 可执行文件大小: ${sizeInMB} MB`);
  
  if (stats.size > 50 * 1024 * 1024) { // 大于50MB
    console.log('✅ 文件大小正常');
  } else {
    console.log('⚠️ 文件大小可能过小');
  }
}

console.log('\n📋 构建总结:');
if (allPassed) {
  console.log('🎉 所有检查通过！应用应该可以在 Windows 7 上正常运行');
  console.log('\n📝 使用说明:');
  console.log('1. 将 out/checker-win32-ia32 目录复制到 Windows 7 系统');
  console.log('2. 双击 checker.exe 启动应用');
  console.log('3. 如果遇到问题，请检查 Windows 7 是否安装了最新的 Service Pack');
} else {
  console.log('❌ 构建存在问题，请检查构建过程');
}

console.log('\n🔧 兼容性改进:');
console.log('- 使用 Electron 22.3.26 (Windows 7 兼容)');
console.log('- 禁用硬件加速');
console.log('- 添加多个命令行开关');
console.log('- 改进错误处理');
console.log('- 自动构建前端代码'); 