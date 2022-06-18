// trade仓库
import { reqUserAddress, reqUserOrderInfo } from '@/api'
const tradeOptions = {
    namespaced: true,
    actions: {
        // 获取用户地址信息
        async getUserAddress({ commit }) {
            let result = await reqUserAddress()
            console.log(result);
            if (result.code == 200) {
                commit('USERADDRESS', result.data)
            }
        },
        // 获取用户订单信息
        async getOrderInfo({ commit }) {
            let result = await reqUserOrderInfo()
            console.log(result);
            if (result.code == 200) {
                commit('ORDERINFO', result.data)
            }
        },

    },
    mutations: {
        USERADDRESS(state, value) {
            state.address = value
        },
        ORDERINFO(state, value) {
            state.orderInfo = value
        },
    },
    state: {
        address: [],
        orderInfo: {}
    },
    getters: {
        // detailArrayList({ orderInfo }) {
        //     return orderInfo.detailArrayList || []
        // }
    }
}

export default tradeOptions