import dayjs from "dayjs";

// 获取最近 n 天的日期
export const getRecentNDays = (n) => {
  let dates = [];
  // 从今天开始，往未来遍历
  for (let i = 1; i < n + 1; i++) {
    const date = dayjs().add(i, "day").format("YYYY-MM-DD");
    dates.push(date);
  }
  return dates;
};

// // 示例使用
// let myArray = [1, 2, 3, 4, 5];
// let indexToDelete = 2; // 要删除的索引是2（即元素3）
// // 调用函数
// myArray = removeElementsAfterIndex(myArray, indexToDelete);
// console.log(myArray); // 输出: [1, 2, 3]
export const removeElementsAfterIndex = (array, index) => {
  // 删除索引之后的所有元素
  array.splice(index + 1, array.length - index - 1);
  return array;
};
