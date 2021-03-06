/**
 * Created by lanepither on 15-11-12.
 */

'use strict';

angular.module('tetherApp')
    .controller('homeCtrl',function($scope, $window, $location, $http,
                                    $routeParams, userService){
        /*// Update server with new GCM registration
        var token = $window.localStorage.gcmtoken;
        var data = {
            'gcm_token':token
        }
        userService.updateProfile(data).then(function(result) {
            // Success!
        }, function(err) {
            // An error occured. Show a message to the user
        });*/


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

                $window.localStorage.proposingTo = proposeTo;

                $location.path('/contract');
                $scope.$apply();
            }

        };


        $scope.propose = function(proposeTo){
            console.log("proposing to: " + proposeTo);

            $window.localStorage.proposingTo = proposeTo;

            $location.path('/contract');
            $scope.$apply();
        };



        $scope.getUser = function(){

            userService.profile().then(function (data){
                //$scope.serverReturned = data; todo
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
                $scope.$apply();
            } else {
                $scope.randomFriends = [];
                $scope.randomFriends.push($scope.serverReturned.friends[0]);
                $scope.randomFriends.push($scope.serverReturned.friends[1]);
                $scope.randomFriends.push($scope.serverReturned.friends[2]);
                $scope.$apply();
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

        };

        $scope.sortUsersByPoints = function(allUsers){

            $scope.allusers = allUsers.sort(function(a, b){
                return a.val - b.val;
            });

            $scope.$apply();
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

                //$scope.allusers = results;
                //$scope.$apply();

                $scope.allusers = results.sort(function(a, b){
                    return b.val - a.val;
                });

                $scope.$apply();
            });


        };



        $scope.updateFriends();
        $scope.getUser();
        $scope.createRandomFriends();
        $scope.refreshLeaderBoard();

    });