
package com.chengzi.nativeRoute;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNNativeRouteModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNNativeRouteModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNNativeRoute";
  }
}