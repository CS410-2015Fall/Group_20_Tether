/**
 * Created by lanepither on 15-11-12.
 */


angular.module('tetherApp')
    .controller('friendsCtrl', function($scope, $window, $rootScope, $location, $http, userService,
                                        SharedState){

        userService.users().then(function (data){
            var s = data;
            var jsons=[];
            for (var i=s.length;i--;){
                jsons[i]=JSON.stringify(s[i]);
                var jdata = JSON.parse(jsons[i]);
                $scope.allusers.push(jdata.username.toUpperCase());
            }
            console.log(JSON.stringify($scope.allusers));
        });

        $scope.allusers =[];
        $scope.noFriends = false;
        $scope.showConfirmDeleteIndex;
        $scope.friendAddedNotValid = false;
        $scope.friendAlreadyExists = false;
        $scope.serverReturned = {friends:[]};


        $scope.checkNoFriends = function(){
            if($scope.serverReturned.friends.length == 0){
                $scope.noFriends = true;
            } else $scope.noFriends = false;
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



        $scope.addFriend = function(){
            $scope.friendAlreadyExists = false;
            console.log("Add Friend Button Pressed: Adding " + document.getElementById("id_userToAdd").value);
            var valueToCheck = document.getElementById("id_userToAdd").value.toString().toUpperCase();

            for (var i = 0; i < $scope.serverReturned.friends.length; i++){

                var listItemToCheck = $scope.serverReturned.friends[i].toString().toUpperCase();

                if (listItemToCheck === valueToCheck){
                    var alreadyExists = true;
                    break;

                }
                else {
                    var alreadyExists = false;
                }

            }
            if (valueToCheck === "" || $scope.allusers.indexOf(valueToCheck) == -1){
                $scope.friendAddedNotValid = true;
            } else {
                if (alreadyExists){
                    $scope.friendAlreadyExists = true;
                } else {
                    //$scope.mockUpdateFriends(document.getElementById("id_userToAdd").value);
                    $scope.serverReturned.friends.push(document.getElementById("id_userToAdd").value);
                    var updated = {
                        'friends':$scope.serverReturned.friends
                    };
                    userService.updateProfile(updated).then(function(data){
                        // success case
                    },function(data){
                        // error case
                    });
                    $scope.checkNoFriends();
                    document.getElementById("id_addFriendForm").reset();
                    $scope.friendAddedNotValid = false;
                    $scope.friendAlreadyExists = false;
                }
            }

        };
        $scope.mockUpdateFriends = function(friendToAdd){
            $scope.serverReturned.friends.push(friendToAdd);
            var updated = {
                'friends':$scope.serverReturned.friends
            };
            userService.updateProfile(updated).then(function(data){
                // success case
            },function(data){
                // error case
            });
        };


        $scope.deleteFriend = function(friendToDelete){
            console.log("DeletingFriend" + friendToDelete);
            $scope.showConfirmDeleteIndex = "";
            var deleteIndex = $scope.serverReturned.friends.indexOf(friendToDelete);
            if (deleteIndex > -1) {
                $scope.serverReturned.friends.splice(deleteIndex, 1);
                console.log($scope.serverReturned.friends);
            }
            var updated = {
                'friends':$scope.serverReturned.friends
            };
            userService.updateProfile(updated).then(function(data){
                    // success case
                },function(data){
                    // error case
                });
            $scope.checkNoFriends();
        };



        $scope.cancelDelete = function(){
            $scope.showConfirmDeleteIndex = "";
        };

        $scope.confirmDelete = function(friend, friendIndex){
            $scope.showConfirmDeleteIndex = friendIndex;
        };

        $scope.isShowing = function(index){
            return  $scope.showConfirmDeleteIndex === index;
        };



        $scope.propose = function(proposeTo){
            console.log("Proposing to" + proposeTo);
            $window.localStorage.proposingTo = proposeTo;
            $location.path('/contract');
            $scope.$apply();
            //pass to service - set username
            // take to contract page set up proposal
            // need to add contract view where they are waiting/set timer that on confirmation it does so
        };
        $scope.updateFriends();
    });