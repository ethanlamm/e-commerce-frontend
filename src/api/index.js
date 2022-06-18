// 统一管理api接口
import requestor from './request'

import mockRequestor from './mockAjax'
// axios返回的是一个Promise对象

// 三级联动接口
export const reqCategoryList = () => {
    return requestor({
        method: 'GET',
        url: '/product/getBaseCategoryList'
    })
}
// 首页大轮播图 mock数据
export const reqBannerList = () => {
    return mockRequestor({
        method: 'GET',
        url: '/banner'
    })
}
// 楼层 mock数据
export const reqFloorList = () => {
    return mockRequestor({
        method: 'GET',
        url: '/floor'
    })
}
// 搜索
export const reqSearchInfo = (params) => {
    return requestor({
        method: 'POST',
        url: '/list',
        data: params
    })
}
// 详情
export const reqDetailInfo = (skuId) => {
    return requestor({
        method: 'GET',
        url: `/item/${skuId}`
    })
}
// 加入购物车成功
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
    return requestor({
        method: 'POST',
        url: `/cart/addToCart/${skuId}/${skuNum}`
    })
}
// 获取购物车列表
export const reqShopCart = () => {
    return requestor({
        method: 'GET',
        url: '/cart/cartList'
    })
}

// 删除购物车列表中的一个
export const reqDeleteCart = (skuId) => {
    return requestor({
        method: 'DELETE',
        url: `/cart/deleteCart/${skuId}`
    })
}

// 修改商品选中状态
export const reqCartIsChecked = (skuId, isChecked) => {
    return requestor({
        method: 'GET',
        url: `/cart/checkCart/${skuId}/${isChecked}`
    })
}

// 注册-获取验证码
export const reqRegisterCode = (phone) => {
    return requestor({
        method: 'GET',
        url: `/user/passport/sendCode/${phone}`
    })
}

// 用户注册
export const reqRegister = (data) => {
    return requestor({
        method: 'POST',
        url: '/user/passport/register',
        data: data
    })
}

// 用户登陆
export const reqLogin = (data) => {
    return requestor({
        method: 'POST',
        url: '/user/passport/login',
        data: data
    })
}

// 登录后获取用户信息
export const reqUserInfo = () => {
    return requestor({
        method: 'GET',
        url: '/user/passport/auth/getUserInfo',
    })
}

// 退出登录
export const reqUserLogout = () => {
    return requestor({
        method: 'GET',
        url: '/user/passport/logout',
    })
}

// 用户地址
export const reqUserAddress = () => {
    return requestor({
        method: 'GET',
        url: '/user/userAddress/auth/findUserAddressList',
    })
}

// 用户获取订单商品
export const reqUserOrderInfo = () => {
    return requestor({
        method: 'GET',
        url: '/order/auth/trade',
    })
}

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
    return requestor({
        method: 'POST',
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data
    })
}

// 获取订单信息(orderId)
export const reqOrderInfo = (orderId) => {
    return requestor({
        method: 'GET',
        url: `/payment/weixin/createNative/${orderId}`,
    })
}

// 查询订单是否支付(orderId)
export const reqPayInfo = (orderId) => {
    return requestor({
        method: 'GET',
        url: `/payment/weixin/queryPayStatus/${orderId}`,
    })
}

// 获取我的订单信息
export const reqMyOrder = (page, limit) => {
    return requestor({
        method: 'GET',
        url: `/order/auth/${page}/${limit}`,
    })
}