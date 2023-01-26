import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 完整加载
import VueLuckyCanvas from '@lucky-canvas/vue' 

createApp(App).use(VueLuckyCanvas).mount('#app')
