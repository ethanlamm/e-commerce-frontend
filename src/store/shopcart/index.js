// shopcart仓库
import { reqShopCart, reqDeleteCart, reqCartIsChecked } from '@/api'
const shopcartOptions = {
    namespaced: true,
    actions: {
        // 获取购物车列表
        async getShopCartList({ commit }) {
            let result = await reqShopCart()
            if (result.code == 200) {
                commit('SHOPCARTLIST', result.data)
            }
        },
        // 删除单个商品
        async deleteCartById({ commit }, skuId) {
            let result = await reqDeleteCart(skuId)
            // console.log(result);
            if (result.code == 200) {
                return Promise.resolve('ok')
            } else {
                return Promise.reject('failed')
            }
        },
        // 修改商品选中状态(单个)
        async changeCartIsChecked({ commit }, { skuId, isChecked }) {
            let result = await reqCartIsChecked(skuId, isChecked)
            // console.log(result);
            if (result.code == 200) {
                return Promise.resolve('ok')
            } else {
                return Promise.reject('failed')
            }
        },
        // 删除选中的商品(底部栏)
        deleteIsCheckedCart({ dispatch, getters }) {
            // console.log(dispatch);
            let promiseAll = []
            getters.cartInfoList.forEach(item => {
                // if (item.isChecked == 1) {
                //     let p = dispatch('deleteCartById', item.skuId)
                //     promiseAll.push(p)
                // }
                let p = item.isChecked == 1 ? dispatch('deleteCartById', item.skuId) : ''
                promiseAll.push(p)
            });
            return Promise.all(promiseAll)
        },
        // 修改商品选中状态(全选)
        updateCartChecked({ dispatch, getters }, checkedAll) {
            let promiseAll = []
            getters.cartInfoList.forEach(item => {
                let p = dispatch('changeCartIsChecked', { skuId: item.skuId, isChecked: checkedAll })
                promiseAll.push(p)
            });
            return Promise.all(promiseAll)
        }
    },
    mutations: {
        SHOPCARTLIST(state, value) {
            state.cartList = value[0] || {}
        }
    },
    state: {
        cartList: {}
    },
    getters: {
        cartInfoList({ cartList }) {
            return cartList.cartInfoList || []
        }
    }
}

export default shopcartOptions