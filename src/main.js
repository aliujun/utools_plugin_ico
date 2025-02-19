import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 添加错误处理
app.config.errorHandler = (err) => {
  console.error('Vue Error:', err)
}

app.mount('#app') 