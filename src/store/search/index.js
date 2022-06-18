// search仓库
import { reqSearchInfo } from "@/api"
const searchOptions = {
    namespaced: true,
    actions: {
        async getSearchInfo({ commit }, params = {}) {
            let result = await reqSearchInfo(params)
            if (result.code == 200) {
                commit('SEARCHINFO', result.data)
            }
        }
    },
    mutations: {
        SEARCHINFO(state, value) {
            state.searchList = value
        }
    },
    state: {
        searchList: {}
    },
    getters: {
        attrsList({ searchList }) {
            return searchList.attrsList || []
        },
        goodsList({ searchList }) {
            return searchList.goodsList || []
        },
        trademarkList({ searchList }) {
            return searchList.trademarkList || []
        },
        total({ searchList }) {
            return searchList.total
        }
    }
}


export default searchOptions