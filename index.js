
import { NativeModules } from 'react-native';

const { RNNativeRoute } = NativeModules;

const XCRoute = RNNativeRoute;

function push(pageName, params) {
    console.log('页面跳转：' + pageName);
    return XCRoute.push(pageName, params);
}

function pop(pageName) {
    XCRoute.pop(pageName);
}

/**
 * 重置路由到首页
 * @param tabName 首页的哪个tab
 * @param pageName 回到首页后，立马哪个页面
 * @param params
 */
function backTo(tabName, pageName = '', params = {}) {
    XCRoute.backTo(tabName, pageName, params);
}

function replace(pageName, params) {
    return XCRoute.replace(pageName, params);
}

function sendEvent(callbackId, params) {
    XCRoute.sendEvent(callbackId, params);
}

function getRouters() {
    return XCRoute.getRouters();
}

function setRightDrawPopEnabled(enable) {
    return XCRoute.setRightDrawPopEnabled(enable);
}

export default {
    push: throttle(push),
    pop: throttle(pop),
    backTo: backTo,
    replace: throttle(replace),

    sendEvent,
    getRouters,
    setRightDrawPopEnabled,
};


function throttle(fn) {
    let lastTime = 0;
    return function(pageName, params) {
        const curTime = new Date().getTime();
        if (curTime - lastTime >= 500) {
            fn(pageName, params);
            lastTime = curTime;
        }
    };
}
