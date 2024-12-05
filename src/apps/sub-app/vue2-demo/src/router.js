import Vue from 'vue'
import VueRouter from 'vue-router'
import TcSched from "./pages/tc-sched.vue"
import CourseConflict1 from "./pages/course-conflict1.vue"
import CourseConflict2 from "./pages/course-conflict2.vue"


Vue.use(VueRouter)
// 定义路由
const routes = [
  { path: '/', redirect: { path: 'tc-sched' },},
  { path: '/tc-sched', component: TcSched },
  { path: '/course-conflict1', component: CourseConflict1 },
  { path: '/course-conflict2', component: CourseConflict2 },
]
 
// 创建 router 实例
export default new VueRouter({
  base:'/vue2-demo/',
  mode:'history',
  routes 
})