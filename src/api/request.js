// 对axios进行配置(二次封装)
import axios from 'axios'
// 引入进度条以及其样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 引入store仓库
import store from '@/store';
const requestor = axios.create({
    // 配置对象
    baseURL: '/api',
    timeout: 5000
})

// 请求拦截器
requestor.interceptors.request.use((config) => {
    // 开始start
    nprogress.start()
    // 加入购物车成功以及后面的购物车列表
    if (store.state.detailOptions.uuid_token) {
        config.headers.userTempId = store.state.detailOptions.uuid_token
    }
    // 登录后带vuex存储的token
    if (store.state.userOptions.token) {
        config.headers.token = store.state.userOptions.token
    }
    return config
})

// 响应拦截器
requestor.interceptors.response.use((res) => {
    // 完成done
    nprogress.done()
    return res.data
}, (err) => {
    return new Error(err)
})



export default requestor