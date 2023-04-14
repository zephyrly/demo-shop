/* eslint-disable */
import axios from 'axios'
import Qs from 'qs'
import { Message, MessageBox } from 'element-ui'

// 创建axios实例
const service = axios.create({
  // baseURL: 'http://43.139.225.225:8889/api/private/v1', // api 的 base_url 原宝塔接口
  baseURL: 'https://www.okzfans.top/api/private/v1',
  timeout: 5000 // 请求超时时间
})

// 在axios直接请求里面可以使用JSON.stringfly转换/x-www-form-urlencoded，而使用请求拦截器，必须要用qs.stringfly转换data

// request拦截器
service.interceptors.request.use(
  config => {
    config.data = Qs.stringify(config.data) // 数据转化,也可以使用qs转换
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded' // 配置请求头
    }
    const token = window.sessionStorage.getItem('token') // 这里取token之前，你肯定需要先拿到token,存一下
    if (token) {
      //  config.params = { token: token } // 如果要求携带在参数中
      config.headers.Authorization = token // 如果要求携带在请求头中
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    const codeReg = /^20\d+/
    if (!codeReg.test(response.status)) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(new Error('error'))
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
