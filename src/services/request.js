import axios from 'axios'
import { message } from 'antd'
// 生产环境和开发环境作区分
const base_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:9090/airui' : 'http://localhost:9090/airui'

const instance = axios.create({
  timeout: 6000,
  baseURL: base_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})


// //判断error
instance.interceptors.response.use(function (response) {
  // 对response作处理
  return response;
}, function (error) {
  if (error.response.status === 401) {
    message.error('您未经授权，请重新登录');
    this.props.history.push({
      pathname: '/login'
    })
  }
})




instance.interceptors.request.use(function (config) {
  //携带token
  config.headers['token'] = localStorage.getItem('access_token');
  //请求success返回config
  return config;
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error);
})


export default instance

