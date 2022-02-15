import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css' // import global
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'// import './plugins/element.js'

createApp(App).use(router).use(ElementPlus).mount('#app')//
