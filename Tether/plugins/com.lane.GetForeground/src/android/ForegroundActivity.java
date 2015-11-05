package com.lane.GetForeground;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;


import org.json.JSONObject;
import org.json.JSONArray;
import org.json.JSONException;
import android.accessibilityservice.AccessibilityService;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.ActivityManager;
import android.app.Application;
import android.app.IntentService;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ByteArrayOutputStream;

import android.os.Build;
import android.os.Environment;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
        import android.graphics.drawable.BitmapDrawable;
        import android.content.Context;
        import android.graphics.PixelFormat;
        import android.util.Log;

        import java.lang.reflect.Field;
        import java.lang.reflect.InvocationTargetException;
        import java.lang.reflect.Method;
        import java.util.ArrayList;
        import java.util.Collection;
        import java.util.Iterator;
        import java.util.List;
        import java.util.ListIterator;
        import java.util.Map;
        import java.util.SortedMap;
        import java.util.TreeMap;
        import java.util.concurrent.Executors;
        import java.util.concurrent.ScheduledExecutorService;
        import java.util.concurrent.TimeUnit;

/**
 * Created by lanepither on 15-10-28.
 */

public class ForegroundActivity extends CordovaPlugin {

    private AccessibilityService newContext;
    private String topPackageName ;
    private String appName;
    private Context context1;
    private CallbackContext callbackContext1;

    private static final String ACTION_GET_FOREGROUND_APP = "getForegroundApp";



    public ForegroundActivity(){

    }


    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException{
        
        context1 =     this.cordova.getActivity().getApplicationContext();
        this.callbackContext1 = callbackContext;

        if (ACTION_GET_FOREGROUND_APP.equals(action)){
            cordova.getThreadPool().execute(new Runnable(){
                public void run(){
                    try {

                        

                        if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.KITKAT_WATCH){
                        getForegroundApp(context1);
                        } else {
                        getForegroundAppLollipop(context1);
                        }

                        String frontApp = getAppName();
                        //JSONArray foreground_App = new JSONArray();
                        //JSONObject info = new JSONObject();

                        //info.put("App",frontApp);

                        //foreground_App.put(0,info);

                        callbackContext.success( frontApp );
                    } catch (Exception e){
                        callbackContext.error(e.getMessage());
                    }
                }// end of run

            });
            return true; // end of execute runnable
        }//end of if

        callbackContext.error("Invalid action");
        return false;
    }


/*

    @Override
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException{
            if (ACTION_GET_FOREGROUND_APP.equals(action))
            {
                try{

                     Runnable runThis = new Runnable(){
               public void run(){

                   if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.KITKAT_WATCH){
                       getForegroundApp(context);
                   } else {
                       getForegroundAppLollipop(context);
                   }

             }
             };

                    



                    startService(new Intent(this, ForegroundActivityService.class));

                    String foreground_App = getAppName();

                    callbackContext.success(foreground_App);

                    


                } catch(Exception e){
                    System.err.println("Exception: " + e.getMessage());
                    callbackContext.error(e.getMessage());
                }

                return true;
            }

            callbackContext.error("Invalid action");
            return false;
    } */

    public String getAppName(){
        return appName;
    }


    public void getForegroundApp(Context context){
        //Context context = getContext();
        ActivityManager mActivityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        ActivityManager.RunningTaskInfo foregroundTaskInfo = mActivityManager.getRunningTasks(1).get(0);
        String foregroundTaskPackageName = foregroundTaskInfo .topActivity.getPackageName();
        PackageManager pm = context.getPackageManager();
        PackageInfo foregroundAppPackageInfo = getInfo(pm, foregroundTaskPackageName);
        String foregroundTaskAppName = foregroundAppPackageInfo.applicationInfo.loadLabel(pm).toString();

        appName = foregroundTaskAppName;
        //callbackContext1.success( appName );
        Log.i("myapp", foregroundTaskAppName);

    }

    public PackageInfo getInfo(PackageManager pm, String packageName){
        try {
            return pm.getPackageInfo(packageName, 0);
        } catch (NameNotFoundException e){
            Log.i("errorrrrr", "eioi");
        }

        return pm.getPackageArchiveInfo(packageName, 0);
    };



    public void getForegroundAppLollipop(Context context){
        ActivityManager.RunningAppProcessInfo currentInfo = null;
        Field field = null;
        try {
            field = ActivityManager.RunningAppProcessInfo.class.getDeclaredField("processState");
        } catch (Exception ignored) {
        }
        ActivityManager am = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appList = am.getRunningAppProcesses();
        for (ActivityManager.RunningAppProcessInfo app : appList) {
            if (app.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND
                    && app.importanceReasonCode == ActivityManager.RunningAppProcessInfo.REASON_UNKNOWN) {
                Integer state = null;
                try {
                    state = field.getInt(app);
                } catch (Exception e) {
                }
                if (state != null && state == 2) {
                    currentInfo = app;
                    int pID  = currentInfo.pid;

                    PackageManager pm = context1.getPackageManager();
                    List l = am.getRunningAppProcesses();
                    Iterator i = l.iterator();
                    while(i.hasNext())
                    {
                        ActivityManager.RunningAppProcessInfo info = (ActivityManager.RunningAppProcessInfo)(i.next());
                        try
                        {
                            if(info.pid == pID)
                            {
                                //CharSequence c = pm.getApplicationLabel(pm.getApplicationInfo(info.processName, PackageManager.GET_META_DATA));

                                String processName = info.processName;

                                ApplicationInfo applicationInfo = null;
                                try {
                                    applicationInfo = pm.getApplicationInfo(processName, 0);
                                } catch (final NameNotFoundException e) {}

                                final String title = (String)((applicationInfo != null) ? pm.getApplicationLabel(applicationInfo) : "???");
                                appName = title;
                                //callbackContext1.success( appName );

                                Log.i("myapp", title);


                            }
                        }
                        catch(Exception e)
                        {
                            //Log.d("Process", "Error>> :"+ e.toString());
                        }
                    }

                    break;
                }
            }
        }
    }


    private Context getContext(){

        Application a = null;
        try {
            final Class<?> activityThreadClass = Class.forName("android.app.ActivityThread");
            final Method method = activityThreadClass.getMethod("currentApplication");
            a =  (Application) method.invoke(null, (Object[]) null);
        } catch (final ClassNotFoundException e){
            Log.i("Error", "hit error");
        } catch (final NoSuchMethodException e){
            Log.i("Error", "hit error");
        } catch (final IllegalArgumentException e){
            Log.i("Error", "hit error");
        } catch (final IllegalAccessException e) {
            Log.i("Error", "hit error");
        } catch (final InvocationTargetException e) {
            Log.i("Error", "hit error");
        }

        return a.getApplicationContext();
    }

   
    



}





