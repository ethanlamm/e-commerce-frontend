// 引入路由组件
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Help from '@/pages/Help';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'


export default [
    // 重定向，在项目初始化时，首先访问的是首页
    {
        path: '*',
        redirect: '/home'
    },
    {
        name: 'home',
        path: '/home',
        // 懒加载
        component: () => import('@/pages/Home'),
        meta: { show: true }
    },
    {
        name: 'login',
        path: '/login',
        // 懒加载
        component: () => import('@/pages/Login'),
        meta: { show: false }

    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: { show: false }

    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true }
    },
    {
        name: 'detail',
        path: '/detail/:skuId',
        component: Detail,
        meta: { show: true }
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/pay') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        name: 'help',
        path: '/help',
        component: Help,
        meta: { show: true }
    },
    {
        name: 'center',
        path: '/center',
        component: Center,
        meta: { show: true },
        children: [
            {
                // 重定向
                path: '/center',
                redirect: '/center/myorder'
            },
            {
                name: 'myorder',
                path: 'myorder',
                component: MyOrder
            },
            {
                name: 'grouporder',
                path: 'grouporder',
                component: GroupOrder
            },
        ]
    },
]