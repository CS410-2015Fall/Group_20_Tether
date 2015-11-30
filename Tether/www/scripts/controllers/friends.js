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

        $scope.setFriendToAdd = function() {
            var friendToAdd = document.getElementById("id_userToAdd").value.toString();
            addFriend(friendToAdd);
            if (!$scope.friendAddedNotValid && !$scope.friendAlreadyExists) {
                document.getElementById("id_addFriendForm").reset();
            }
        };


        $scope.addFriend = function(valueToCheck){

            $scope.friendAlreadyExists = false;

            //var valueToCheck = document.getElementById("id_userToAdd").value.toString().toUpperCase();

            for (var i = 0; i < $scope.serverReturned.friends.length; i++){

                var listItemToCheck = $scope.serverReturned.friends[i].toString();

                if (listItemToCheck === valueToCheck){
                    var alreadyExists = true;
                    break;

                }
                else {
                    var alreadyExists = false;
                }

            }
            //if (valueToCheck === "" || $scope.allusers.indexOf(valueToCheck) == -1){
            if (valueToCheck === ""){
                $scope.friendAddedNotValid = true;
            } else {
                if (alreadyExists){
                    $scope.friendAlreadyExists = true;
                } else {

                    console.log("Add Friend Button Pressed: Adding " + valueToCheck);

                    $scope.serverReturned.friends.push(valueToCheck);
                    var updated = {
                        'friends':$scope.serverReturned.friends
                    };
                    userService.updateProfile(updated).then(function(data){
                        // success case
                    },function(data){
                        // error case
                    });
                    $scope.checkNoFriends();
                    //document.getElementById("id_addFriendForm").reset();
                    $scope.friendAddedNotValid = false;
                    $scope.friendAlreadyExists = false;
                }
            }
        };


        $scope.deleteFriend = function(friendToDelete){
            console.log("Deleting Friend " + friendToDelete);
            $scope.showConfirmDeleteIndex = "";
            var deleteIndex = $scope.serverReturned.friends.indexOf(friendToDelete);
            if (deleteIndex > -1) {
                $scope.serverReturned.friends.splice(deleteIndex, 1);
                console.log("Friends after deletion: " + $scope.serverReturned.friends);
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
            console.log("Proposing to selected friend: " + proposeTo);
            $window.localStorage.proposingTo = proposeTo;
            // TODO
            //$location.path('/contract');
            //$scope.$apply();
        };
        $scope.updateFriends();
    });