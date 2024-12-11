import { createWebHistory, createRouter } from "vue-router";

const routes: any = [
  { path: "/", redirect: '/hello' },
  { path: "/hello", component:()=>import("../pages/hello/index.vue") },
  { path: "/schedule", component:()=>import("../pages/schedule/index.vue") },
  { path: "/jsplumb", component:()=>import("../pages/jsplumb/index.vue") },
  { path: '/vs-vue2', component: ()=>import("../pages/vs-vue2.vue") },
];

export default createRouter({
  history: createWebHistory("/vue3-demo"),
  routes,
});
