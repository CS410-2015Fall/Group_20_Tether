angular.module('tetherApp')
    .service('pushService', function pushService($q, $window) {

    var pushConfig = {};
    if (device.platform == 'android' || device.platform == 'Android') {
        pushConfig = {
            // senderID = ProjectID in google developer console
            "senderID":"386947111301",
            "ecb":"onNotificationGCM"
        };
    } else {
        pushConfig = {
            "badge":"true",
            "sound":"true",
            "alert":"true",
            "ecb":"onNotificationAPN"
        };
    }

    // handle GCM notifications for Android
    $window.onNotificationGCM = function (event) {
        switch (event.event) {
            case 'registered':
                if (event.regid.length > 0) {
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    console.log("regID = " + event.regid);
                    //$cookies.gcmtoken = event.regid;
                    //console.log("coockietoken = "+$cookies.gcmtoken);
                    $window.localStorage.gcmtoken = event.regid;
                    console.log("localtoken = " + $window.localStorage.gcmtoken);
                }
                break;

            case 'message':
                // if this flag is set, this notification happened while we were in the foreground.
                // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                if (event.foreground) {
                    console.log('INLINE NOTIFICATION');
                    var my_media = new Media("/android_asset/www/" + event.soundname);
                    my_media.play();
                    navigator.notification.vibrate(1000);
                } else {
                    if (event.coldstart) {
                        console.log('COLDSTART NOTIFICATION');
                    } else {
                        console.log('BACKGROUND NOTIFICATION');
                    }
                }
                // todo handle storing the result
                if(event.payload.contractjson){
                    navigator.notification.confirm(event.payload.message,
                        function(button){
                            if (button = 1){
                                var json = event.payload.contractjson;
                                // stringify json
                                var text = JSON.stringify(json);
                                console.log("text "+text);
                                // parse json
                                var obj = JSON.parse(text);
                                // get whatever you want
                                var place = obj.contract.proposer;
                                console.log("contract stored to "+place);
                                $window.localStorage.setItem(place, text);
                                // just for testing
                                var localcontract = $window.localStorage.getItem(place);
                                console.log("local contract "+localcontract);
                                alert("You have accepted the contract, go to your contracts page to view the contract");
                            }
                            else{
                                alert("You have rejected the contract");
                            }
                        },'','Accept, Reject');
                    console.log('MESSAGE -> MSG: ' + event.payload.message);
                    //Only works for GCM
                    console.log('MESSAGE -> MSGCNT: ' + event.payload.msgcnt);
                } else{
                    navigator.notification.alert(event.payload.message);
                    console.log('MESSAGE -> MSG: ' + event.payload.message);
                    //Only works for GCM
                    console.log('MESSAGE -> MSGCNT: ' + event.payload.msgcnt);
                }
                break;
            case 'error':
                console.log('ERROR -> MSG:' + event.msg);
                break;

            default:
                console.log('EVENT -> Unknown, an event was received and we do not know what it is');
                break;
        }
    };

    // handle APNS notifications for iOS
    $window.successIosHandler = function (result) {
        console.log('result = ' + result);
    };

    $window.onNotificationAPN = function (e) {
        if (e.alert) {
            console.log('push-notification: ' + e.alert);
            navigator.notification.alert(e.alert);
        }

        if (e.sound) {
            var snd = new Media(e.sound);
            snd.play();
        }

        if (e.badge) {
            pushNotification.setApplicationIconBadgeNumber("successIosHandler", e.badge);
        }
    };

    return {
        register: function () {
            var q = $q.defer();

            window.plugins.pushNotification.register(
                function (result) {
                    q.resolve(result);
                },
                function (error) {
                    q.reject(error);
                },
                pushConfig);

            return q.promise;
        },
        unregister: function(){
            var q = $q.defer();

            window.plugins.pushNotification.unregister(
                function(result){
                    q.resolve(result);
                },
                function (error){
                    q.reject(error);
                },
                pushConfig);

            return q.promise;
        }

    }
});