// 模拟数据库mock

// 对axios进行配置(二次封装)
import axios from 'axios'
// 引入进度条以及其样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const mockRequestor = axios.create({
    // 配置对象
    baseURL: '/mock',
    timeout: 5000
})

// 请求拦截器
mockRequestor.interceptors.request.use((config) => {
    // 开始start
    nprogress.start()
    return config
})

// 响应拦截器
mockRequestor.interceptors.response.use((res) => {
    // 完成done
    nprogress.done()
    return res.data
}, (err) => {
    return new Error(err)
})



export default mockRequestor