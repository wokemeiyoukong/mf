import { createApp } from 'vue'
// import App from './App.vue'
import Container from './Container.vue'
import router from './routes'

import './style.css'
import './assets/styles/variable.less'
import { createPinia } from 'pinia'

createApp(Container).use(router).use(createPinia()).mount('#app')
