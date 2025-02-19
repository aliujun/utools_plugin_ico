# utools_plugin_ico

一个简单的 uTools 插件，用于将 PNG/JPEG 等图片格式转换为 ICO 图标文件。

## 功能特点

-   支持拖拽或选择图片文件
-   支持 PNG、JPEG 等常见图片格式
-   可选择多种输出尺寸（16x16 到 128x128）
-   使用 Canvas API 进行图片处理，无需额外依赖
-   简洁的用户界面

## 使用方法

1. 在 uTools 中安装插件
2. 通过以下方式启动插件：
    - 输入关键词：`ico`、`图标转换`、`图片转ico`
    - 或直接拖拽图片文件到 uTools 窗口
3. 选择要转换的图片
4. 选择需要的图标尺寸
5. 点击"转换为 ICO"按钮
6. 选择保存位置

## 开发相关

### 环境要求

-   Node.js >= 14
-   npm >= 6

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建插件

```bash
npm run build
```

构建完成后，插件文件将位于 `plugin` 目录中。

### 项目结构

```
png-to-ico/
  ├── src/                  # 源代码
  │   ├── components/      # Vue组件
  │   ├── App.vue         # 主应用组件
  │   ├── main.js         # 入口文件
  │   └── imageUtils.js   # 图片处理工具
  ├── plugin/              # 构建后的插件文件
  ├── scripts/             # 构建脚本
  └── ... 其他配置文件
```

## 技术栈

-   Vue 3
-   Vite
-   Canvas API

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解更多信息。

Copyright (c) 2025 liujun

## 作者

liujun

## 致谢

-   [uTools](https://u.tools/) - 强大的跨平台效率工具
-   [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
