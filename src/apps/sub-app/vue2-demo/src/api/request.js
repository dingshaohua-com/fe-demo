import axios from "axios";

axios.defaults.baseURL = "https://test-admin.douyuxingchen.com/api";
const token = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90ZXN0LWFkbWluLmRvdXl1eGluZ2NoZW4uY29tXC9hcGlcL2Vucm9sbFwvcGFzc3BvcnQtbG9naW4iLCJpYXQiOjE3MzI2MDM2MjAsImV4cCI6MTczMzIwODQyMCwibmJmIjoxNzMyNjAzNjIwLCJqdGkiOiJjNG5sdUcxbFdoVzB0dGttIiwic3ViIjoxMTg4LCJwcnYiOiI0YmZkOGJjNmU3YjRmYTY2MWVhMmJkMzRiMThjZWI0YTQ5ODA3Y2VjIn0.UcHk7BJ6I6gouWrEys65AVPXyEKxpDD0QAGJgSQkKp8`

// 表单序列化
const serialize = (data) => {
  let list = [];
  Object.keys(data).forEach((ele) => {
    list.push(`${ele}=${data[ele]}`);
  });
  return list.join("&");
};

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = token;
    if (config.method === "get")
      config.params = Object.assign(config.params || {});
    else config.data = Object.assign(config.data || {});

    // headers中配置serialize为true开启序列化
    if (config.method === "post") {
      config.data = serialize(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    const status = res.data.code;
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      return Promise.reject(res.data);
    }
    // 检查是否需要返回code码
    const isReturnCode = res.config && res.config?.returnCode;
    if (typeof res.data === "object") {
      return isReturnCode ? res.data?.data : res.data;
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

export default axios;
