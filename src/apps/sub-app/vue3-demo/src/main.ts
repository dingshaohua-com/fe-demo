
import "./style.css";
import "tailwindcss/tailwind.css"
import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import 'highlight.js/styles/stackoverflow-light.css'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import router from "./router/index"

hljs.registerLanguage('javascript', javascript);


const app = createApp(App);
app.use(hljsVuePlugin).use(ElementPlus).use(router).mount('#app');

console.log("子应用 vue3，是作为微应用吗？ ", window.__MICRO_APP_ENVIRONMENT__);

// 卸载应用
// @ts-ignore
window.unmount = () => {
  app.unmount()
}