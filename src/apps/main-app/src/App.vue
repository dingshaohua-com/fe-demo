<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider>
      <div class="logo">❤ 前端示例 ❤</div>
      <a-menu
        id="dddddd"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        :items="items"
        @click="handleClick"
      ></a-menu>
    </a-layout-sider>
    <a-layout-content>
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive, ref, VueElement } from "vue";
import type { MenuProps, ItemType } from "ant-design-vue";

const router = useRouter();
const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: "group"
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType;
}

const items: ItemType[] = reactive([
  getItem("页面一", "page-one"),

  getItem("页面二", "page-two"),

  { type: "divider" },

  getItem("子应用 [vue2]", "child1"),
  getItem("子应用 [vue3]", "child2"),
]);

const handleClick: MenuProps["onClick"] = (e: any) => {
  const { key } = e;
  router.push(key);
};

// watch(selectedKeys, (val) => {
//   const [selectedKey] = val;
//   console.log(selectedKey);

//   
// });

router.afterEach((to) => {
  const [_,baseUrl] = to.path.split("/");
  selectedKeys.value.push(baseUrl)
});
</script>
<style>
.logo {
  line-height: 60px;
  height: 60px;
  margin: 6px;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  text-align: center;
  font-weight: 700;
}
</style>
