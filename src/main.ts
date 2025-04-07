import { createApp } from 'vue'
import './shared/assets/style.css'
import App from './App.vue'
import router from './shared/router/router'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
