import XCRoute from './XCRoute';
import { DeviceEventEmitter, Platform } from 'react-native';

/**
 * push
 * @param pageName 路由名
 * @param params 参数，如若设置回调赋值`callback`字段即可，并且回调参数只能以对象的方式接收，比如：`({ userId }) => {}`，错误示例：`(userId) => {}`
 */
function push(pageName: string, params: any = {}) {
    if (!params.callback) {
        XCRoute.push(pageName, params);
        return;
    }

    const eventId = `${pageName}_${new Date().getTime()}`;
    XCRoute.push(pageName, {
        ...params,
        callbackId: eventId,
    });
    DeviceEventEmitter.addListener(eventId, params.callback);
}




/**
 * 返回上一级
 * @param pageName 不传即返回上一级，否则返回指定页面
 */
function pop(pageName?: string) {
    XCRoute.pop(pageName || '');
}

/**
 * 回首页，共两种用法
 * 1. backTo(tabName, params): 切换到首页，参数给tabName
 * 2. backTo(tabName, pageName, params): 切换到首页后立即跳转到新的二级页面，参数给pageName
 */
function backTo(tabName: string, pageName = '', params = {}) {
    if (typeof pageName === 'string') {
        return XCRoute.backTo(tabName, pageName, params);
    }
    return XCRoute.backTo(tabName, '', pageName);
}

/**
 * replace
 * @param pageName 路由名
 * @param params 参数，如若设置回调赋值`callback`字段即可，并且回调参数只能以对象的方式接收，比如：`({ userId }) => {}`，错误示例：`(userId) => {}`
 * @description 重置路由后，会清空该路由之后的路由，比如：当前路由栈A->B->C-D，replace到B，路由栈变为A->B
 */
function replace(pageName: string, params: any = {}) {
    if (!params.callback) {
        XCRoute.replace(pageName, params);
        return;
    }

    const eventId = `${pageName}_${new Date().getTime()}`;
    XCRoute.replace(pageName, {
        ...params,
        callbackId: eventId,
    });
    DeviceEventEmitter.addListener(eventId, params.callback);
}

/**
 * 执行路由回调
 * @param callbackId 当上级页面跳转传`callback`字段时，当前页面的参数里就会有`callbackId`字段
 * @param params 参数都以对象传递，不支持单个传递，示例：ROUTE.callback('332323', { name: 'GG' })，错误示例：ROUTE.callback('332323', 'GG')
 */
function callback(callbackId: string, params = {}) {
    XCRoute.sendEvent(callbackId, params);
}

type routeType = {
    routeName: string;
    params: any; // 肯定会有pageId(用来注册didFoucs等生命周期)，当有回调就会存在callbackId
};
/**
 * 获取当前路由栈
 * @returns Promise<Array<{ routeName, params }>>
 */
async function getRouters(): Promise<Array<routeType>> {
    return await XCRoute.getRouters();
}

/**
 * iOS，关闭当前页面的侧滑返回
 * 
 * @description 无论之前侧滑是什么状态，进入新页面都会默认打开侧滑，哪个页面需要关闭调用该API即可
 * @external android的物理返回键使用BackHandler处理即可
 */
function closeIOSDrawPop() {
    if (Platform.OS === 'android') return;
    XCRoute.setRightDrawPopEnabled(false);
}

export default {
    push,
    pop,
    backTo,
    replace,
    callback,
    getRouters,
    closeIOSDrawPop,
};
