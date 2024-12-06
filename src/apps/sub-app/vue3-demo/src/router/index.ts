import { createWebHistory, createRouter } from "vue-router";
import Jsplumb from "../pages/jsplumb/index.vue";
import Schedule from "../pages/schedule/index.vue";
import Hello from "../pages/hello/index.vue";

const routes = [
  { path: "/", component: Jsplumb },
  { path: "/hello", component: Hello },
  { path: "/schedule", component: Schedule },
];

export default createRouter({
  history: createWebHistory("/vue3-demo"),
  routes,
});
