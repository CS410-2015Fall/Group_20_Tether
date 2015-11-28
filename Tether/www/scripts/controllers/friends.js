/**
 * Created by lanepither on 15-11-12.
 */
angular.module('tetherApp')
    .controller('friendsCtrl', function($scope, $window, $rootScope, $location, $http, userService, SharedState){
        $scope.allusers =[];

        userService.users().then(function (data){
            var s = data;
            var jsons=[];
            for (var i=s.length;i--;){
                jsons[i]=JSON.stringify(s[i]);
                var jdata = JSON.parse(jsons[i]);
                $scope.allusers.push(jdata.username);
            }
            console.log(JSON.stringify($scope.allusers));
        });

        $scope.noFriends = false;
        $scope.showConfirmDeleteIndex;
        $scope.friendAddedNotValid = false;
        $scope.friendAlreadyExists = false;
        $scope.serverReturned = {username: "", email: "", first_name: "", last_name: "", friends:[]};


        $scope.checkNoFriends = function(){
            if($scope.serverReturned.friends.length == 0){
                $scope.noFriends = true;
            } else $scope.noFriends = false;

        };


        $scope.updateFriends = function(){
            userService.profile().then(function (data){
                //$scope.serverReturned = data; todo
                $scope.serverReturned = {username: "Lane", email: "lpither@hotmail.com", first_name: "", last_name: "", friends:["Arthur", "Steven", "Paul"]};
                $scope.checkNoFriends();
            });
        };


        $scope.mockUpdateFriends = function(friendToAdd){
            $scope.serverReturned.friends.push(friendToAdd);
        };


        $scope.mockDeleteFriends = function(friendToDelete) {
            var deleteIndex = $scope.serverReturned.friends.indexOf(friendToDelete);
            if (deleteIndex > -1) {
                $scope.serverReturned.friends.splice(deleteIndex, 1);
            }
        };


        /*
         * Abstracted away for testing
         * getFriendToAdd() should be called in view
         */
        $scope.getFriendToAdd = function() {
            var friendToAdd = document.getElementById("id_userToAdd").value.toString().toUpperCase();
            $scope.addFriend(friendToAdd);
            document.getElementById("id_addFriendForm").reset();
        };


        $scope.addFriend = function(valueToCheck){
            // TODO: update friends in the server

            $scope.friendAlreadyExists = false;

            // var valueToCheck = document.getElementById("id_userToAdd").value.toString().toUpperCase();

            for (var i = 0; i < $scope.serverReturned.friends.length; i++){
                // Removed .toUpperCase() for testing
                var listItemToCheck = $scope.serverReturned.friends[i].toString();
                if (listItemToCheck === valueToCheck){
                    var alreadyExists = true;
                    console.log(valueToCheck + " already exists in the friend list");
                    break;
                }
                else {
                    var alreadyExists = false;
                }
            }

            if (valueToCheck === ""){
                $scope.friendAddedNotValid = true;
                console.log("The input is not valid")
            }  else {
                if (alreadyExists){
                    $scope.friendAlreadyExists = true;
                } else {
                    console.log("Add Friend Button Pressed: Adding " + valueToCheck);
                    $scope.mockUpdateFriends(valueToCheck);
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
            // todo delete from server
            $scope.mockDeleteFriends(friendToDelete);
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
            console.log("Selected friend - Proposing to " + proposeTo);
            $window.localStorage.proposingTo = proposeTo;
            //$location.path('/contract');
            //$scope.$apply();
        };
        $scope.updateFriends();
    });