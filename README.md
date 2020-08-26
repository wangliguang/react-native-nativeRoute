
# react-native-native-route

## 概念说明

### 纯RN(没有接入导航器)

app中所有的页面都是RN页面，没有Native页面

### 混合RN(没有接入导航器)

app中有RN页面也有Native页面

## 介绍

给纯RN app和混合RN app提供一套纯Native路由解决方案


## 背景

在纯RN项目中，若使用navigation做路由，

1. 配置麻烦，并且navigation的文档对国内开发者并不是那么友好
2. 若未来转混合需要对路由进行重构
3. 在开发中需要把路由对象层层传递给子组件，子组件才能跳转

在混合RN项目中，若即使用navigation路由又使用Native路由

1. 需要同时维护两个路由栈，有很多的坑，说多了都是泪
2. RN开发和Native开发需要频繁的沟通，增加沟通成本

为了让开发者更加专注于业务和增强路由的扩展性，我们决定将路由给统一，统一交给Native处理

## 优势

- 跳转随时使用，不需要多层级传递路由对象
- 因为基于Native路由，所以Native路由能做的事情，该路由也都可以做，比如scheme和网页的跳转等
- 基于该路由纯RN app可以无缝转入混合
- RN本身提供有Fast Refresh来帮助开发者进行页面调试，，但若层级过深，就会失效。而该路由直接在调试页面刷新即可看到变化，无需再做跳转进入指定页面，调试神奇呀
- 若接入该路由，但还是想使用navigation的路由方式跳转，同样支持

## 劣势

- 不提供导航栏，需自定义
- 不提供底部分栏，需按照demo自己实现
- 启动图使用`react-native-splash-screen`，但用法上需要按照我们的demo做些小小的改造


## 原理

navigation路由其实是RN页面在单个`VC/Activity`(后续统称容器)之间进行跳转，纯Native路由跟纯原生开发一样是多个容器之间进行跳转，即每个React页面用单独的容器承载。基于这种机制，我们需要用`AppRegistry.registerComponent`注册每个RN页面。

**PS：使用该路由后，页面跳转就是多个容器的跳转，而不是RN页面都在同一个容器中跳转**，接入我们路由后，依然使用navigation跳转除外

有朋友可能会担心不同容器承载不同的React页面，页面直接的数据共享/参数传递/页面回调等如何处理。下面一一解答：

### 数据共享问题

首先我们要了解一个RN特性，在同一个bridge下即同一个js环境下，数据是可以共享的。在该路由下，虽然使用了多个容器，但始终创建了一个bridge，因此页面之间的数据共享不成问题，可以正常使用redux等状态管理工具

### 参数传递

原生跳转RN页面，官方已提供参数传递接口

### 页面回调

若页有面回调，RN层会给该回调创建一个唯一的`callbackId`，并保存在RN的全局消息队列中，若要执行回调，将指定的`callbackId`发送给原生让原生再发送通知，接着RN收到通知执行指定回调。

为啥要让Native发送通知，而不是直接RN发送通知，这是为未来的多bridge做准备。点击了解[RN的多bridge设计](https://blog.csdn.net/gg_ios/article/details/102455637)

### QA

有其他问题欢迎提issue


## 安装

`$ npm install react-native-native-route --save`

### Mostly automatic installation

`$ react-native link react-native-native-route`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-native-route` and add `RNNativeRoute.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNNativeRoute.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.chengzi.nativeRoute.RNNativeRoutePackage;` to the imports at the top of the file
  - Add `new RNNativeRoutePackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
    	```
        	include ':react-native-native-route'
        	project(':react-native-native-route').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-native-route/android')
    ```
    
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  ```
compile project(':react-native-native-route')
  ```

### 单容器加载更改为多容器加载

#### iOS

#### android

## API

### 导入
```javascript
import ROUTE from 'react-native-native-route';
```
### ROUTE.push

如若设置回调，给params赋值`callback`字段即可，并且回调参数只能以对象的方式接收，比如：`({ userId }) => {}`，错误示例：`(userId) => {}`
​```javascript
push(pageName: string, params: any = {}): void;
  ```

### ROUTE.pop
​```javascript
// pageName不传即返回上一级，否则返回指定页面
pop(pageName?: string): void;
  ```

### ROUTE.backTo
回首页，共两种用法
1. backTo(tabName, params): 切换到首页，参数给tabName
2. backTo(tabName, pageName, params): 切换到首页后立即跳转到新的二级页面，参数给pageName
```javascript
backTo(tabName: string, pageName = '', params = {}): void;
```
### ROUTE.replace

如若设置回调，给params赋值`callback`字段即可，并且回调参数只能以对象的方式接收，比如：`({ userId }) => {}`，错误示例：`(userId) => {}`

重置路由后，会清空该路由之后的路由，比如：当前路由栈`A->B->C-D`，replace到B，路由栈变为`A->B`
```javascript
replace(pageName: string, params: any = {}): void;
```
### ROUTE.callback
执行路由回调，当上级页面跳转传`callback`字段时，当前页面的参数里就会有`callbackId`字段

参数都以对象传递，不支持单个传递，示例：`ROUTE.callback('332323', { name: 'GG' })`，错误示例：`ROUTE.callback('332323', 'GG')`
```javascript
callback(callbackId: string, params = {}): void;
```

### ROUTE.getRouters
异步获取当前路由栈
```javascript
getRouters(): Promise<Array<{ routeName, params }>>
```

### ROUTE.closeIOSDrawPop

iOS，关闭当前页面的侧滑返回

无论之前侧滑是什么状态，进入新页面都会默认打开侧滑，哪个页面需要关闭调用该API即可

android的物理返回键使用BackHandler处理即可

```javascript
closeIOSDrawPop(): void;
```

### 给页面增加生命周期

RN路由(指navigation)通过监听的方式可以给页面增加`willFocus/didFocus/willBlur/didBlur`生命周期，我们也支持，使用方式如下

`pageId`是在Native跳转便自动携带的。为了简化写法，这块建议统一放在高阶或hook里
```javascript
// 页面销毁时，记得调用`this.willFocusSubscription.remove()`将监听销毁
this.willFocusSubscription = DeviceEventEmitter.addListener(`willFocus_${this.props.pageId}`, () => {
        
});
// 页面销毁时，记得调用`this.didFocusSubscription.remove()`将监听销毁
this.didFocusSubscription = DeviceEventEmitter.addListener(`didFocus_${this.props.pageId}`, () => {
  this.refCompose.componentDidFocus && this.refCompose.componentDidFocus();
});
// 页面销毁时，记得调用`this.willBlurSubscription.remove()`将监听销毁
this.willBlurSubscription = DeviceEventEmitter.addListener(`willBlur_${this.props.pageId}`, () => {
  this.refCompose.componentWillBlur && this.refCompose.componentWillBlur() ;
});
// 页面销毁时，记得调用`this.didBlurSubscription.remove()`将监听销毁
this.didBlurSubscription = DeviceEventEmitter.addListener(`didBlur_${this.props.pageId}`, () => {
  this.refCompose.componentDidBlur && this.refCompose.componentDidBlur();
});
```

### 设置启动图

基于[react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)

### 底部分栏的支持

