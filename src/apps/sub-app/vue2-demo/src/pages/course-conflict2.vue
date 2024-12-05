<template>
  <div>
    <el-calendar>
      <template slot="dateCell" slot-scope="{ date, data }">
        <div class="date">{{ data.day.split("-").slice(1).join("-") }}</div>
        <div class="show-some" v-if="finalRes[data.day]">
          <template v-for="item in finalRes[data.day].normal">
            <div>
              {{ item.start_at.slice(0, 5) }}-{{ item.end_at.slice(0, 5) }}
              {{ item.lesson_name }}
              <span v-if="item.islocal">❤️</span>
            </div>
          </template>
          <template v-for="item in finalRes[data.day].conflict">
            <div class="group">
              {{ item.start.slice(0, 5) }}-{{ item.end.slice(0, 5) }}
              <div v-for="i in item.children">
                {{ i.start_at.slice(0, 5) }}-{{ i.end_at.slice(0, 5) }}
                {{ i.lesson_name }} <span v-if="i.islocal">❤️</span>
              </div>
             
            </div>
          </template>
        </div>
      </template>
    </el-calendar>
    <el-divider></el-divider>
    <form-create
      :rule="rule"
      v-model="fApi"
      :option="options"
      :value.sync="formData"
    />
  </div>
</template>
<script setup>
import { getTeacherSchedule } from "../api";
import { ref, computed } from "@vue/composition-api";
import organizeCourses from "../utils/organize-courses";
import generateTimeIntervals from "../utils/generate-time-intervals";
import dayjs from "dayjs";

const courseData = [
  {
    class_date: "2024-11-25",
    start_at: "10:00:00",
    end_at: "12:00:00",
    lesson_name: "第一节",
  },
  {
    class_date: "2024-11-25",
    start_at: "11:00:00",
    end_at: "13:00:00",
    lesson_name: "第二节",
  },
  {
    class_date: "2024-11-27",
    start_at: "10:00:00",
    end_at: "12:00:00",
    lesson_name: "第三节",
  },
  {
        class_date: "2024-11-26",
        week_day: 3,
        start_at: "14:00:00",
        end_at: "15:00:00",
        lesson_name: "第三节",
      },
];



const fApi = ref(null);
const formData = ref({});
const options = {
  inline: true,
  submitBtn: false,
  resetBtn: false,
  form: {
    labelWidth: "100px",
    size: "small",
  },
};
const rule = [
  {
    type: "group",
    field: "schooldates",
    title: "上课日期们",
    value: [
      { schooldate: new Date() },
      { schooldate: dayjs().add(1, "day").format("YYYY-MM-DD") },
    ],
    props: {
      rules: [
        {
          type: "DatePicker",
          field: "schooldate",
          title: "上课日期",
          value: "",
        },
      ],
    },
  },

  {
    type: "select",
    field: "schooltime",
    title: "上课时间",
    options: generateTimeIntervals(),
    value: "08:00-09:00",
  },
];

// 同步该老师下已有的课程
const course = ref([]);
const syncTeacherSchedule = async () => {
  course.value = courseData;
};
syncTeacherSchedule();

// 计算属性：结合已有的course 和 开课日期与时间关联 ---》共同计算有冲突的课程
const finalRes = computed(() => {
  // 项目中不用计算，已经计算好了
  let localCourses = [];
  if (formData.value.schooldates) {
    let start_at;
    let end_at;
    if (formData.value.schooltime) {
      const [startTime, endTime] = formData.value.schooltime.split("-");
      start_at = startTime + ":00";
      end_at = endTime + ":00";
    }

    localCourses = formData.value.schooldates.map((element) => ({
      class_date: dayjs(element.schooldate).format("YYYY-MM-DD"),
      start_at,
      end_at,
      islocal: true,
    }));
  }

  const newCourses = organizeCourses([...course.value, ...localCourses]); // 重新组装数据
  return newCourses?newCourses:[];
});

</script>
<style scoped lang="scss">
.show-some {
  overflow-y: auto;
  height: 50px;
  font-size: 12px;
  .group {
    border-bottom: black solid 1px;
    background-color: red;
    color: white;
    font-weight: 700;
    & > * {
      font-weight: normal;
    }
  }
}
</style>
