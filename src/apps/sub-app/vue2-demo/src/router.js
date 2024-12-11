import Vue from 'vue'
import VueRouter from 'vue-router'

// https://blog.csdn.net/weixin_47151361/article/details/138618651
let originPush =  VueRouter.prototype.push; 
VueRouter.prototype.push = function (location, resolve, reject){
  if (resolve && reject) {    //如果传了回调函数，直接使用
      originPush.call(this, location, resolve, reject);
  }else {                     //如果没有传回调函数，手动添加
      originPush.call(this, location, ()=>{}, ()=>{}); 
  }
}

Vue.use(VueRouter)
// 定义路由
const routes = [
  { path: '/', redirect: { path: 'hello' },},
  { path: '/hello', component: ()=>import("./pages/hello/index.vue")},
  { path: '/tc-sched', component: ()=>import("./pages/tc-sched.vue") },
  { path: '/course-conflict1', component: ()=>import("./pages/course-conflict1.vue") },
  { path: '/course-conflict2', component: ()=>import("./pages/course-conflict2.vue") },
  { path: '/vs-vue3', component: ()=>import("./pages/vs-vue3.vue") },
]
 
// 创建 router 实例
export default new VueRouter({
  base:'/vue2-demo',
  mode:'history',
  routes 
})