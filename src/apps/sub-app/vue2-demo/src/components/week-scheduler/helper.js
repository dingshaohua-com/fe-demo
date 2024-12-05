import _ from "lodash";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

// const userDate = [
//   {
//     date: "2024-11-12",
//     start_time: "14:00:00",
//     end_time: "17:00:00",
//     describe: "语文",
//   },
//   {
//     date: "2024-11-12",
//     start_time: "16:00:00",
//     end_time: "20:40:00",
//     describe: "数学",
//   },
//   {
//     date: "2024-11-12",
//     start_time: "10:23:00",
//     end_time: "12:00:00",
//     describe: "英语",
//   },
// ];

export const getConflicts = (data) => {
  // 按日期分组
  const groupedByDate = _.groupBy(data, "date");
  const result = [];

  _.forEach(groupedByDate, (items, date) => {
    // 两两组合进行冲突检查
    const pairs = _.flatMap(items, (item1, index) =>
      items.slice(index + 1).map((item2) => [item1, item2])
    );

    _.forEach(pairs, ([item1, item2]) => {
      const start1 = dayjs(`${item1.date} ${item1.start_time}`);
      const end1 = dayjs(`${item1.date} ${item1.end_time}`);
      const start2 = dayjs(`${item2.date} ${item2.start_time}`);
      const end2 = dayjs(`${item2.date} ${item2.end_time}`);

      // 检查时间是否重叠
      if (start1.isBefore(end2) && start2.isBefore(end1)) {
        const conflictStart = start1.isAfter(start2) ? start1 : start2;
        const conflictEnd = end1.isBefore(end2) ? end1 : end2;

        // 格式化时间
        const formattedStart = conflictStart.format("HH:mm:ss");
        const formattedEnd = conflictEnd.format("HH:mm:ss");

        result.push({
          conflict: true,
          date,
          conflictInfo: {
            start_time: formattedStart,
            end_time: formattedEnd,
          },
          conflictItems: [item1, item2],
        });
      }
    });
  });

  return _.uniqWith(result, _.isEqual); // 去重
};

// const conflicts = getConflicts(userDate);
// console.log(conflicts);

/**
 * 模拟后端返回数据
 * @returns
 */
export const getUserDate = () => {
  const currentDay = dayjs().format("YYYY-MM-DD");
  const userDate = [
    {
      date: currentDay,
      start_time: "14:00:00",
      end_time: "17:00:00",
      describe: "语文",
    },
    // {
    //   date: currentDay,
    //   start_time: "15:00:00",
    //   end_time: "17:00:00",
    //   describe: "数学",
    // },
    {
      date: currentDay,
      start_time: "16:00:00",
      end_time: "20:40:00",
      describe: "数学",
    },
    {
      date: currentDay,
      start_time: "10:23:00",
      end_time: "12:00:00",
      describe: "英语",
    },
  ];


  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userDate);
    }, 1000);
  });
};

export const weekDays = [
  "周日",
  "周一",
  "周二",
  "周三",
  "周四",
  "周五",
  "周六",
];

/**
 * 传入开始日期，返回本周从周一开始到周日的所有日期
 * @param {*} startDate
 * @returns
 */
export const getWeekRange = (startDate = new Date()) => {
  const start = dayjs(startDate); // 输入的开始日期
  const monday = start.startOf("week"); // 获取周一日期
  const sunday = monday.endOf("week"); // 获取周日日期

  const weekRange = [];

  // 从周一到周日的日期
  for (
    let date = monday;
    date.isBefore(sunday) || date.isSame(sunday, "day");
    date = date.add(1, "day")
  ) {
    weekRange.push(date.format("YYYY-MM-DD")); // 根据需要格式化日期
  }

  return weekRange;
};

/**
 * 传入起止时间，返回其之间所有的整点时间
 * @param {*} startHour
 * @param {*} endHour
 * @returns
 */
export const getTimeRange = (startHour = 8, endHour = 22) => {
  const hours = [];
  // 从 startHour 开始，到 endHour 结束
  for (let hour = startHour; hour <= endHour; hour++) {
    // 获取当前整点时间，设置分钟和秒为0
    const time = dayjs().startOf("day").hour(hour).minute(0).second(0);
    hours.push(time.format("HH")); // 可以根据需要修改格式
  }
  return hours;
};

/**
 * 计算父子元素距离
 * @param {*} childElement
 * @param {*} parentElement
 * @returns
 */
export const getRelativePosition = (childElement, parentElement) => {
  // 获取子元素和父元素的位置信息
  const childRect = childElement.getBoundingClientRect();
  const parentRect = parentElement.getBoundingClientRect();

  // 计算子元素相对于父元素的位置
  const relativeTop = childRect.top - parentRect.top;
  const relativeLeft = childRect.left - parentRect.left;

  return { top: relativeTop, left: relativeLeft };
};

/**
 * 获取随机颜色
 * @returns
 */
export const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r},${g},${b}, ${0.3})`;
};

export const getDays = (current = dayjs()) => {
  const days = [];
  for (let index = 0; index < 7; index++) {
    days.push(current.clone().add(index, "days"));
  }
  return days;
};
