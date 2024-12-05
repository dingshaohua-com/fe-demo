import dayjs  from "dayjs";
import _ from "lodash";

// 判断两个时间段是否冲突
function isConflict(class1, class2) {
  const start1 = dayjs(`${class1.class_date} ${class1.start_at}`);
  const end1 = dayjs(`${class1.class_date} ${class1.end_at}`);
  const start2 = dayjs(`${class2.class_date} ${class2.start_at}`);
  const end2 = dayjs(`${class2.class_date} ${class2.end_at}`);

  return start1.isBefore(end2) && start2.isBefore(end1);
}

// 主逻辑：检查所有课程之间是否有时间冲突
export default function organizeCourses(courses) {
  // 按日期分组
  const groupedByDate = _.groupBy(courses, "class_date");

  return _.mapValues(groupedByDate, (dailyCourses, date) => {
    const normal = [];
    const conflictGroups = [];
    const processed = new Set();

    dailyCourses.forEach((course, i) => {
      if (processed.has(course)) return;

      let conflictChildren = [];
      let conflictStart = course.start_at;
      let conflictEnd = course.end_at;

      // 查找冲突课程
      _.forEach(dailyCourses, (otherCourse, j) => {
        if (i !== j && !processed.has(otherCourse) && isConflict(course, otherCourse)) {
          conflictChildren.push(otherCourse);

          // 更新冲突时间范围
          const allTimes = [
            { time: conflictStart, type: "start" },
            { time: conflictEnd, type: "end" },
            { time: otherCourse.start_at, type: "start" },
            { time: otherCourse.end_at, type: "end" },
          ];
          conflictStart = _.minBy(allTimes, (t) => dayjs(`${date} ${t.time}`)).time;
          conflictEnd = _.maxBy(allTimes, (t) => dayjs(`${date} ${t.time}`)).time;
        }
      });

      // 处理冲突或正常课程
      if (conflictChildren.length > 0) {
        conflictGroups.push({
          data: date,
          start: conflictStart,
          end: conflictEnd,
          children: [course, ...conflictChildren],
        });
        processed.add(course);
        conflictChildren.forEach((c) => processed.add(c));
      } else {
        normal.push(course);
      }
    });

    return {
      normal,
      conflict: conflictGroups,
    };
  });
}

// // 示例课程数据
// const courses = [
//   {
//     class_date: "2024-11-25",
//     week_day: 1,
//     start_at: "10:00:00",
//     end_at: "12:00:00",
//     lesson_name: "第一节",
//   },
//   {
//     class_date: "2024-11-25",
//     week_day: 2,
//     start_at: "11:00:00",
//     end_at: "13:00:00",
//     lesson_name: "第二节",
//   },
//   {
//     class_date: "2024-11-25",
//     week_day: 3,
//     start_at: "14:00:00",
//     end_at: "15:00:00",
//     lesson_name: "第三节",
//   },
//   {
//     class_date: "2024-11-26",
//     week_day: 3,
//     start_at: "14:00:00",
//     end_at: "15:00:00",
//     lesson_name: "第三节",
//   },
// ];

// const conflicts = organizeCourses(courses);
// console.log(JSON.stringify(conflicts, null, 2));


// {
//   "2024-11-25": {
//     "normal": [
//       {
//         "class_date": "2024-11-25",
//         "week_day": 3,
//         "start_at": "14:00:00",
//         "end_at": "15:00:00",
//         "lesson_name": "第三节"
//       }
//     ],
//     "conflict": [
//       {
//         "data": "2024-11-25",
//         "start": "10:00:00",
//         "end": "13:00:00",
//         "children": [
//           {
//             "class_date": "2024-11-25",
//             "week_day": 1,
//             "start_at": "10:00:00",
//             "end_at": "12:00:00",
//             "lesson_name": "第一节"
//           },
//           {
//             "class_date": "2024-11-25",
//             "week_day": 2,
//             "start_at": "11:00:00",
//             "end_at": "13:00:00",
//             "lesson_name": "第二节"
//           }
//         ]
//       }
//     ]
//   },
//   "2024-11-26": {
//     "normal": [
//       {
//         "class_date": "2024-11-26",
//         "week_day": 3,
//         "start_at": "14:00:00",
//         "end_at": "15:00:00",
//         "lesson_name": "第三节"
//       }
//     ],
//     "conflict": []
//   }
// }