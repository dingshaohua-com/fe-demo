import Home from "./pages/home.vue";
import PageOne from "./pages/page-one.vue";
import Pagetwo from "./pages/page-two.vue";
import Vue2Demo from "./pages/vue2-demo.vue";
import Vue3Demo from "./pages/vue3-demo.vue";
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/page-one", component: PageOne },
  { path: "/page-two", component: Pagetwo },
  {
    path: "/vue2-demo-app",
    component: Vue2Demo,
  },
  {
    path: "/vue3-demo-app",
    component: Vue3Demo,
  },
];
export default createRouter({
  history: createWebHistory(),
  routes,
});
