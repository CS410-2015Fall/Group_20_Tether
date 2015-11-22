/**
 * Created by lanepither on 15-11-12.
 */


angular.module('tetherApp')
    .controller('friendsCtrl', function($scope, $rootScope, $location, $http, userService,
                                                                SharedState){

        //$scope.model = {'friendToAdd':''};
        $scope.noFriends = false;
        $scope.showConfirmDeleteIndex;
        $scope.friendAddedNotValid = false;
        $scope.friendAlreadyExists = false;
        $scope.serverReturned = {username: "", email: "", first_name: "",
            last_name: "", friends:[]};


        $scope.checkNoFriends = function(){
            if($scope.serverReturned.friends.length == 0){
                $scope.noFriends = true;
            } else $scope.noFriends = false;
        };


        $scope.updateFriends = function(){

            userService.profile().then(function (data){
                //$scope.serverReturned = data;
                $scope.serverReturned = {username: "Lane", email: "lpither@hotmail.com", first_name: "",
                    last_name: "", friends:["Arthur", "Steven", "Paul"]};
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










        $scope.addFriend = function(){
            $scope.friendAlreadyExists = false;
            console.log("Add Friend Button Pressed: Adding " + document.getElementById("id_userToAdd").value);
            // add friend
            // relay confirm or doesn't exist
            //update friends

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



            if (valueToCheck === ""){
                $scope.friendAddedNotValid = true;
            }  else {
                if (alreadyExists){
                    $scope.friendAlreadyExists = true;
                } else {
                    $scope.mockUpdateFriends(document.getElementById("id_userToAdd").value);
                    $scope.checkNoFriends();
                    document.getElementById("id_addFriendForm").reset();
                    $scope.friendAddedNotValid = false;
                    $scope.friendAlreadyExists = false;
                }
            }

        };


        $scope.deleteFriend = function(friendToDelete){
            console.log("DeletingFriend" + friendToDelete);
            $scope.showConfirmDeleteIndex = "";
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
            console.log("Proposing to" + proposeTo);

            $location.path('/contract');
            $scope.$apply();
            //pass to service - set username
            // take to contract page set up proposal
            // need to add contract view where they are waiting/set timer that on confirmation it does so
        };


        $scope.updateFriends();


    });