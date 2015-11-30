/**
 * Created by lanepither on 15-11-12.
 */

'use strict';

angular.module('tetherApp')
    .controller('homeCtrl',function($scope, $window, $location, $http,
                                    $routeParams, userService){

        $scope.noFriends = false;
        $scope.randomFriends = [];
        $scope.serverReturned = {username: "", email: "", first_name: "",
            last_name: "", friends:[], points:""};


        $scope.checkNoFriends = function(){
            if($scope.serverReturned.friends.length == 0){
                $scope.noFriends = true;
            } else {
                $scope.noFriends = false;
            }
        };


        $scope.quickMatch = function(){
            if($scope.noFriends){
                console.log("Quick Match - No Friends to match with");
            } else {
                var proposeTo = $scope.getRandomFriend();
                console.log("Quick Match - Proposing to: " + proposeTo);
                $window.localStorage.proposingTo = proposeTo;

                //$location.path('/contract');
                //$scope.$apply();
            }
        };


        $scope.propose = function(proposeTo){
            console.log("Proposing to a selected friend: " + proposeTo);
            $window.localStorage.proposingTo = proposeTo;

            //$location.path('/contract');
            //$scope.$apply();
        };


        $scope.getUser = function(){

            userService.profile().then(function (data){
                //$scope.serverReturned = data; todo
                $scope.user = data.username;
            });
        };


        $scope.updateFriends = function(){

            userService.profile().then(function (data){
                var text = JSON.stringify(data);
                var jdata = JSON.parse(text);
                var jarray = jdata["friends"].replace(/'/g, '"');
                var array = JSON.parse(jarray);
                console.log(array);
                $scope.serverReturned.friends = array;
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
                //$scope.$apply();
            } else {
                $scope.randomFriends = [];
                $scope.randomFriends.push($scope.serverReturned.friends[0]);
                $scope.randomFriends.push($scope.serverReturned.friends[1]);
                $scope.randomFriends.push($scope.serverReturned.friends[2]);
                //$scope.$apply();
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


        $scope.sortUsersByPoints = function(results){
            $scope.allusers = results.sort(function(a, b){
                return b.val - a.val;
            });
            //$scope.$apply();
        };

        $scope.refreshLeaderBoard = function(){

            userService.users().then(function (data){
                var s = data;
                var jsons=[];
                var results =[];
                for (var i=s.length;i--;){
                    jsons[i]=JSON.stringify(s[i]);
                    var jdata = JSON.parse(jsons[i]);
                    var id = jdata.username;
                    var value = jdata.points;
                    results.push({key:id,val:value});
                }
                $scope.sortUsersByPoints(results);
            });
        };

        $scope.updateFriends();
        $scope.getUser();
        $scope.createRandomFriends();
        $scope.refreshLeaderBoard();
    });