// detail仓库
import { reqDetailInfo, reqAddOrUpdateShopCart } from "@/api"
import { getUUid } from '@/utils'
const detailOptions = {
    namespaced: true,
    actions: {
        // 详情页
        async getDetail({ commit }, skuId) {
            // 在这里发送请求
            let result = await reqDetailInfo(skuId)
            if (result.code == 200) {
                commit('DETAILLIST', result.data)
            }
        },
        // 加入购物车，在这里发请求，后面跳转至加入购物车成功页面
        // 由于详情页detail是每个临时游客都可以访问的，并且不需要验证
        // 但后面的加入购物车成功页面以及去购物车结算页面要分清游客身份
        // 因此要在detail准备好uuid_token，向后面两个页面跳转时进行身份验证
        async updateShopCart({ commit }, { skuId, skuNum }) {
            let result = await reqAddOrUpdateShopCart(skuId, skuNum)
            if (result.code == 200) {

                return Promise.resolve('ok')
            } else {
                return Promise.reject(result.message)
            }
        },
    },
    mutations: {
        DETAILLIST(state, value) {
            state.detailList = value
        },

    },
    // state的数据类型根据服务器返回值进行初始化
    state: {
        detailList: {},
        // 游客临时id
        uuid_token: getUUid()

    },
    getters: {
        categoryView({ detailList }) {
            return detailList.categoryView || {}
        },
        skuInfo({ detailList }) {
            return detailList.skuInfo || {}
        },
        spuSaleAttrList({ detailList }) {
            return detailList.spuSaleAttrList
        },
    }
}


export default detailOptions
