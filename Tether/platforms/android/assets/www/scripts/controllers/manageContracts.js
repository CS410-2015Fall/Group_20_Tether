/**
 * Created by lanepither on 15-11-23.
 */

'use strict';

angular.module('tetherApp')
    .controller('manageContractCtrl',function($scope, $window, $location, $http,
<<<<<<< HEAD
                                    $routeParams, userService, pushService){
=======
                                              $routeParams, userService, pushService){
>>>>>>> newjaygcm


        $scope.noContractsInStorage = false;
        $scope.showPending = true;
        $scope.showOngoing = false;
        $scope.showFinished = false;

        //$scope.math = $window.math;

        $scope.numProposedContracts = 0;
        $scope.numOngoingContracts = 0;
        $scope.numFinishedContracts = 0;
        $scope.pendingContracts = [];
        $scope.ongoingContracts = [];
        $scope.finishedContracts = [];
        $scope.showDetails = "";



        $scope.isShowing = function(index){
            return  $scope.showDetails === index;
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
            $scope.showDetails = index;
            var goThroughThis = contractJSON.contract.apps;
            $scope.selectedContractApps = [];
            for (var i = 0; i < goThroughThis.length; i ++){
                $scope.selectedContractApps.push(goThroughThis[i].name)
            }

            $scope.timerInterval = setInterval($scope.getContractTimeRemaining(contractJSON), 1000);


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
                        results.push({key:i,val:value});

                    }
                }

                console.log(localStorage.getItem(i).toString());
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

            $scope.$apply();
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

            $scope.$apply();
        };

        $scope.getNumFinishedContracts = function(){
            $scope.finishedContracts = [];
            for(var i = 0; i < $scope.contracts.length; i++){
                if ($scope.contracts[i].val["contract"]["status"] == "failure" ||
                    $scope.contracts[i].val["contract"]["status"] == "forfeit" ||
                    $scope.contracts[i].val["contract"]["status"] == "success"){
                    $scope.numFinishedContracts = $scope.numFinishedContracts + 1;
                    $scope.finishedContracts.push($scope.contracts[i]);
                }
            }

            $scope.$apply();
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

            $scope.$apply();

        };


        $scope.rejectContract = function(user,theirGcmToken,contractJSON) {

            contractJSON["contract"].status="rejected";
            //send notification to other user - TODO
            ///
            ///
            //
            ///
            ///



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

            //send notification to other user - TODO
<<<<<<< HEAD
            ///
=======

>>>>>>> newjaygcm
            ///
            //
            ///
            ///

            $scope.update();
        };

        $scope.acceptAndStartOwn = function(user, theirGcmToken, contractJSON) {
            //send notification to other user - TODO
            ///
            ///
            //
            ///
            ///

            var setOverride = "contract" + user.toString();
            var setMyKey = "myCurrentContract";
            contractJSON["contract"].status = "accepted";
            contractJSON["contract"].timeStart = new Date().getTime();


            $window.localStorage.setItem(setOverride, JSON.stringify(contractJSON));

            $window.localStorage.removeItem(setMyKey);
            $window.localStorage.setItem(setMyKey, JSON.stringify(contractJSON));

            $scope.update();

            $location.path('/contract');
            $scope.$apply();
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




<<<<<<< HEAD
    });
=======
    });
>>>>>>> newjaygcm
