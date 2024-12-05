import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import microApp from '@micro-zoe/micro-app'



microApp.start({
    // 'router-mode': "native"
})
const app = createApp(App);
app.use(router).use(Antd).mount('#app');
