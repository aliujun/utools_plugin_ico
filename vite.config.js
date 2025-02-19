import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 根据命令行参数决定是构建应用还是库
export default defineConfig(({ command, mode }) => {
  const isLib = mode === 'lib'

  return {
    plugins: [vue()],
    base: './',
    build: isLib ? {
      // 库模式配置
      lib: {
        entry: resolve(__dirname, 'src/imageUtils.js'),
        name: 'imageUtils',
        fileName: (format) => `imageUtils.${format}.js`,
        formats: ['cjs']
      },
      outDir: 'dist',
      rollupOptions: {
        output: {
          exports: 'named'
        }
      }
    } : {
      // 应用模式配置
      outDir: 'dist/app',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'index.html')
        }
      }
    },
    server: {
      port: 3000
    }
  }
}) 