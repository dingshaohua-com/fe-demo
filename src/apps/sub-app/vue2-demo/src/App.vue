<template>
  <div class="app">
    <div class="app-info">
      <div class="tip">子应用</div>
      <div>技术：vue2、element ui</div>
    </div>
    <hr class="myhr" />
    <div class="navs">
      <el-tag
        v-for="item in navs"
        :key="item.path"
        :effect="activeIndex === item.path ? 'dark' : 'plain'"
        @click="handleSelect(item)"
      >
        {{ item.label }}
      </el-tag>
    </div>
    <el-divider/>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "@vue/composition-api";
import { useRoute, useRouter } from "vue2-helpers/vue-router";

const route = useRoute();
const router = useRouter();
const navs = [
  {
    path: "/hello",
    label: "主页",
  },
  {
    path: "/tc-sched",
    label: "排课",
  },
  {
    path: "/course-conflict1",
    label: "排课表1",
  },
  {
    path: "/course-conflict2",
    label: "排课表2",
  },
  {
    path: "/vs-vue3",
    label: "对比vue3",
  },
];


const activeIndex = ref("");
watch(()=>route.path,(val)=>{
  activeIndex.value = val;
  
},{immediate: true})
const handleSelect = (item) => {
  router.push(item.path);
};
</script>
<style scoped lang="scss">
.app {
  padding: 30px;
  .app-info {
    width: 300px;
    padding: 10px;
    height: 80px;
    margin: 10px 0;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    .tip {
      position: absolute;
      height: 20px;
      line-height: 20px;
      text-align: center;
      width: 80px;
      right: -20px;
      top: 10px;
      transform: rotate(45deg);
      background-color: #53f133;
      font-size: 12px;
      color: white;
    }
  }
  .myhr {
    margin: 10px 0;
    border-width: 1px;
    border-style: dashed;
    border-color: black;
  }

  .navs {
    margin: 10px 0;
    .el-tag {
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .content {
    padding-top: 30px;
    border-width: 2px;
  }
}
</style>
