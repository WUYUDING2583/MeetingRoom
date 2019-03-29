package com.hero.zhaoq.androidkissreactnative.native_communication;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class RecognizePackage implements ReactPackage {


    private List<NativeModule> nativeModules;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        nativeModules = new ArrayList<>();
        nativeModules.add(new RecognizeInterface(reactContext));
        return nativeModules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    public NativeModule getInterf(int index) {
        if (nativeModules== null)
            return null;
        return nativeModules.get(index);
    }
}
