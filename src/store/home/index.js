// home仓库
import { reqCategoryList, reqBannerList, reqFloorList } from "@/api"
const homeOptions = {
    namespaced: true,
    actions: {
        // 三级联动
        async getCategory({ commit }) {
            // 在这里发送请求
            let result = await reqCategoryList()
            if (result.code == 200) {
                commit('CATEGORYLIST', result.data)
            }
        },
        // 首页的大轮播图
        async getBanner({ commit }) {
            let result = await reqBannerList()
            if (result.code == 200) {
                commit('BANNERLIST', result.data)
            }
        },
        // 楼层
        async getFloor({ commit }) {
            let result = await reqFloorList()
            if (result.code == 200) {
                commit('FLOORLIST', result.data)
            }
        },

    },
    mutations: {
        CATEGORYLIST(state, value) {
            state.categoryList = value
        },
        BANNERLIST(state, value) {
            state.bannerList = value
        },
        FLOORLIST(state, value) {
            state.floorList = value
        },
    },
    // state的数据类型根据服务器返回值进行初始化
    state: {
        categoryList: [],
        bannerList: [],
        floorList: [],
    },
    getters: {}
}


export default homeOptions
