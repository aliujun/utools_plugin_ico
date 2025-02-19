const { promises: fs } = require('fs');
const { convertToIco } = require('./dist/imageUtils.cjs.js');

window.convertToIco = async (inputPath, sizes) => {
  try {
    // 读取源文件
    const imageData = await fs.readFile(inputPath);
    // 创建 data URL
    const base64 = imageData.toString('base64');
    const mimeType = inputPath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
    const dataUrl = `data:${mimeType};base64,${base64}`;

    // 转换为 ICO
    return await convertToIco(dataUrl, sizes);
  } catch (error) {
    throw new Error(`转换失败: ${error.message}`);
  }
};

window.saveFile = async (buffer, filePath) => {
  try {
    await fs.writeFile(filePath, buffer);
    return true;
  } catch (error) {
    throw new Error(`保存失败: ${error.message}`);
  }
};

// 添加uTools API包装函数
window.uToolsUtils = {
  showSaveDialog: (options) => {
    return window.utools.showSaveDialog(options);
  },
  showNotification: (message) => {
    return window.utools.showNotification(message);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  console.log('DOM已加载');
  console.log('uTools对象状态:', !!window.utools);
  console.log('uToolsUtils对象状态:', !!window.uToolsUtils);
});

// 添加错误处理
window.addEventListener('error', (event) => {
  console.error('全局错误:', event.error);
}); 