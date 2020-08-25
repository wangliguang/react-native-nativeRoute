
import { NativeModules } from 'react-native';

const { RNNativeRoute } = NativeModules;
const XCRoute = RNNativeRoute;

if (!XCRoute) {
    throw '尚未link原生代码';
}


function push(pageName, params = {}) {
    console.log('路由 === push：', pageName, params);
    return XCRoute.push(pageName, params);
}

function pop(pageName) {
    console.log('路由 === pop：', pageName);
    XCRoute.pop(pageName);
}

function backTo(tabName, pageName = '', params = {}) {
    console.log('路由 === backTo：', tab, pageName, params);
    XCRoute.backTo(tabName, pageName, params);
}

function replace(pageName, params) {
    console.log('路由 === replace：', pageName, params);
    return XCRoute.replace(pageName, params);
}

function sendEvent(callbackId, params) {
    console.log('路由 === callback：', callbackId, params);
    XCRoute.sendEvent(callbackId, params);
}

async function getRouters() {
    const routers = XCRoute.getRouters();
    console.log('路由 === getRouters', routers);
    return routers;
}

function setRightDrawPopEnabled(enable) {
    console.log('路由 === setRightDrawPopEnabled', enable);
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
