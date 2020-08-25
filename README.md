
# react-native-native-route

混合RN项目纯Native路由方案，同时支持纯navigation路由

在纯RN项目中，只需维护RN路由，但在混合RN项目需要同时维护两套路由栈：RN路由栈和Native路由栈，这就比较坑了。为了让开发者更加专注于业务，我们决定将路由给统一，统一交给Native处理。


## Getting started

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

## API

### 导入
```javascript
import ROUTE from 'react-native-native-route';
```
### ROUTE.push

如若设置回调，给params赋值`callback`字段即可，并且回调参数只能以对象的方式接收，比如：`({ userId }) => {}`，错误示例：`(userId) => {}`
```javascript
push(pageName: string, params: any = {}): void;
```

### ROUTE.pop
```javascript
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
