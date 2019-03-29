package com.hero.zhaoq.androidkissreactnative.native_communication;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.hero.zhaoq.androidkissreactnative.activitys.FragmentScreenActivity;
import com.hero.zhaoq.androidkissreactnative.activitys.LoginScreenActivity;
import com.hero.zhaoq.androidkissreactnative.activitys.PreviewActivity;
import com.hero.zhaoq.androidkissreactnative.activitys.RegisterAndRecognizeActivity;
import com.hero.zhaoq.androidkissreactnative.activitys.SettingScreenActivity;

import java.util.Calendar;
import android.app.DatePickerDialog;
import android.widget.DatePicker;


public class FragmentInterface extends ReactContextBaseJavaModule{
    private  ReactApplicationContext reactContext;
    private Calendar calendar; // 通过Calendar获取系统时间
    private int mYear;
    private int mMonth;
    private int mDay;
    private int mHour;
    private int mMinute;

    public FragmentInterface(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "FragmentInterface";
    }

    /**
     * Rn 需要调用的方法：
     *
     */

    @ReactMethod
    public void showDatePicker(final Callback dateBack){
        calendar = Calendar.getInstance();
        new DatePickerDialog(reactContext,
                new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker view, int year,
                                          int month, int day) {
                        // TODO Auto-generated method stub
                        mYear = year;
                        mMonth = month;
                        mDay = day;
                        String d=mYear+"/"+(mMonth+1)+"/"+mDay;
                        dateBack.invoke(d);
                    }
                }, calendar.get(Calendar.YEAR), calendar
                .get(Calendar.MONTH), calendar
                .get(Calendar.DAY_OF_MONTH)).show();
    }

    @ReactMethod
    public void jumpToLogin(){
        Intent intent = new Intent();
        intent.setClass(reactContext, LoginScreenActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);

    }

    @ReactMethod
    public void jumpToFaceLogin(){
        Intent intent = new Intent();
        intent.setClass(reactContext, PreviewActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);

    }

    @ReactMethod
    public void jumpToRecognize(){
        Intent intent = new Intent();
        intent.setClass(reactContext, RegisterAndRecognizeActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);

    }

    @ReactMethod
    public void goToLogin(){
        Intent intent = new Intent();
        intent.setClass(reactContext, LoginScreenActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);

    }


    @ReactMethod
    public void getIsSetting(Callback successBack) {
        Activity currentActivity = getCurrentActivity();
        boolean result = currentActivity.getIntent().getBooleanExtra("isSetting",false);//会有对应数据放入
        successBack.invoke(result);
    }

    @ReactMethod
    public void getIsVerify(Callback successBack) {
        Activity currentActivity = getCurrentActivity();
        boolean result1 = currentActivity.getIntent().getBooleanExtra("isVerify",false);//会有对应数据放入
        boolean result2 = currentActivity.getIntent().getBooleanExtra("isPreview",false);//会有对应数据放入
        successBack.invoke(result1,result2);
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
//
//
//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        // 锁定屏幕
//        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
//        setContentView(R.layout.activity_main);
//        // 获取对象
//        //titleEdit = (EditText) findViewById(R.id.showtitle);
//        dateEdit = (EditText) findViewById(R.id.showdate);
//        calendar = Calendar.getInstance();
//        // 点击"日期"按钮布局 设置日期
//        dateEdit.setOnClickListener(new OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                new DatePickerDialog(MainActivity.this,
//                        new DatePickerDialog.OnDateSetListener() {
//                            @Override
//                            public void onDateSet(DatePicker view, int year,
//                                                  int month, int day) {
//                                // TODO Auto-generated method stub
//                                mYear = year;
//                                mMonth = month;
//                                mDay = day;
//                                // 更新EditText控件日期 小于10加0
//                                dateEdit.setText(new StringBuilder()
//                                        .append(mYear)
//                                        .append("-")
//                                        .append((mMonth + 1) < 10 ? "0"
//                                                + (mMonth + 1) : (mMonth + 1))
//                                        .append("-")
//                                        .append((mDay < 10) ? "0" + mDay : mDay));
//                            }
//                        }, calendar.get(Calendar.YEAR), calendar
//                        .get(Calendar.MONTH), calendar
//                        .get(Calendar.DAY_OF_MONTH)).show();
//            }
//        });
//    }
//}
