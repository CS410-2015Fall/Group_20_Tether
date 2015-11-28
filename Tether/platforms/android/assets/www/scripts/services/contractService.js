'use strict';
angular.module('tetherApp')
    .service('contractService',function contractService($q,$http){
        var service = {

            'GCM_URL': 'https://android.googleapis.com/gcm/send',
            // APPLIST AND APPMONITOR
            'applist': function(){
                var success = function(app_list){

                    document.getElementById('installedApps').innerHTML = '';
                    $.each(app_list, function () {
                        $("#installedApps").append($("<label>").text(this.name).prepend(
                            $("<input>").attr('type', 'checkbox').attr('id',(this.name))
                        ));
                    });
                };
                var error = function(app_list){
                    console.log("Fail:" + app_list);
                };
                Applist.createEvent('','','','','',success,error)
            },
            'request': function (args) {
                $http.defaults.headers.common.Authorization = 'key=AIzaSyCxLrs3Sw4YJ2HuFfe66UgVkBRCKMc0AwQ';
                // Continue
                params = args.params || {}
                args = args || {};
                var deferred = $q.defer(),
                    url = this.GCM_URL,
                    method = args.method || "POST",
                    params = params,
                    data = args.data || {};

                $http({
                    headers : {'Content-Type': 'application/json'},
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
            'contractbroken': function (togcm,contractjson) {
                var data = {
                    'title':'Tether',
                    'message':'Your contractor has broken the contract!',
                    'msgcnt':'1',
                    'soundname':'beep.wav',
                    'contractjson': contractjson
                }
                return this.request({
                    'method': "POST",
                    'data': {
<<<<<<< HEAD
                        "collapse_key" : "msg",
                        "time_to_live": 2419200,
=======
                        'collapse_key': 'msg',
                        'time_to_live': 2419200,
>>>>>>> newjaygcm
                        'delay_while_idle':true,
                        'data': data,
                        'to': togcm
                    }
                });
            },
            'contractsucceed': function(togcm,contractjson){
                var data = {
                    'title':'Tether',
                    'message':'Your contractor has successfully completed the contract!',
                    'msgcnt':'1',
                    'soundname':'beep.wav',
                    'contractjson': contractjson
                }
                return this.request({
                    'method': "POST",
                    'data': {
<<<<<<< HEAD
                        "collapse_key" : "msg",
                        "time_to_live": 2419200,
=======
                        'collapse_key': 'msg',
                        'time_to_live': 2419200,
>>>>>>> newjaygcm
                        'delay_while_idle':true,
                        'data': data,
                        'to': togcm
                    }
                });
            },
            'sendcontract': function (togcm,contractjson) {
                var data = {
                    'title': 'Tether',
                    'message': 'You have received a new contract!',
                    'msgcnt': '1',
                    'soundname': 'beep.wav',
                    'contractjson': contractjson
                }
                return this.request({
                    'method': "POST",
                    'data': {
<<<<<<< HEAD
                        "collapse_key": "demo",
                        "time_to_live": 2419200,
=======
                        'collapse_key': 'msg',
                        'time_to_live': 2419200,
>>>>>>> newjaygcm
                        'delay_while_idle': true,
                        'data': data,
                        'to': togcm
                    }
                });
            },
            'acceptcontract': function (togcm,contractjson) {
                var data = {
                    'title': 'Tether',
                    'message': 'Your contractee has accepted your contract!',
                    'msgcnt': '1',
                    'soundname': 'beep.wav',
                    'contractjson': contractjson
                }
                return this.request({
                    'method': "POST",
                    'data': {
<<<<<<< HEAD
                        "collapse_key": "demo",
                        "time_to_live": 2419200,
=======
                        'collapse_key': 'msg',
                        'time_to_live': 2419200,
>>>>>>> newjaygcm
                        'delay_while_idle': true,
                        'data': data,
                        'to': togcm
                    }
                });
            },
            'declinecontract': function (togcm,contractjson) {
                var data = {
                    'title': 'Tether',
                    'message': 'Your contractee has declined your contract!',
                    'msgcnt': '1',
                    'soundname': 'beep.wav',
                    'contractjson': contractjson
                }
                return this.request({
                    'method': "POST",
                    'data': {
<<<<<<< HEAD
                        "collapse_key": "demo",
                        "time_to_live": 2419200,
=======
                        'collapse_key': 'msg',
                        'time_to_live': 2419200,
>>>>>>> newjaygcm
                        'delay_while_idle': true,
                        'data': data,
                        'to': togcm
                    }
                });
            }
        }
        return service;
    });