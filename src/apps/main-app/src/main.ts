import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import microApp from "@micro-zoe/micro-app";

const oldConsoleLog = console.info;
console.info = function () {
  const [message] = arguments;
  if (message.indexOf("Download the Vue Devtools") === -1) {
    // @ts-ignore
    oldConsoleLog.apply(console, arguments);
  }
};

microApp.start({
  // 'router-mode': "native"
  iframeSrc: location.origin + "/empty.html",
});
const app = createApp(App);
app.use(router).use(Antd).mount("#app");
