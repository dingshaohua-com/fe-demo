<template>
  <div class="table">
    <div class="date" v-for="(date, dateIndex) in dateList" :key="dateIndex">
      <div
        :class="[
          'time',
          {
            'show-time': dateIndex === 0,
            'show-day': timeIndex === 0,
            'abs-fisrt': dateIndex === 0 && timeIndex === 0,
          },
        ]"
        v-for="(time, timeIndex) in timeList"
        :key="dateIndex + '_' + timeIndex"
      >
        <!-- 第一列 显示时间-->
        <div v-if="dateIndex === 0" class="showtime-txt">
          {{ time ? time + ":00" : time }}
        </div>
        <!-- 其它列 -->
        <template v-else>
          <!-- 第一行 显示日期-->
          <div v-if="timeIndex === 0">
            {{ weekDays[dayjs(date).day()] }}
            {{ dayjs(date).format("DD号") }}
          </div>
          <!-- 其它行 显示正常数据（既日程）-->
          <div v-else class="normal-data">
            <template v-for="(item, index) in new Array(60)">
              <div class="min" :data-id="computeUUID(date, time, index)"></div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="task">
      <template v-for="item in tipsElementAttr">
        <div class="tip" :style="item.style" v-if="item.conflict">
          <div class="conflict">
            有冲突
            <div v-for="i in item.conflictItems">
              {{ i.describe }}: {{ i.start_time.replace(/:\d\d$/, '') }}-{{ i.end_time.replace(/:\d\d$/, '') }}
            </div>
          </div>
        </div>
        <div class="tip" :style="item.style" v-else>
          {{ item.content }}
        </div>
      </template>
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import {
  getWeekRange,
  getTimeRange,
  weekDays,
  getRelativePosition,
  getRandomColor,
  getConflicts,
} from "./helper";
import { ref, defineProps, watch } from "@vue/composition-api";
const props = defineProps(["startDate", "timeRange", "task"]);

// 计算日期和时间(x轴和y轴)
const dateListInit = getWeekRange(props.startDate);
const timeListInit = getTimeRange(
  props.timeRange.startTime,
  props.timeRange.endTime
);
const dateList = ref([null, ...dateListInit]);
const timeList = ref([null, ...timeListInit]);

// 计算内容格的每一个唯一标识
const computeUUID = (dateStr, timeStr, index) => {
  const fullStr = `${dateStr} ${timeStr}:${index}`;
  const finalRes = dayjs(fullStr).format("YYYY-MM-DD HH:mm");
  return finalRes;
};

// 渲染task
const tipsElementAttr = ref([]);
const renderTask = () => {
  const conflicttasks = getConflicts(props.task);
  const tableEl = document.querySelector(".table");
  const tipsElementAttrTemp = [];
  const allTask = [...props.task, ...conflicttasks];
  allTask.forEach((item) => {
    const isConflict = item.conflict;
    const start_time = isConflict
      ? item.conflictInfo.start_time
      : item.start_time;
    const startPointId = dayjs(item.date + " " + start_time).format(
      "YYYY-MM-DD HH:mm"
    );
    const startPoint = document.querySelector(`[data-id="${startPointId}"]`);
    if (startPoint) {
      const startPos = getRelativePosition(startPoint, tableEl);
      const startPointTop = startPos.top;
      const startPointLeft = startPos.left;
      const end_time = isConflict ? item.conflictInfo.end_time : item.end_time;
      const endPointId = dayjs(item.date + " " + end_time).format(
        "YYYY-MM-DD HH:mm"
      );
      const endPoint = document.querySelector(`[data-id="${endPointId}"]`);
      const endPos = getRelativePosition(endPoint, tableEl);
      const endPosPointTop = endPos.top;
      const pointStyle = window.getComputedStyle(endPoint);
      const tipHight =
        endPosPointTop -
        startPointTop +
        Number(pointStyle.height.replace("px", "")) -
        4;
      // -- 样式以及其它属性拼接 --
      const stylesTop = startPointTop + 1 + "px";
      const stylesLeft = startPointLeft + "px";
      const stylesWidth = pointStyle.width;
      const stylesHeight = tipHight + "px";
      const stylesBgColor = isConflict ? "red" : "rgba(0,0,0,0.2)";

      let style = `top: ${stylesTop}; left: ${stylesLeft}; width: ${stylesWidth}; height:${stylesHeight}; background-color: ${stylesBgColor};`;
      !isConflict && (style = style + "border: black solid 1px");
      tipsElementAttrTemp.push({
        style,
        content: item.describe,
        ...item,
      });
    }
  });
  tipsElementAttr.value = tipsElementAttrTemp;
  console.log(111, tipsElementAttrTemp);
};

watch(
  props,
  () => {
    renderTask();
  },
  { immediate: true }
);
renderTask();
</script>
<style lang="scss" scoped>
::v-deep .tip {
  position: absolute;
  height: 10px;
  width: 10px;
  //   border: #868484 solid 1px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.table {
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  .date {
    .time {
      width: 120px;
      height: 60px;
      background-color: rgba($color: #000000, $alpha: 0.03);
      border: 1px solid #e5e5e5;
      border-bottom: none;
      border-right: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .show-time {
      color: rgba($color: #000000, $alpha: 0.5);
      @extend .time;
      border-right: 1px dashed rgba($color: #000000, $alpha: 0.3);
      .showtime-txt {
        position: relative;
        top: -30px;
        background-color: #f5f5f5;
        padding: 0 10px;
      }
    }
    .show-day {
      color: rgba($color: #000000, $alpha: 0.5);
      @extend .time;
      border-bottom: 1px dashed rgba($color: #000000, $alpha: 0.3);
    }
    .abs-fisrt {
      border: 1px solid #e5e5e5;
    }

    .normal-data {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      align-items: stretch;
      height: 100%;
      width: 100%;

      .min {
        height: 1px;
        width: 1px;
        flex: 1 1 100px;
      }
    }
  }
  .task {
    position: absolute;
    .conflict{
      font-size: 12px;
    }
  }
}
</style>
