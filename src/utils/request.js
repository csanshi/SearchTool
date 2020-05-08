import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 创建axios实例
axios.defaults.baseURL = process.env.API_ROOT
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    NProgress.start();
    config.url += '/?api-key=foo'
    return config
},
  error => {
    NProgress.start();
  // Do something with request error
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  res => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    NProgress.done();
    if (res.status !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })

      // 401:未登录;
      if (res.code === 401) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    NProgress.done();
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
