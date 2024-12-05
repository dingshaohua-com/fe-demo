import dayjs from "dayjs";

/**
 * 
 * totalClasses： 总课时（数字）
 * startDate： 开课日期（YYYY-MM-DD）
 * classDaysOfWeek：循环周期（比如[1、2]，代表周一周二）
 * weekNumberIncrement：间隔几周（数字）
 */
export default ({
  totalClasses,
  startDate,
  classDaysOfWeek,
  weekNumberIncrement,
}) => {
  console.log({
    totalClasses,
    startDate,
    classDaysOfWeek,
    weekNumberIncrement,
  });
  
  weekNumberIncrement = Number(weekNumberIncrement);

  // 初始化起始日期
  startDate = dayjs(startDate);

  // 总课程数
  // const totalClasses = 10;

  // 每周的上课天数（周一、周三、周日）
  // const classDaysOfWeek = [1, 3, 0]; // 0=Sunday, 1=Monday, 3=Wednesday

  // 1=每周上 2=隔周上
  // const weekNumberIncrement = 1;

  // 初始化一个空数组来存储上课日期
  let classDates = [];

  // 计数器，用于跟踪已安排的课程数量
  let classCount = 0;

  // 当前周数
  let weekNumber = 0;

  // 循环直到安排了所有课程
  while (classCount < totalClasses) {
    // 遍历每周的上课天数
    for (let i = 0; i < classDaysOfWeek.length; i++) {
      const dayOfWeek = classDaysOfWeek[i];

      // 克隆起始日期，防止修改原始日期对象
      let classDate = startDate.clone();

      // 计算当前周数对应的日期偏移量（以天为单位）
      let offsetDays = weekNumber * 7 + (dayOfWeek - startDate.day());

      // 如果计算出的日期小于零（表示在起始日期之前），直接放弃
      if (offsetDays < 0) {
        continue; // 跳过本次循环，检查下一个上课日期
      }

      // 修改克隆的日期对象
      classDate = classDate.add(offsetDays, "day");

      // 将日期格式化为 YYYY-MM-DD 并添加到上课日期数组中
      classDates.push(classDate.format("YYYY-MM-DD"));

      // 增加课程计数器
      classCount++;

      // 如果已经安排了所有课程，则退出内层循环
      if (classCount >= totalClasses) {
        break;
      }
    }

    // 增加周数，每周上一次课或每两周一次课
    if (classCount == 0) {
      weekNumber += 1;
    } else {
      weekNumber += weekNumberIncrement;
    }

    // 如果在当前周已经安排了所有课程，则退出外层循环
    if (classCount >= totalClasses) {
      break;
    }
  }

  // 输出所有上课日期
  classDates.forEach((date) => console.log(date));
  return classDates;
};
