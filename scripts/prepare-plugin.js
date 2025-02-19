const fs = require('fs')
const path = require('path')

// 清理并创建插件目录
const pluginDir = path.join(__dirname, '../plugin')
if (fs.existsSync(pluginDir)) {
  fs.rmSync(pluginDir, { recursive: true })
}
fs.mkdirSync(pluginDir)

// 清理release目录（如果存在）
const releaseDir = path.join(__dirname, '../release')
if (fs.existsSync(releaseDir)) {
  fs.rmSync(releaseDir, { recursive: true })
}

// 需要复制的文件列表
const filesToCopy = [
  'dist',
  'logo.png',
  'plugin.json',
  'preload.js'
]

// 复制文件
filesToCopy.forEach(file => {
  const sourcePath = path.join(__dirname, '..', file)
  const targetPath = path.join(pluginDir, file)

  if (fs.existsSync(sourcePath)) {
    if (fs.statSync(sourcePath).isDirectory()) {
      // 复制目录
      fs.cpSync(sourcePath, targetPath, { recursive: true })
    } else {
      // 复制文件
      fs.copyFileSync(sourcePath, targetPath)
    }
  }
})

console.log('插件文件已准备完成，位置：', pluginDir) 