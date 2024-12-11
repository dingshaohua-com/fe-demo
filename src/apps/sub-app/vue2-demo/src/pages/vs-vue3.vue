<template>
  <div>{{ message }}</div>
</template>
<script>
const len = 1000000;
const arr = new Array(len);
for (let i = 0; i < len; i++) {
  arr[i] = { id: i, name: "test" };
}
console.time("vue2:");
export default {
  data() {
    return {
      message: "Hello Vue!",
      arr,
    };
  },
  created() {
    console.timeEnd("vue2:");
  },
};
</script>
