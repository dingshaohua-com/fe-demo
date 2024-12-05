<template>
  <div class="timetable-page">
    <week-scheduler :task="timetableTask" />
  </div>
</template>
<script setup>
import { ref } from "@vue/composition-api";
import WeekScheduler from "../components/week-scheduler";
import { getUserDate } from "../components/week-scheduler/helper";

// 接口获取的排课数据
const timetableTask = ref([]);
getUserDate().then((res) => {
  timetableTask.value = res;
});
</script>
<style scoped>
.timetable-page {
  width: 960px;
  margin: auto;
  box-sizing: content-box;
  padding: 40px;
}
</style>
