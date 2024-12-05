import request from "./request";

/**
 * 获取已有班课
 */
export const getTeacherSchedule = (params) => {
  return request({
    url: "/admin/emis/v1/teacher/schedule",
    method: "get",
    params,
  });
};