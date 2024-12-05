<template>
    <div class="home">
      <form-create
        v-model="gfApi"
        :rule="rule"
        :option="option"
        :value.sync="fromDate"
      ></form-create>
    </div>
  </template>
  <script setup>
  import _ from "lodash";
  import { getRecentNDays, removeElementsAfterIndex } from "@/utils";
  import { ref } from "@vue/composition-api";
  import computeAssociatedDate from "@/utils/compute-associated-date";
  
  const fromDate = ref({});
  const computeAssociatedDateAfterTemp = (createdAt) => {
    fromDate.value.associatedDate = [];
  
    const {
      ruleType,
      totalClasses,
      created_at: created_at_temp,
      cyclePeriod,
      gapWeek,
    } = fromDate.value;
    let created_at = created_at_temp;
    // 如果传入了createdAt，则以它为主，供computeAssociatedDateChange
    if (createdAt) {
      created_at = createdAt;
    }
    // 如果选择的是【单次】
    if (ruleType === 1) {
      if (created_at) {
        const recentNDays = getRecentNDays(totalClasses);
        fromDate.value.associatedDate = recentNDays.map((i) => ({
          associatedDatef: i,
        }));
      } else {
        fromDate.value.associatedDate = [];
      }
      return;
    }
  
    //或隔周循环 但是间隔周期却没有
    if (ruleType === 3 && !gapWeek) {
      return;
    }
  
    // 如果是周循环或者隔周循环 但是循环周期却没有
    if ((ruleType === 3 || ruleType === 2) && cyclePeriod.length === 0) {
      return;
    }
  
    console.log(8989);
  
    // 其他正常情况
    if (totalClasses && created_at) {
      const params = {
        totalClasses: totalClasses,
        startDate: created_at,
        classDaysOfWeek: cyclePeriod,
        weekNumberIncrement: ruleType === 2 ? 1 : gapWeek,
      };
      const res = computeAssociatedDate(params);
      fromDate.value.associatedDate = res.map((i, index) => ({
        associatedDatef: i,
        index,
      }));
    }
  };
  const computeAssociatedDateAfter = _.debounce(
    computeAssociatedDateAfterTemp,
    500
  );
  
  const computeAssociatedDateChange = (inject) => {
    const index = inject.rule.find((it) => it.field === "index").value;
    const newVal = inject.self.value;
  
    const partOne = removeElementsAfterIndex(
      _.cloneDeep(fromDate.value.associatedDate),
      index
    );
  
    const { ruleType, totalClasses, cyclePeriod, gapWeek } = fromDate.value;
    const params = {
      totalClasses: totalClasses - index,
      startDate: newVal,
      classDaysOfWeek: cyclePeriod,
      weekNumberIncrement: ruleType === 2 ? 1 : gapWeek,
    };
    const associatedDate = computeAssociatedDate(params);
    const partTwo = associatedDate.map((i, partTwoIdx) => ({
      associatedDatef: i,
      index: index + partTwoIdx,
    }));
    partOne.pop();
    fromDate.value.associatedDate = [...partOne, ...partTwo];
  };
  
  const gfApi = ref();
  const rule = [
    {
      type: "col",
      field: "teacher",
      inline: true,
      col: {
        span: 24,
      },
      children: [
        {
          type: "input",
          field: "totalClasses",
          title: "几节课",
          props: {
            type: "number",
          },
          value: 3,
          col: {
            span: 8,
          },
          update(val, rule, fApi) {
            computeAssociatedDateAfter();
          },
        },
        {
          type: "datePicker",
          field: "created_at",
          title: "开课日期",
          col: {
            span: 8,
          },
          update(val, rule, fApi) {
            computeAssociatedDateAfter();
          },
        },
      ],
    },
  
    {
      type: "radio",
      field: "ruleType",
      title: "规则",
      options: [
        { value: 1, label: "单次" },
        { value: 2, label: "每周循环" },
        { value: 3, label: "隔周循环" },
      ],
      effect: {
        required: true,
      },
      value: 1,
      props: { mtype: "rule_content" },
      update(val, rule, fApi) {
        computeAssociatedDateAfter();
      },
    },
    {
      type: "input",
      field: "gapWeek",
      title: "间隔几周",
      props: {
        type: "number",
      },
      col: {
        span: 8,
      },
      hidden: true,
      link: ["ruleType"],
      update(val, rule, fApi) {
        const isHidden = fApi.getValue("ruleType") !== 3;
        rule.hidden = isHidden;
        computeAssociatedDateAfter();
      },
    },
    {
      type: "checkbox",
      field: "cyclePeriod",
      title: "循环周期",
      value: [1, 3],
      props: {
        type: "button",
      },
      link: ["ruleType"],
      update(val, rule, fApi) {
        const isHidden = fApi.getValue("ruleType") === 1;
        rule.hidden = isHidden;
        computeAssociatedDateAfter();
      },
      options: [
        { value: 1, label: "周一" },
        { value: 2, label: "周二" },
        { value: 3, label: "周三" },
        { value: 4, label: "周四" },
        { value: 5, label: "周五" },
        { value: 6, label: "周六" },
        { value: 7, label: "周日" },
      ],
    },
    {
      type: "group",
      field: "associatedDate",
      title: "关联日期",
      value: [],
      col: {
        span: 24,
      },
      props: {
        button: false,
        rules: [
          {
            type: "input",
            field: "index",
            title: "索引",
          },
          {
            type: "datepicker",
            field: "associatedDatef",
            title: "",
            inject: true,
            on: {
              change: (inject) => computeAssociatedDateChange(inject),
            },
          },
        ],
      },
    },
  ];
  //组件参数配置
  const option = {
    submitBtn: false,
    resetBtn: false,
    //表单提交事件
    onSubmit: function (formData) {
      alert(JSON.stringify(formData));
    },
  };
  </script>
  