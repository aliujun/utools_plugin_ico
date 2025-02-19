/**
 * 将图片转换为指定尺寸的 PNG Buffer
 */
async function createPngBuffer(imagePath, size) {
  // 创建 canvas
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  // 加载图片
  const img = new Image()
  await new Promise((resolve, reject) => {
    img.onload = resolve
    img.onerror = reject
    img.src = imagePath
  })

  // 绘制图片
  ctx.drawImage(img, 0, 0, size, size)

  // 获取 PNG buffer
  const dataUrl = canvas.toDataURL('image/png')
  const base64 = dataUrl.split(',')[1]
  return Buffer.from(base64, 'base64')
}

/**
 * 创建 ICO 文件
 * 参考: https://en.wikipedia.org/wiki/ICO_(file_format)
 */
function createIcoFile(pngBuffers) {
  // ICO 文件头
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)     // Reserved
  header.writeUInt16LE(1, 2)     // Type: 1 for ICO
  header.writeUInt16LE(pngBuffers.length, 4)  // Number of images

  // 计算每个图片的偏移量
  let offset = 6 + (pngBuffers.length * 16)  // Header + Directory
  const directory = []
  const imageData = []

  pngBuffers.forEach(buffer => {
    // 读取 PNG 头部获取尺寸
    const width = buffer[16]
    const height = buffer[20]

    // 创建目录项
    const entry = Buffer.alloc(16)
    entry.writeUInt8(width, 0)    // Width
    entry.writeUInt8(height, 1)   // Height
    entry.writeUInt8(0, 2)        // Color palette
    entry.writeUInt8(0, 3)        // Reserved
    entry.writeUInt16LE(1, 4)     // Color planes
    entry.writeUInt16LE(32, 6)    // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8)  // Image size
    entry.writeUInt32LE(offset, 12)        // Image offset

    directory.push(entry)
    imageData.push(buffer)
    offset += buffer.length
  })

  // 合并所有部分
  return Buffer.concat([
    header,
    ...directory,
    ...imageData
  ])
}

/**
 * 将图片转换为ICO
 */
export async function convertToIco(inputPath, sizes = [16, 32, 48, 64, 128]) {
  try {
    // 生成不同尺寸的PNG
    const pngBuffers = await Promise.all(
      sizes.map(size => createPngBuffer(inputPath, size))
    )

    // 创建ICO文件
    return createIcoFile(pngBuffers)
  } catch (error) {
    throw new Error(`转换失败: ${error.message}`)
  }
} 