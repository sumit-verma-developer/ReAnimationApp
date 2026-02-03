package com.animationapp;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.Activity;

public class MyNativeModules extends ReactContextBaseJavaModule {
    public MyNativeModules(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "LoginModule";
    }

    @ReactMethod
    public void showLoginScreen() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            Intent i = new Intent(getReactApplicationContext(), LoginActivity.class);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getReactApplicationContext().startActivity(i);
        } else {
            Intent i = new Intent(currentActivity, LoginActivity.class);
            currentActivity.startActivity(i);
        }
    }

    @ReactMethod
    public void showSignupScreen() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity == null) {
            Intent i = new Intent(getReactApplicationContext(), SignupActivity.class);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getReactApplicationContext().startActivity(i);
        } else {
            Intent i = new Intent(currentActivity, SignupActivity.class);
            currentActivity.startActivity(i);
        }
    }
}
