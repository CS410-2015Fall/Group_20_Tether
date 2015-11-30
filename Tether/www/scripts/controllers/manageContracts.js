/**
 * Created by lanepither on 15-11-23.
 */

'use strict';

angular.module('tetherApp')
    .controller('manageContractCtrl',function($scope, $window, $location, $http,
                                    $routeParams, userService, contractService){

        $scope.noContractsInStorage = false;
        $scope.showPending = true;
        $scope.showOngoing = false;
        $scope.showFinished = false;

        $scope.numProposedContracts = 0;
        $scope.numOngoingContracts = 0;
        $scope.numFinishedContracts = 0;
        $scope.pendingContracts = [];
        $scope.ongoingContracts = [];
        $scope.finishedContracts = [];
        $scope.showDetails = "";
        $scope.showDetailsComplete = "";

        userService.profile().then(function(data){
            var text = JSON.stringify(data);
            var jdata = JSON.parse(text);
            $window.localStorage.pointsTracker = jdata.points
        });


        $scope.isShowing = function(index){
            return  $scope.showDetails === index;
        };


        $scope.isShowingComplete = function(index){
            return  $scope.showDetailsComplete === index;
        };


        $scope.viewDetails = function(index, contractJSON){
            $scope.showDetails = index;
            var goThroughThis = contractJSON.contract.apps;
            $scope.selectedContractApps = [];
            for (var i = 0; i < goThroughThis.length; i ++){
                $scope.selectedContractApps.push(goThroughThis[i].name)
            }
        };


        $scope.viewDetailsOngoing = function(index, contractJSON){
            $scope.viewDetails(index, contractJSON);
            $scope.timerInterval = setInterval($scope.getContractTimeRemaining(contractJSON), 1000);
        };


        $scope.viewDetailsFinished = function(index, contractJSON){
            $scope.viewDetails(index, contractJSON);
            $scope.calculatePointsEarned(contractJSON);
            if (contractJSON["contract"].claimed === "yes"){
                $scope.isClaimed = true;
                //$scope.$apply();
            } else {
                $scope.isClaimed = false;
                //$scope.$apply();
            }
        };


        $scope.calculatePointsEarned = function(contractJSON){
            var status = contractJSON.contract.status;
            var points = contractJSON.contract.points;

            var storeAs;

            switch (status) {
                case 'success':
                    $scope.pointsEarned = 0;
                    contractJSON["contract"].claimed = "yes";
                    $window.localStorage.setItem(storeAs, contractJSON);
                    break;

                case 'forfeit':
                    $scope.pointsEarned = points;
                    break;

                case 'failure':
                    $scope.pointsEarned = points;
                    break;

                default:
                    console.log("Calculate Points Earned - Default case");
                    break;
            }
        };

        $scope.getPoints = function(user, contractStatus, contractPoints, contractJSON, unique) {
            console.log("claiming points");
            var storeAs = "contract" + user + unique.toString();
            switch (contractStatus) {

                case 'success':
                    //do nothing
                    contractJSON["contract"].claimed = "yes";
                    $window.localStorage.setItem(storeAs, JSON.stringify(contractJSON));
                    //$scope.hideDetailsComplete();
                    //$scope.$apply();
                    break;

                case 'forfeit':
                    $window.localStorage.pointsTracker = parseInt($window.localStorage.pointsTracker) + contractPoints;
                    //$scope.$apply();
                    var data = {
                        'points': parseInt($window.localStorage.pointsTracker)
                    }
                    userService.updateProfile(data).then(function (result) {
                        // Success!
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                    contractJSON["contract"].claimed = "yes";
                    $window.localStorage.setItem(storeAs, JSON.stringify(contractJSON));
                    //$scope.hideDetailsComplete();
                    $scope.isClaimed = true;
                    //$scope.$apply();
                    break;

                case 'failure':
                    $window.localStorage.pointsTracker = parseInt($window.localStorage.pointsTracker) + contractPoints;
                    //$scope.$apply();
                    var data = {
                        'points': parseInt($window.localStorage.pointsTracker)
                    }
                    userService.updateProfile(data).then(function (result) {
                        // Success!
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                    contractJSON["contract"].claimed = "yes";
                    $window.localStorage.setItem(storeAs, JSON.stringify(contractJSON));
                    //$scope.hideDetailsComplete();
                    $scope.isClaimed = true;
                    //$scope.$apply();
                    break;

                default:
                    console.log("error");
                    break;
            }
            //$scope.$apply();
        };

        $scope.deleteContract = function(contractFrom, uniqueId){
            var storedAs = "contract" + contractFrom + uniqueId.toString();
            $window.localStorage.removeItem(storedAs);
            //$scope.$apply();
        };


        $scope.getContractTimeRemaining = function(contractJSON){
            var currentTime = new Date().getTime();
            var startTime = contractJSON.contract.timeStart;
            var targetTime = startTime + (contractJSON.contract.durationInMins * 60 * 1000);

            if (targetTime > currentTime){
                var seconds_left = (targetTime - currentTime) / 1000;
                var hoursLeft = parseInt(seconds_left / 3600);
                seconds_left = seconds_left % 3600;
                var minsLeft = parseInt(seconds_left / 60);
                var sec = parseInt(seconds_left % 60);

                $scope.selectedContractHours = hoursLeft;
                $scope.selectedContractMins = minsLeft;
                $scope.selectedContractSeconds = sec;
                //$scope.$apply();
            } else {
                $scope.selectedContractHours = 0;
                $scope.selectedContractMins = 0;
                $scope.selectedContractSeconds = 0;
            }
        };


        $scope.hideDetails = function(){
            $scope.showDetails = "";
            clearInterval($scope.timerInterval);
        };


        $scope.getContractsFromLocalStorage = function(){
            var i, results=[], query = /^contract/;
            for (i in $window.localStorage){
                if ($window.localStorage.hasOwnProperty(i)) {
                    if (i.match(query) || (!query && typeof i === 'string')) {
                        var value = JSON.parse(localStorage.getItem(i));

                        if (value["contract"].status === "cancelled"){
                            $window.localStorage.removeItem(i);
                        } else { if (value["contract"].status === "forfeit" ||
                            value["contract"].status === "success" ||
                            value["contract"].status === "failure") {

                            if (value["contract"].uniqueId != null){
                                results.push({key:id,val:value});
                            } else {
                                var uniqueIdentifier = Math.random();
                                value["contract"].uniqueId = uniqueIdentifier.toString(36).substring(2);

                                var id = "contract" + value["contract"].from + uniqueIdentifier.toString(36).substring(2);
                                var deleteKey = "contract" + value["contract"]["from"];
                                var storeKey = "contract" + value["contract"]["from"] + uniqueIdentifier.toString(36).substring(2);;
                                $window.localStorage.setItem(storeKey,JSON.stringify(value));
                                $window.localStorage.removeItem(deleteKey);
                                results.push({key:id,val:value});
                            }

                        } else {
                            results.push({key:i,val:value});
                        }
                        }
                    }
                }
            }
            if (results.length == 0){
                $scope.noContractsInStorage = true;
            }
            return results;
        };



        $scope.contracts = $scope.getContractsFromLocalStorage();


        $scope.getNumProposedContracts = function(){
            $scope.pendingContracts = [];
            for(var i = 0; i < $scope.contracts.length; i++){
                if ($scope.contracts[i].val["contract"]["status"] == "proposed" ){
                    $scope.numProposedContracts = $scope.numProposedContracts + 1;
                    $scope.pendingContracts.push($scope.contracts[i]);
                }
            }
            //$scope.$apply();
        };


        $scope.getNumOngoingContracts = function(){
            $scope.ongoingContracts = [];
            for(var i = 0; i < $scope.contracts.length; i++){
                if ($scope.contracts[i].val["contract"]["status"] === "accepted" ||
                    $scope.contracts[i].val["contract"]["status"] === "rejected"){
                    $scope.numOngoingContracts = $scope.numOngoingContracts + 1;
                    $scope.ongoingContracts.push($scope.contracts[i]);
                }
            }
            //$scope.$apply();
        };


        $scope.getNumFinishedContracts = function(){
            $scope.finishedContracts = [];
            for(var i = 0; i < $scope.contracts.length; i++){
                if ($scope.contracts[i].val["contract"]["uniqueId"] != null){
                    $scope.numFinishedContracts = $scope.numFinishedContracts + 1;
                    $scope.finishedContracts.push($scope.contracts[i]);
                }
            }
            //$scope.$apply();
        };


        $scope.displayPending = function(){
            $scope.showPending = true;
            $scope.showOngoing = false;
            $scope.showFinished = false;
        };


        $scope.displayOngoing = function(){
            $scope.showPending = false;
            $scope.showOngoing = true;
            $scope.showFinished = false;
        };


        $scope.displayFinished = function(){
            $scope.showPending = false;
            $scope.showOngoing = false;
            $scope.showFinished = true;
        };


        $scope.getNumProposedContracts();
        $scope.getNumOngoingContracts();
        $scope.getNumFinishedContracts();


        $scope.update = function(){
            $scope.contracts = [];
            $scope.contracts = $scope.getContractsFromLocalStorage();
            $scope.numProposedContracts = 0;
            $scope.numOngoingContracts = 0;
            $scope.numFinishedContracts = 0;

            $scope.getNumProposedContracts();
            $scope.getNumOngoingContracts();
            $scope.getNumFinishedContracts();

            //$scope.$apply();
        };


        $scope.rejectContract = function(user,theirGcmToken,contractJSON) {
            contractJSON["contract"].status="rejected";

            contractService.declinecontract(theirGcmToken, contractJSON).then(function(result){
            }, function(err){

            });

            $scope.update();

            var deleteKey = "contract" + user.toString();
            $window.localStorage.removeItem(deleteKey);

            $scope.update();
        };


        $scope.acceptAndWatch = function(user, theirGcmToken, contractJSON) {
            var setKey = "contract" + user.toString();
            contractJSON["contract"].status = "accepted";
            contractJSON["contract"].timeStart = new Date().getTime();
            $window.localStorage.removeItem(setKey);
            $window.localStorage.setItem(setKey, JSON.stringify(contractJSON));

            contractService.acceptcontract(theirGcmToken, contractJSON).then(function(result){

            }, function(err){

            });

            $scope.update();
        };


        $scope.acceptAndStartOwn = function(user, theirGcmToken, contractJSON) {
            var setOverride = "contract" + user.toString();
            var setMyKey = "myCurrentContract";
            contractJSON["contract"].status = "accepted";
            contractJSON["contract"].timeStart = new Date().getTime();

            $window.localStorage.setItem(setOverride, JSON.stringify(contractJSON));
            $window.localStorage.removeItem(setMyKey);
            $window.localStorage.setItem(setMyKey, JSON.stringify(contractJSON));

            contractService.acceptcontractandstartown(theirGcmToken, contractJSON).then(function(result){

            }, function(err){

            });

            $scope.update();

            $location.path('/contract');
            //$scope.$apply();
        };


        $scope.clearAll = function(){
            var i, results=[], query = /^contract/;
            for (i in $window.localStorage){
                if ($window.localStorage.hasOwnProperty(i)) {
                    if (i.match(query) || (!query && typeof i === 'string')) {
                        $window.localStorage.removeItem(i);
                    }
                }
            }
            $window.localStorage.removeItem("myCurrentContract")
        }

    });
