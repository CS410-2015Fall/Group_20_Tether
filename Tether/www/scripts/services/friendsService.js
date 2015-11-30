/**
 * Created by jay-_ on 2015-11-30.
 */
'use strict';
angular.module('tetherApp')
    .service('friendsService',function friendsService($q,$http){
        var service = {

            'GCM_URL': 'https://android.googleapis.com/gcm/send',

            'request': function (args) {

                // Continue
                params = args.params || {}
                args = args || {};
                var deferred = $q.defer(),
                    url = this.GCM_URL,
                    method = args.method || "POST",
                    params = params,
                    data = args.data || {};

                $http({
                    headers : {'Content-Type': 'application/json','Authorization':'key=AIzaSyCxLrs3Sw4YJ2HuFfe66UgVkBRCKMc0AwQ'},
                    url: url,
                    method: method.toUpperCase(),
                    data: data,
                })
                    .success(angular.bind(this, function (data, status, headers, config) {
                        deferred.resolve(data, status);
                    }))
                    .error(angular.bind(this, function (data, status, headers, config) {
                        console.log("error syncing with: " + url);
                        // Set request status
                        if (data) {
                            data.status = status;
                        }
                        if (status == 0) {
                            if (data == "") {
                                data = {};
                                data['status'] = 0;
                                data['non_field_errors'] = ["Could not connect. Please try again."];
                            }
                            // or if the data is null, then there was a timeout.
                            if (data == null) {
                                // Inject a non field error alerting the user
                                // that there's been a timeout error.
                                data = {};
                                data['status'] = 0;
                                data['non_field_errors'] = ["Server timed out. Please try again."];
                            }
                        }
                        deferred.reject(data, status, headers, config);
                    }));
                return deferred.promise;
            },
            'notifyfriend': function (togcm,message) {
                var data = {
                    'title':'Tether',
                    'message':message,
                    'msgcnt':'1',
                    'soundname':'beep.wav',
                }
                return this.request({
                    'method': "POST",
                    'data': {
                        'collapse_key': 'msg',
                        'time_to_live': 2419200,
                        'delay_while_idle':true,
                        'data': data,
                        'to': togcm
                    }
                });
            }
        }
        return service;
    });

