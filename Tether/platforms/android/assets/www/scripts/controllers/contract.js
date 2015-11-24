/**
 * Created by Tunjay Jafarli on 2015-10-30.
 */

'use strict';

angular.module('tetherApp')
    .controller('contractCtrl', function ($window,$scope, $location, $http,$routeParams,contractService,userService){
        // gcm of the receiver retrieved from frinds.gcm_token
        // set to self for now
        //var togcm = 'APA91bEgD-5nvmVd7OXpO_vxQUJUcQ9Blq1LhKF9eh3dU3lwwRfHN9dIMsQfOAT-VcLPhOaPzpRt326cm5BVLlmmy1JUNH55x9EKx-poIfPdPfk96bnOGRL3s5JR_I82ZcmkwQB_2oQr';
        var togcm = 'APA91bGg0vTn0O2cuMqAG6b-V4qX5KU5NqPF2FG6zJoX_Yu5XT7cefVlR54L7dODZGhD8e2yAfC2-WZV2PIpMcUTp4ROVD0vhuZBnKwzjeKmYFkvJc0XDsuT3Sm1TEqNSnK4-a9Y9Mdu';
        $scope.submitted = false;
        $scope.contractOver = false;
        $scope.ongoingContract = false;

        $scope.validHours = true;
        $scope.validAppSelection = true;
        $scope.validWagerAmount = true;

        $scope.contractHours = 0;
        $scope.contractMinutes = 0;
        $scope.contractSeconds = 0;

        $scope.wagerAmount = 0;

        //Scope variables for monitoring
        $scope.blacklistedApps = [];
        $scope.foregroundApp = "";
        $scope.blacklistedAppUsed = "";
        $scope.from = "";
        userService.profile().then(function(data){
            var text = JSON.stringify(data);
            var jdata = JSON.parse(text);
            $scope.from=jdata.username;
        });
        $scope.friend = $window.localStorage.proposingTo;




        contractService.applist();

        /* $scope.createContract = function(){
         $location.path("/contract");
         $scope.showButton = false;

         var getInstalledAppEvent = new CustomEvent("getInstalledApps",{
         'bubbles': true,
         'cancelable': true
         });
         document.getElementById("startContract").dispatchEvent(getInstalledAppEvent);

         };

         document.addEventListener('getInstalledApps', function (){
         contractService.applist();
         }); */


        var contractJSON = '{"contract":{"apps":[],"durationInMins":0,"wagerAmount":0,"friend":"","gcmTokenFromProposer":"","from":"","status":""}}';

        $scope.submitContract = function(){

            var checkedBoxes = $(':checkbox:checked');

            $scope.blacklistedApps = [];
            $scope.validHours = true;
            $scope.validAppSelection = true;
            $scope.validWagerAmount = true;

            var globalForegroundApp = "";

            var obj = JSON.parse(contractJSON);

            for (var i = 0; i < checkedBoxes.length; i++){

                obj["contract"]["apps"].push({"name":checkedBoxes[i].id});
                $scope.blacklistedApps.push(checkedBoxes[i].id);
                console.log(checkedBoxes.text());

            }

            console.log($scope.blacklistedApps);

            // parse duration inputs
            var durationHrs = parseInt(document.getElementById("hrID").value);
            var durationMins = parseInt(document.getElementById("minID").value);
            var durationSecs = parseInt(document.getElementById("secID").value);

            // parse wagering amount input
            $scope.wagerAmount = parseInt(document.getElementById("wagerID").value);

            if (isNaN(durationHrs)){
                durationHrs = 0;
                $scope.contractHours = 0;
            }

            if (isNaN(durationMins)){
                durationMins = 0;
                $scope.contractMinutes = 0;
            }

            if (isNaN(durationSecs)){
                durationSecs = 0;
                $scope.contractSeconds = 0;
            }

            if (isNaN($scope.wagerAmount)){
                $scope.wagerAmount = 0;
            }


            if ($scope.blacklistedApps.length == 0){
                console.log("User hasn't selected any apps");
                $scope.validAppSelection = false;
            }

            if (!$scope.validateHours(durationHrs, durationMins, durationSecs)){
                console.log("Hour input denied");
                $scope.validHours = false;
            }

            if ($scope.wagerAmount == 0){
                console.log("Wagering amount is not valid");
                $scope.validWagerAmount = false;
            }

            if ($scope.validHours == false || $scope.validAppSelection == false || $scope.validWagerAmount == false){
                return;
            } else {
                // convert to minutes and attach to contract JSON object
                var durationInMins = (durationHrs * 60) + durationMins + (durationSecs / 60);
                obj["contract"].durationInMins = durationInMins;
                $scope.validHours = true;

                // attach wagering amount to contract JSON object
                obj["contract"].wagerAmount = $scope.wagerAmount;
                $scope.validWagerAmount = true;
            }

            obj["contract"].friend = $scope.friend;
            obj["contract"].gcmTokenFromProposer = $window.localStorage.gcmtoken;
            obj["contract"].from = $scope.from;
            obj["contract"].status = "proposed";
            contractJSON = JSON.stringify(obj);
            console.log(JSON.stringify(contractJSON));

            $scope.submitted = true;
            $scope.ongoingContract = true;
            $scope.contractOver = false;
            // store it yourself
            var storeAs = "contract"+$scope.from;
            $window.localStorage.setItem(storeAs,contractJSON);
            // gcm notification
            contractService.sendcontract(togcm,contractJSON).then(function(result) {
                // Success!
            }, function(err) {
                // An error occured. Show a message to the user
            });
            $scope.startTimer();
            $scope.startToasts();
        };




        $scope.startToasts = function(){

            $scope.createToasts = function(){
                $window.plugins.toast.showWithOptions(
                    {
                        message: "Keep on focusing ..",
                        duration: "short",
                        position: "bottom"
                    },
                    function(a){
                        console.log("toast success " + a)
                    },
                    function(a){
                        console.log("toast error " + a)
                    }
                );
            }

            $scope.createToasts();
            $scope.refreshToastMessage = setInterval($scope.createToasts, 2000);
        };







        $scope.startTimer = function() {

            var target_dateOld = new Date();

            var target_date = target_dateOld.setHours(target_dateOld.getHours() + $scope.contractHours);
            target_date = target_dateOld.setMinutes(target_dateOld.getMinutes() + $scope.contractMinutes);
            target_date = target_dateOld.setSeconds(target_dateOld.getSeconds() + $scope.contractSeconds);

            // variables for time units
            var days, hours, minutes, seconds, min, sec, ms, ms_step=1000;

            // get tag element
            var countdown = document.getElementById('countdown');

            $scope.updateClock = function() {
                var current_date = new Date().getTime();
                var seconds_left = (target_date - current_date) / 1000;
                days = parseInt(seconds_left / 86400);
                seconds_left = seconds_left % 86400;
                hours = parseInt(seconds_left / 3600);
                seconds_left = seconds_left % 3600;
                min = parseInt(seconds_left / 60);
                sec = parseInt(seconds_left % 60);
                ms = parseInt(target_date-current_date);

                // format countdown string + set tag value
                countdown.innerHTML = '' +
                    '<div><span class="hours">' + ('0' + hours).slice(-2) + '</span><div class="smalltext"> Hours </div></div> ' +
                    '<div><span class="minutes">' + ('0' + min).slice(-2) + '</span><div class="smalltext">Minutes</div></div> ' +
                    '<div><span class="seconds">' + ('0' + sec).slice(-2) + '</span><div class="smalltext">Seconds</div></div> ';

                $scope.checkForegroundApp();

                // success when timer hits zero
                if (seconds_left <= 0) {
                    clearInterval($scope.refreshContractTimerIntervalId);
                    $scope.succeeded();
                }

            }

            $scope.updateClock();
            $scope.refreshContractTimerIntervalId = setInterval($scope.updateClock, ms_step);

        };

        $scope.succeeded = function() {
            $scope.$apply(function(){
                $scope.ongoingContract = false;
                $scope.contractOver = true;
                $scope.contractSuccess = true;
                $scope.contractForfeited = false;
                $scope.blacklistedApps = [];
                clearInterval($scope.refreshToastMessage);
                // local notification
                navigator.notification.alert('You have successfully completed contract!');
                // gcm notification
                contractService.contractsucceed(togcm).then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occured. Show a message to the user
                });
            });
        };


        $scope.forfeit = function() {
            $scope.ongoingContract = false;
            $scope.contractOver = true;
            $scope.contractSuccess = false;
            $scope.contractForfeited = true;
            $scope.blacklistedApps = [];
            clearInterval($scope.refreshContractTimerIntervalId);
            clearInterval($scope.refreshToastMessage);
            // local notification
            navigator.notification.alert('You have broken your contract!');
            // gcm notification
            contractService.contractbroken(togcm,contractJSON).then(function(result) {
                // Success!
            }, function(err) {
                // An error occured. Show a message to the user
            });
        };

        $scope.lose = function() {
            $scope.$apply(function(){
                $scope.ongoingContract = false;
                $scope.contractOver = true;
                $scope.contractSuccess = false;
                $scope.contractForfeited = false;
                $scope.blacklistedApps = [];
                clearInterval($scope.refreshContractTimerIntervalId);
                clearInterval($scope.refreshToastMessage);
                // local notification
                navigator.notification.alert('You have broken your contract!');
                // gcm notification
                contractService.contractbroken(togcm).then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occured. Show a message to the user
                });
            });

        };


        $scope.checkForegroundApp = function(){
            ForegroundActivity.createEvent('','','', function(foreground_app){
                $scope.foregroundApp = foreground_app;
                for (var i = 0; i < $scope.blacklistedApps.length; i++){
                    if ($scope.foregroundApp == $scope.blacklistedApps[i]){
                        clearInterval($scope.refreshContractTimerIntervalId);
                        $scope.$apply(function(){
                            $scope.blacklistedAppUsed = $scope.blacklistedApps[i];
                        });
                        $scope.lose();
                    }
                }
            }, function(foreground_app){
                console.log("Error" + foreground_app + "from GetForegound plugin")
            });
        };


        $scope.validateHours = function(durationHrs, durationMins, durationSecs){

            if ((durationHrs == 0) && (durationMins == 0) && (durationSecs == 0)){
                // set new toast here requesting it is required
                //for testing
                console.log("Hour input denied");
                return false;
            }

            else return true;
        };


        $scope.routeToContract = function(){
            $scope.showButton = true;
            $scope.submitted = false;


            $scope.validHours = true;
            $scope.validAppSelection = true;
            $scope.validWagerAmount = true;

            $scope.contractHours = 0;
            $scope.contractMinutes = 0;
            $scope.contractSeconds = 0;


            //Scope variables for monitoring
            $scope.blacklistedApps = [];
            $scope.foregroundApp = "";
            $scope.blacklistedAppUsed = "";
            $scope.ongoingContract = false;
            $scope.contractOver = false;

            contractService.applist();
        };

        // add event listener for back button if ongoing contract is true pops up toast saying they can't use the app
        //since it will distract them

    });


