# Windows 7 构建工具

本文件夹包含所有Windows 7兼容性构建相关的文件和工具。

## 文件说明

### 核心构建文件
- `build-win7-embedded.js` - 主要的构建脚本，使用内置HTTP服务器
- `main-embedded.js` - 内置HTTP服务器版本的主进程文件
- `win7-compatibility.js` - Windows 7兼容性配置

### 测试和文档
- `test-win7-build.js` - 构建结果验证脚本
- `WINDOWS7_COMPLETE_GUIDE.md` - 完整的Windows 7兼容性指南

## 使用方法

### 构建Windows 7兼容版本
```bash
npm run build:win7-embedded
```

### 验证构建结果
```bash
npm run test:win7
```

## 技术特点

### 内置HTTP服务器
- 使用Node.js内置`http`模块
- 无外部依赖
- 正确处理MIME类型
- 支持SPA路由

### Windows 7兼容性
- Electron 22.3.26版本
- 禁用硬件加速
- 多个命令行开关
- 改进错误处理

## 构建流程

1. 清理之前的构建
2. 安装依赖
3. 构建前端
4. 验证dist目录
5. 替换主进程文件
6. 打包Electron应用
7. 恢复原始文件
8. 验证打包结果

## 注意事项

- 构建过程中会临时替换main.js文件
- 构建完成后会自动恢复原始main.js
- 所有构建文件都会被忽略，不会打包到最终应用中
- 推荐使用内置服务器版本，这是解决所有Windows 7兼容性问题的最佳方案 