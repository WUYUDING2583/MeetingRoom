package com.hero.zhaoq.androidkissreactnative.native_communication;

import android.app.Activity;
import android.content.Intent;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.hero.zhaoq.androidkissreactnative.activitys.FragmentScreenActivity;
import com.hero.zhaoq.androidkissreactnative.activitys.SettingScreenActivity;

public class SettingInterface extends ReactContextBaseJavaModule{
    private  ReactApplicationContext reactContext;

    public SettingInterface(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SettingInterface";
    }

    /**
     * Rn 需要调用的方法：
     * @param message
     */
    @ReactMethod
    public void HandleMessage(String message){
        Toast.makeText(reactContext,message,Toast.LENGTH_LONG).show();
    }

    @ReactMethod
    public void getCompanyId(Callback successBack) {
            Activity currentActivity = getCurrentActivity();
            int result = currentActivity.getIntent().getIntExtra("companyId", 0);//会有对应数据放入
            successBack.invoke(result);
    }

    @ReactMethod
    public void jumpToFragment(boolean isSetting){
        Intent intent = new Intent();
        intent.setClass(reactContext, FragmentScreenActivity.class);
        intent.putExtra("isSetting",isSetting);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);
    }

    /**
     * 发送消息到  RN 界面
     */
    public void sendMessage(String params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("mEventName", params);
    }
}
