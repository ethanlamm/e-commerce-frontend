// 登陆和注册仓库
import { reqRegisterCode, reqRegister, reqLogin, reqUserInfo, reqUserLogout } from '@/api'

const userOptions = {
    namespaced: true,
    actions: {
        // 验证码
        async getRegisterCode({ commit }, phone) {
            let result = await reqRegisterCode(phone)
            if (result.code == 200) {
                commit('REGISTERCODE', result.data)
                return Promise.resolve('ok')
            } else {
                return Promise.reject(result.message)
            }
        },
        // 注册
        async getUserRegister({ commit }, data) {
            let result = await reqRegister(data)
            if (result.code == 200) {
                return Promise.resolve('ok')
            } else {
                return Promise.reject(result.message)
            }
        },
        // 登陆
        // 这里的token是变化的，同一账户登陆，服务器返回的token不同
        async getUserLogin({ commit }, data) {
            let result = await reqLogin(data)
            if (result.code == 200) {
                commit('USERLOGIN', result.data.token)
                localStorage.setItem('TOKEN', result.data.token)
                return Promise.resolve('ok')
            } else {
                return Promise.reject(result.message)
            }
        },
        // 获取用户信息
        async getUserInfo({ commit }) {
            let result = await reqUserInfo()
            if (result.code == 200) {
                commit('USERINFO', result.data)
                return Promise.resolve('ok')
            } else {
                return Promise.reject(result.message)
            }
        },
        // 退出登录
        async userLogout({ commit }) {
            let result = await reqUserLogout()
            if (result.code == 200) {
                // 成功后清空信息
                commit('CLEAR')
                return Promise.resolve('ok')
            } else {
                return Promise.reject(result.message)
            }
        },
    },
    mutations: {
        REGISTERCODE(state, value) {
            state.code = value
        },
        USERLOGIN(state, value) {
            state.token = value
        },
        USERINFO(state, value) {
            state.userInfo = value
        },
        CLEAR(state) {
            state.token = ''
            localStorage.removeItem('TOKEN')
            state.userInfo = {}
        }
    },
    state: {
        code: '',
        token: localStorage.getItem('TOKEN'),
        userInfo: {}
    },
    getters: {}
}

export default userOptions