//axios封装处理
import axios from "axios";
console.log(typeof process, import.meta.env);
const request = axios.create({
  baseURL: typeof process === "undefined" ? "/api" : "http://localhost:8080",
  timeout: 5000,
});

//请求拦截器
request.interceptors.request.use(
  (config) => {
    console.log("1.2", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { request };
