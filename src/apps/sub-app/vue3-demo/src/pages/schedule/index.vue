<template>
  <div class="schedule">123</div>
</template>
<script setup lang="ts">
import { getTeacherSchedule } from "../../api";
const syncTeacherSchedule = async () => {
  const params = {teacher_id: 10003, date: "2024-11-04"}
  const res = await getTeacherSchedule(params);
  console.log(res);
};
syncTeacherSchedule();
</script>

<style scoped></style>
