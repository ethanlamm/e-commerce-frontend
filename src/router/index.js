// 配置路由器
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';
import store from '@/store'
// vue - router是一个插件
Vue.use(VueRouter)


// 重写push/replace方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        // Vue2--Vuex3--return{x:... , y:...}
        // Vue3--Vuex4--return{top:...}
        return { y: 0 }
    },
})

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
    // 游客模式，全部放行
    // 已登陆(默认跳转至home页面)，登陆后不能跳转至login页面
    // 京东：登录后(首页)可跳转至login，但再返回(首页)，用户信息已没有，相当于退出了
    let token = localStorage.getItem('TOKEN')
    let name = store.state.userOptions.userInfo.name
    // 但这里根据本地存储的token判段是否登录不准确，若未过期token，应该重新登录
    // 所以，请求拦截器中发请求携带的应该是本地存储的token，要发送至服务器验证是否过期
    if (!token) {
        // 游客模式，不能访问 addcartsuccess center pay paysuccess shopcart trade
        // 白名单
        let arr = ['detail', 'help', 'home', 'login', 'register', 'search']
        if (arr.includes(to.name)) {
            // 放行
            next()
        } else {
            // 要去的路径保存到query中
            let toPath = to.path
            next(`/login?redirect=${toPath}`)
        }
    } else {
        // 有token，已登录
        // 若去login页面，京东做法(前提：type=logout)：清除数据后，再跳转至login页面
        // 若在home页面，跳转至login(type=login)，京东未清除数据，返回依然是已登录状态

        // 这里有token，要分情况：token是否过期了
        // 过期了：api / request是拿本地存储的token发到服务器验证后拿用户信息的，若过期，则用户信息拿不到
        // 未过期：仓库中则一定存储着用户信息
        if (name) {
            // name存在，表示token未过期
            // 去login？
            if (to.name == "login") {
                // 清除数据(包括仓库和本地存储的数据)，退出登陆
                store.dispatch("userOptions/userLogout")
                // 放行至login页面，重新登录
                next()
            } else {
                // 有token，已登录，去其他页面，放行
                next()
            }
        } else {
            // name不存在，分情况：还未获取到信息 || token过期
            try {
                // 还未获取到信息
                await store.dispatch("userOptions/getUserInfo")
                next()
            } catch (error) {
                // token过期
                // 再次清除数据(主要是本地数据，仓库数据由于过期token未获取到用户信息，没有保存)
                store.dispatch("userOptions/userLogout")
                // 跳至登陆页面，重新登录
                next('/login')
            }
        }
    }

})



export default router