import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from './router'

let loading // 定义loading变量

function startLoading () {
  // 使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
function endLoading () {
  // 使用Element loading-close 方法
  loading.close()
}
axios.defaults.baseURL = 'http://www.bl1000.cn'
axios.defaults

// axios.defaults.baseURL = 'localhost:81'
// axios.defaults.headers.common['Authorization'] = 'Bearer 5' + localStorage.getItem('token')
// 请求拦截  设置统一headercd
axios.interceptors.request.use(
  config => {
    // 加载
    startLoading()
    console.log('interceptor ' + localStorage.getItem('token'))
    if (localStorage.getItem('token')) { config.headers.Authorization = 'Bearer ' + localStorage.getItem('token') }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截  401 token过期处理
axios.interceptors.response.use(
  response => {
    endLoading()
    return response
  },
  error => {
    // 错误提醒
    endLoading()
    Message.error(error.response.data)
    // console.log('>>>> ' + JSON.stringify(error.response.data))

    const { status } = error.response
    if (status == 401) {
      Message.error('token值无效，请重新登录')
      // 清除token
      localStorage.removeItem('token')

      // 页面跳转
      router.push('/login')
    }

    if (status == 40001) {
      Message.error('用户名或密码错误，请重新登录')
      // 清除token
      localStorage.removeItem('token')

      // 页面跳转
      router.push('/login')
    }

    return Promise.reject(error)
  }
)

export default axios
