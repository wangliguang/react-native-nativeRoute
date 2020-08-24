
# react-native-native-route

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


## Usage
```javascript
import RNNativeRoute from 'react-native-native-route';

// TODO: What to do with the module?
RNNativeRoute;
```
  