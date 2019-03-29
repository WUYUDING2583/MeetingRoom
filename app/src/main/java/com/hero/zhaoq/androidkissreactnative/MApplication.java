package com.hero.zhaoq.androidkissreactnative;

import android.app.Application;
import android.support.annotation.Nullable;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.oblador.vectoricons.VectorIconsPackage;
import com.henninghall.date_picker.DatePickerPackage;

import java.util.Arrays;
import java.util.List;


public class MApplication extends Application implements ReactApplication {

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new VectorIconsPackage(),
                    new DatePickerPackage()
            );
        }

        @Nullable
        @Override
        protected String getBundleAssetName() {
            return "index.android.bundle";
        }

        @Nullable
        @Override
        protected String getJSBundleFile() {
            return super.getJSBundleFile();
        }

        @Override
        protected String getJSMainModuleName() {
            return "index.android";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
