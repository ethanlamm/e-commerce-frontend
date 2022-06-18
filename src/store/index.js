// 大仓库
import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入小仓库
import homeOptions from "./home";
import searchOptions from "./search";
import detailOptions from "./detail";
import shopcartOptions from "./shopcart";
import userOptions from "./user";
import tradeOptions from "./trade";


export default new Vuex.Store({
    // 模块化
    modules: {
        homeOptions, searchOptions, detailOptions, shopcartOptions, userOptions, tradeOptions
    }
})