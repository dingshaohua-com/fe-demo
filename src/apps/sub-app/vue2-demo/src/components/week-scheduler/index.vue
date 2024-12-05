<template>
  <div class="timetable">
    <div class="mcenter">
      <el-date-picker
        v-model="selectedDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      />
      <div class="content">
        <scheduler v-bind="props"/>
      </div>
    </div>
  </div>
</template>
<script setup name="Timetable">
import dayjs from "dayjs";
import scheduler from "./scheduler.vue";
import { ref, computed, defineEmits } from "@vue/composition-api";

const emit = defineEmits(["update:startDate"]);

const props = defineProps({
  startDate: {
    default: () => new Date(),
  },
  timeRange: {
    default: () => ({
      startTime: 9,
      endTime: 22,
    }),
  },
  task:{
    default: ()=>[]
  }
});

const startDate = computed({
  get: () => props.startDate,
  set: (val) => emit("update:startDate", val),
});


// 日历选择器的起止日期设置为本周一道周日
const monday = dayjs().startOf("week").format("YYYY-MM-DD");
const sunday = dayjs().endOf("week").format("YYYY-MM-DD");
const selectedDate = ref([monday, sunday]);

// 配置日期选择器的选项，禁用超出范围的日期
const pickerOptions = computed(() => {
  return {
    firstDayOfWeek: 1,
    onPick: ({ minDate, maxDate }) => {
      if (minDate === maxDate) return;
      const newminDate = dayjs(minDate).format("YYYY-MM-DD");
      const newmaxDate = dayjs(minDate).add(6, "days").format("YYYY-MM-DD");
      if (newminDate) {
        selectedDate.value = [newminDate, newmaxDate];
        startDate.value = newminDate;
      }
    },
    // 设置禁用状态  time是日历上的每一个时间
    disabledDate: (time) => {
      if (selectedDate.value) {
        const [monday, sunday] = selectedDate.value;
        const minTime = new Date(monday).getTime() - 8 * 3600 * 1000;
        const maxTime = new Date(sunday).getTime() - 8 * 3600 * 1000;
        return time.getTime() !== minTime && time.getTime() !== maxTime;
      }
    },
  };
});
</script>
<style scoped lang="scss">
.tip {
  position: absolute;
  height: 10px;
  width: 10px;
  border: #868484 solid 1px;
  border-radius: 4px;
  opacity: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
}

.timetable {
  .content {
    margin-top: 20px;
  }
}
</style>
