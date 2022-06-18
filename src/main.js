import Vue from 'vue'
import App from './App.vue'

// 引入全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { MessageBox } from 'element-ui';
// 引入路由
import router from '@/router'
// 引入vuex
import store from '@/store'

// 引入懒加载插件 1.3.3版本
import VueLazyload from 'vue-lazyload'
// 引入底图
import Chou from '@/assets/周星驰.jpg'
// 引入mockServe.js
import '@/mock/mockServe'
// 引入swiper.css
import 'swiper/css/swiper.css'
// 引入所有api
import * as API from '@/api';
// 引入表单验证
import '@/plugins/validate'

Vue.use(VueLazyload, { loading: Chou })
// 生产提示
Vue.config.productionTip = false
// 注册全局组件
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)

// 全局过滤器
Vue.filter('decimal', function (value) {
  // console.log(this);
  return value.toFixed(2)
})


new Vue({
  render: h => h(App),
  // 注册路由，则组件上有$router和$route
  router,
  // 注册vuex，则组件上有$store
  store,
  beforeCreate() {
    Vue.prototype.$bus = this     // 全局总线
    Vue.prototype.$api = API
    Vue.prototype.$msgbox = MessageBox    // 操作弹窗
    Vue.prototype.$alert = MessageBox.alert;  // 支付弹窗(弹出)
  }
}).$mount('#app')
