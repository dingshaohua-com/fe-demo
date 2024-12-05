// 辅助函数：将时间字符串转换为分钟表示
const convertTimeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

export default (
  startTime = "8:00",
  endTime = "21:00",
  intervalMinutes = 60
) => {
  // 将时间字符串转换为分钟表示
  const start = convertTimeToMinutes(startTime);
  const end = convertTimeToMinutes(endTime);
  const intervals = [];

  // 生成时间段
  for (let current = start; current < end; current += intervalMinutes) {
    const startHour = Math.floor(current / 60)
      .toString()
      .padStart(2, "0");
    const startMinute = (current % 60).toString().padStart(2, "0");
    const endHour = Math.floor((current + intervalMinutes) / 60)
      .toString()
      .padStart(2, "0");
    const endMinute = ((current + intervalMinutes) % 60)
      .toString()
      .padStart(2, "0");

    intervals.push(`${startHour}:${startMinute}-${endHour}:${endMinute}`);
  }

  return intervals.map((item) => ({ label: item, value: item }));
};
