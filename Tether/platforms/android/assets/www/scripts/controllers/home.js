/**
 * Created by lanepither on 15-11-12.
 */

'use strict';

angular.module('tetherApp')
    .controller('homeCtrl',function($scope, $window, $location, $http,
                                                                $routeParams, userService){

        //Friends stuff

        $scope.noFriends = false;
        $scope.randomFriends = [];
        $scope.serverReturned = {username: "", email: "", first_name: "",
            last_name: "", friends:[], points:""};



        $scope.quickMatch = function(){
            if($scope.noFriends){
                console.log("No Friends to match with");
            } else {
                var proposeTo = $scope.getRandomFriend();
                console.log("proposing to: " + proposeTo);

                //get random friend and take to contract page with last contract filled out?
                // contract should also have a "use last contract button"
                $location.path('/contract');
                $scope.$apply();
            }

        };


        $scope.newContract = function(proposeTo){
            console.log("proposing to: " + proposeTo);


            /// stuff here
            $location.path('/contract');
            $scope.$apply();
        };



        $scope.getUser = function(){

            userService.profile().then(function (data){
                //$scope.serverReturned = data;
                $scope.user = data.username;
            });
        };




        $scope.checkNoFriends = function(){
            if($scope.serverReturned.friends.length == 0){

                $scope.noFriends = true;
            } else {
                $scope.noFriends = false;
            }
        };




        $scope.updateFriends = function(){

            userService.profile().then(function (data){
                //$scope.serverReturned = data;
                $scope.serverReturned = {username: "Lane", email: "lpither@hotmail.com", first_name: "",
                   last_name: "", friends:["Arthur", "Steven", "Paul", "arga", "AWefawef","wafwefaw"]};
                //last_name: "", friends:[]};
                $scope.checkNoFriends();
            });
        };

        $scope.createRandomFriends = function(){
            var randomFriendsIndex = $scope.serverReturned.friends.length, temporaryValue, randomIndex ;

            // While there remain elements to shuffle...
            while (0 !== randomFriendsIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * randomFriendsIndex);
                randomFriendsIndex -= 1;

                // And swap it with the current element.
                temporaryValue = $scope.serverReturned.friends[randomFriendsIndex];
                $scope.serverReturned.friends[randomFriendsIndex] = $scope.serverReturned.friends[randomIndex];
                $scope.serverReturned.friends[randomIndex] = temporaryValue;
            }

            if ($scope.serverReturned.friends.length <= 3){
                $scope.randomFriends = $scope.serverReturned.friends;
            } else {
                $scope.randomFriends = [];
                $scope.randomFriends.push($scope.serverReturned.friends[0]);
                $scope.randomFriends.push($scope.serverReturned.friends[1]);
                $scope.randomFriends.push($scope.serverReturned.friends[2]);
            }

        };

        $scope.getRandomFriend = function(){
            var randomFriendsIndex = $scope.serverReturned.friends.length, temporaryValue, randomIndex ;

            // While there remain elements to shuffle...
            while (0 !== randomFriendsIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * randomFriendsIndex);
                randomFriendsIndex -= 1;

                // And swap it with the current element.
                temporaryValue = $scope.serverReturned.friends[randomFriendsIndex];
                $scope.serverReturned.friends[randomFriendsIndex] = $scope.serverReturned.friends[randomIndex];
                $scope.serverReturned.friends[randomIndex] = temporaryValue;
            }



            return $scope.serverReturned.friends[0];
        };




        $scope.propose = function(proposeTo){
            console.log("Proposing to" + proposeTo);
            //pass to service - set username
            // take to contract page set up proposal
            // need to add contract view where they are waiting/set timer that on confirmation it does so
        };

        $scope.updateFriends();
        $scope.createRandomFriends();

    });