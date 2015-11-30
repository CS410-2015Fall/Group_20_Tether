/**
 * Created by Tunjay Jafarli on 2015-10-30.
 */

'use strict';

angular.module('tetherApp')
    .controller('contractCtrl', function ($window,$scope, $location, $http,$routeParams,contractService,userService){
        var togcm = '';
        $scope.submitted = false;
        $scope.contractOver = false;
        $scope.ongoingContract = false;
        $scope.waitingForResponse = false;

        $scope.validHours = true;
        $scope.validAppSelection = true;
        $scope.validWagerAmount = true;
        $scope.enoughPoints = true;

        $scope.contractHours = 0;
        $scope.contractMinutes = 0;
        $scope.contractSeconds = 0;

        $scope.wagerAmount = 0;

        $scope.from = "";

        userService.profile().then(function(data){
            var text = JSON.stringify(data);
            var jdata = JSON.parse(text);
            $scope.from = jdata.username;
            $scope.userPoints = jdata.points;
            $scope.userWins = jdata.wins;
            $scope.userLosses = jdata.loses;
        });

        //Scope variables for monitoring
        $scope.blacklistedApps = [];
        $scope.foregroundApp = "";
        $scope.blacklistedAppUsed = "";

        $scope.friend = $window.localStorage.proposingTo;

        userService.users().then(function (data){
            var s = data;
            var jsons=[];
            for (var i=s.length;i--;){
                jsons[i]=JSON.stringify(s[i]);
                var jdata = JSON.parse(jsons[i]);
                if(jdata.username.toUpperCase() == $scope.friend.toUpperCase()){
                    togcm = jdata.gcm_token;
                }
            }
            console.log(JSON.stringify($scope.allusers));
            console.log(JSON.stringify(togcm));
        });




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


        var contractJSON = '{"contract":{"apps":[],"durationInMins":0,"hours":"","mins":"","seconds":"","wagerAmount":0,"friend":"","gcmTokenFromProposer":"","from":"","status":"","timeStart":""}}';





        $scope.submitContract = function(){

            var checkedBoxes = $(':checkbox:checked');

            $scope.blacklistedApps = [];
            $scope.validHours = true;
            $scope.validAppSelection = true;
            $scope.validWagerAmount = true;
            $scope.enoughPoints = true;

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

            if (Math.abs($scope.userPoints) < $scope.wagerAmount){
                console.log("Wager amount is too high");
                $scope.enoughPoints = false;
            }

            if ($scope.validHours == false || $scope.validAppSelection == false || $scope.validWagerAmount == false || $scope.enoughPoints == false){
                return;
            } else {
                // convert to minutes and attach to contract JSON object
                var durationInMins = (durationHrs * 60) + durationMins + (durationSecs / 60);
                obj["contract"].durationInMins = durationInMins;
                $scope.validHours = true;

                // attach wagering amount to contract JSON object
                obj["contract"].wagerAmount = $scope.wagerAmount;
                $scope.validWagerAmount = true;
                $scope.enoughPoints = true
            }

            obj["contract"].friend = $scope.friend;
            obj["contract"].gcmTokenFromProposer = $window.localStorage.gcmtoken;
            obj["contract"].status = "proposed";
            obj["contract"].hours = durationHrs;
            obj["contract"].mins = durationMins;
            obj["contract"].seconds = durationSecs;
            obj["contract"].from = $scope.from;

            contractJSON = JSON.stringify(obj);
            console.log(JSON.stringify(contractJSON));



            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs, contractJSON);

            //gcm send todo
            contractService.sendcontract(togcm,contractJSON).then(function(result) {
                // Success!
            }, function(err) {
                // An error occured. Show a message to the user
            });

            $scope.waitingForResponse = true;
            $scope.submitted = true;

            $scope.waitForResponse();



        };

        $scope.waitForResponse = function(){

            $scope.checkForResponseInterval = setInterval($scope.checkForResponse, 1000)

        };

        $scope.checkForResponse = function(){
            var storeAs = "contract" + $scope.from;
            var myContractLocalStorage = $window.localStorage.getItem(storeAs);

            if ($window.localStorage.getItem(storeAs) === null){

            } else {
                var myContract = JSON.parse(myContractLocalStorage)

                if (myContract["contract"].status === "accepted"){

                    clearInterval($scope.checkForResponseInterval);
                    $scope.waitingForResponse = false;
                    $scope.ongoingContract = true;
                    $scope.contractOver = false;
                    $scope.$apply();

                    $scope.startTimer();


                    $scope.startToasts();
                } else {
                    if (myContract["contract"].status === "rejected"){
                        clearInterval($scope.checkForResponseInterval);
                        $scope.$apply();
                        $scope.routeToContract();
                    }
                }
            }


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


                $scope.userPoints =  $scope.userPoints + $scope.wagerAmount;
                $scope.userWins = $scope.userWins + 1;

                var data = {
                    'points':$scope.userPoints,
                    'wins': $scope.userWins
                };

                userService.updateProfile(data).then(function(result){
                    //success
                }, function(data){
                    //error
                });





                // local notification
                navigator.notification.alert('You have successfully completed contract!');

                if ($window.localStorage.getItem("myCurrentContract") === null){
                    var storeAs = "contract" + $scope.from;
                    var myContractLocalStorage = $window.localStorage.getItem(storeAs);
                    var myContract = JSON.parse(myContractLocalStorage)
                    myContract["contract"].status="success";
                    myContract["contract"].points=$scope.wagerAmount;

                    // gcm notification todo
                    contractService.contractsucceed(togcm,myContract).then(function(result) {
                        // Success!
                    }, function(err) {
                        // An error occured. Show a message to the user
                    });

                    $window.localStorage.removeItem(storeAs);
                    $window.localStorage.removeItem("myCurrentContract");
                } else {
                    var storeAs1 = "myCurrentContract";
                    var myContractLocalStorage1 = $window.localStorage.getItem(storeAs1);
                    var myContract1 = JSON.parse(myContractLocalStorage1)
                    var gcmFromProposer = myContract1["contract"].gcmTokenFromProposer;

                    // gcm notification todo
                    contractService.contractsucceed(gcmFromProposer,myContract1).then(function(result) {
                        // Success!
                    }, function(err) {
                        // An error occured. Show a message to the user
                    });

                    $window.localStorage.removeItem("myCurrentContract");
                }

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

            $scope.userPoints =  $scope.userPoints - $scope.wagerAmount;
            $scope.userLosses = $scope.userLosses + 1;

            var data = {
                'points':$scope.userPoints,
                'loses': $scope.userLosses
            };

            userService.updateProfile(data).then(function(result){
                //success
            }, function(data){
                //error
            });


            // local notification
            navigator.notification.alert('You have broken your contract!');
            // gcm notification todo


            if ($window.localStorage.getItem("myCurrentContract") === null){
                var storeAs = "contract" + $scope.from;
                var myContractLocalStorage = $window.localStorage.getItem(storeAs);
                var myContract = JSON.parse(myContractLocalStorage);
                myContract["contract"].status="forfeit";
                myContract["contract"].points=$scope.wagerAmount;

                contractService.contractbroken(togcm,myContract).then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occured. Show a message to the user
                });

                $window.localStorage.removeItem(storeAs);
                $window.localStorage.removeItem("myCurrentContract");

            } else {
                var storeAs1 = "myCurrentContract";
                var myContractLocalStorage1 = $window.localStorage.getItem(storeAs1);
                var myContract1 = JSON.parse(myContractLocalStorage1)
                var gcmFromProposer = myContract1["contract"].gcmTokenFromProposer;


                contractService.contractbroken(gcmFromProposer,myContract1).then(function(result) {
                    // Success!
                }, function(err) {
                    // An error occured. Show a message to the user
                });

                $window.localStorage.removeItem("myCurrentContract");
            }



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


                $scope.userPoints =  $scope.userPoints - $scope.wagerAmount;
                $scope.userLosses = $scope.userLosses + 1;

                var data = {
                    'points':$scope.userPoints,
                    'loses': $scope.userLosses
                };

                userService.updateProfile(data).then(function(result){
                    //success
                }, function(data){
                    //error
                });



                // local notification
                navigator.notification.alert('You have broken your contract!');

                if ($window.localStorage.getItem("myCurrentContract") === null){
                    var storeAs = "contract" + $scope.from;
                    var myContractLocalStorage = $window.localStorage.getItem(storeAs);
                    var myContract = JSON.parse(myContractLocalStorage)
                    myContract["contract"].status="failure";
                    myContract["contract"].points=$scope.wagerAmount;



                    // gcm notification todo
                    contractService.contractbroken(togcm,myContract).then(function(result) {
                        // Success!
                    }, function(err) {
                        // An error occured. Show a message to the user
                    });
                    $window.localStorage.removeItem(storeAs);
                    $window.localStorage.removeItem("myCurrentContract");
                } else {
                    var storeAs1 = "myCurrentContract";
                    var myContractLocalStorage1 = $window.localStorage.getItem(storeAs1);
                    var myContract1 = JSON.parse(myContractLocalStorage1)
                    var gcmFromProposer = myContract1["contract"].gcmTokenFromProposer;




                    // gcm notification todo
                    contractService.contractbroken(gcmFromProposer,myContract1).then(function(result) {
                        // Success!
                    }, function(err) {
                        // An error occured. Show a message to the user
                    });

                    $window.localStorage.removeItem("myCurrentContract");
                }


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


                console.log("Hour input denied");
                return false;
            }

            else return true;
        };


        $scope.routeToContract = function(){
            $scope.showButton = true;
            $scope.submitted = false;
            $scope.waitingForResponse = false;


            $scope.validHours = true;
            $scope.validAppSelection = true;
            $scope.validWagerAmount = true;
            $scope.enoughPoints = true;

            $scope.contractHours = 0;
            $scope.contractMinutes = 0;
            $scope.contractSeconds = 0;


            //Scope variables for monitoring
            $scope.blacklistedApps = [];
            $scope.foregroundApp = "";
            $scope.blacklistedAppUsed = "";
            $scope.ongoingContract = false;
            $scope.contractOver = false;

            var obj = JSON.parse(contractJSON);

            obj["contract"].wagerAmount = 0;
            obj["contract"].hours = 0;
            obj["contract"].mins = 0;
            obj["contract"].seconds = 0;
            obj["contract"].apps = [];

            contractJSON = JSON.stringify(obj);

            //contractJSON = '{"contract":{"apps":[],"durationInMins":0,"hours":"","mins":"","wagerAmount":0,"friend":"","gcmTokenFromProposer":"","from":"","status":"","timeStart":""}}';

            contractService.applist();
            $scope.$apply();
        };


        $scope.cancelContract = function(){
            //sent gcm to friend saying you have cancelled and remove from local storage TODO

            var storeAs = "contract" + $scope.from;
            var myContractLocalStorage = $window.localStorage.getItem(storeAs);
            var myContract = JSON.parse(myContractLocalStorage);
            myContract["contract"].status="cancelled";

            contractService.cancelcontract(togcm,myContract).then(function(result) {
                // Success!
            }, function(err) {
                // An error occured. Show a message to the user
            });


            $window.localStorage.removeItem(storeAs);
            $scope.routeToContract();
        };



        // add event listener for back button if ongoing contract is true pops up toast saying they can't use the app
        //since it will distract them


        if ($window.localStorage.getItem("myCurrentContract") === null){
            console.log("There is no contract this user is responsing to - create a proposal as normal")
        } else {
            var currentContract = JSON.parse($window.localStorage.getItem("myCurrentContract"));
            if (currentContract["contract"].status === "accepted"){
                $scope.waitingForResponse = false;
                $scope.submitted = true;

                $scope.ongoingContract = true;
                $scope.contractOver = false;

                var tempApps = currentContract["contract"].apps;

                for (var i = 0; i < tempApps.length; i++){
                    $scope.blacklistedApps.push(tempApps[i].name);
                }

                //$scope.blacklistedApps = currentContract["contract"].apps;
                $scope.contractHours = currentContract["contract"].hours;
                $scope.contractMinutes = currentContract["contract"].mins;
                $scope.contractSeconds = currentContract["contract"].seconds;

                $scope.wagerAmount = currentContract["contract"].wagerAmount;

                $scope.$apply();


                $scope.startTimer();


                $scope.startToasts();
            }
        }

    });

