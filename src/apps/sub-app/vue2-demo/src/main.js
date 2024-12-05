import Vue from 'vue'
import "./index.css"
import App from './App.vue'
import moment from "moment";
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import formCreate from '@form-create/element-ui'
import VueCompositionAPI from '@vue/composition-api'
import locale from 'element-ui/lib/locale/lang/zh-CN'

Vue.prototype.$moment = moment;
Vue.use(VueCompositionAPI)
Vue.use(ElementUI,{locale});
Vue.use(formCreate)
Vue.config.productionTip = false

console.log('__MICRO_APP_ENVIRONMENT__', window.__MICRO_APP_ENVIRONMENT__);


const app = new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// 卸载应用
window.unmount = () => {
  app.$destroy()
}