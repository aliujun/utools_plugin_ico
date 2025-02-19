const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

// 创建输出目录
const outputDir = path.join(__dirname, 'release')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

// 读取 plugin.json 获取插件信息
const pluginConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'plugin', 'plugin.json'), 'utf-8'))
const { name, version } = pluginConfig

// 使用插件名称和版本号作为文件名
const fileName = `${name}_${version}.upxs`
const outputPath = path.join(outputDir, fileName)
const tempZipPath = path.join(outputDir, 'temp.zip')

// 创建一个Promise来处理整个打包过程
const createPackage = () => {
  return new Promise((resolve, reject) => {
    const tempOutput = fs.createWriteStream(tempZipPath)
    const archive = archiver('zip', {
      zlib: { level: 9 }
    })

    tempOutput.on('close', () => {
      // 创建最终的upxs文件
      const finalOutput = fs.createWriteStream(outputPath)

      // 写入UPXS前缀
      finalOutput.write(Buffer.from('UPXS'))

      // 将zip内容附加到前缀后
      const zipContent = fs.readFileSync(tempZipPath)
      finalOutput.write(zipContent)

      finalOutput.on('finish', () => {
        // 删除临时zip文件
        fs.unlinkSync(tempZipPath)
        const finalSize = fs.statSync(outputPath).size
        console.log(`打包完成，大小：${(finalSize / 1024 / 1024).toFixed(2)}MB`)
        resolve()
      })

      finalOutput.end()
    })

    archive.on('error', (err) => {
      reject(err)
    })

    archive.pipe(tempOutput)

    // 从plugin目录添加文件
    const pluginDir = path.join(__dirname, 'plugin')
    const filesToInclude = fs.readdirSync(pluginDir)

    filesToInclude.forEach(file => {
      const filePath = path.join(pluginDir, file)
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath)
        if (stats.isDirectory()) {
          archive.directory(filePath, file)
        } else {
          archive.file(filePath, { name: file })
        }
      }
    })

    archive.finalize()
  })
}

// 执行打包
createPackage().catch(err => {
  console.error('打包失败:', err)
  process.exit(1)
}) 