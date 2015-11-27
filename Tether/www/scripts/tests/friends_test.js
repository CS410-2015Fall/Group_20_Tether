/**
 * Created by Tunjay Jafarli on 2015-11-23.
 */
describe('Friends Controller', function() {

    beforeEach(module('tetherApp'));

    var $scope, $window, $rootScope, $location, $http, $controller, controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    beforeEach(function() {
        $scope = {};
        $window = {};
        $rootScope = {};
        $location = {};
        $http = {};
        $scope.serverReturned = {username: "", email: "", first_name: "", last_name: "", friends:[]};
        controller = $controller('friendsCtrl', { $scope: $scope, $window: $window, $rootScope: $rootScope, $location: $location, $http: $http });
    });

    describe('$scope.checkNoFriends', function() {
        it('should set noFriends variable to true if the user has no friends', function() {
            $scope.serverReturned = {username: "Tunjay", email: "tunjay.jafarli@gmail.com", first_name: "", last_name: "", friends:[]};
            $scope.checkNoFriends();
            expect($scope.noFriends).toBe(true);
        });
        it('should set noFriends variable to false if the user has friends', function() {
            $scope.serverReturned = {username: "Lane", email: "lpither@hotmail.com", first_name: "", last_name: "", friends:["Arthur", "Steven"]};
            $scope.checkNoFriends();
            expect($scope.noFriends).toBe(false);
        });
    });

    describe('$scope.updateFriends', function() {
        it('should update friend list of the user from the server', function() {
            // TODO
            $scope.updateFriends();
            expect($scope.serverReturned.friends).toEqual([]);
        });
    });

    describe('$scope.mockUpdateFriends', function() {
        it('should add the given username to friend list of the user', function() {
            $scope.mockUpdateFriends("Tony");
            expect($scope.serverReturned.friends).toContain("Tony");
        });
    });

    describe('$scope.addFriend', function() {

        // Mock getElementById to return a dummy HTML element
        var dummyElement = document.createElement("id_userToAdd");
        document.getElementById = jasmine.createSpy("Tony").and.returnValue(dummyElement);
        // $scope.getFriendToAdd();

        it('should add new friend if the input is valid', function() {
            $scope.addFriend("Jack");
            expect($scope.friendAddedNotValid).toBe(false);
            expect($scope.friendAlreadyExists).toBe(false);
            expect($scope.serverReturned.friends).toContain("Jack");
            console.log("Friends: " + $scope.serverReturned.friends);
        });
        it('should not add and alert if friend list already contains the friend to be added', function() {
            $scope.addFriend("Steven");
            console.log("Friends: " + $scope.serverReturned.friends);
            $scope.addFriend("Steven");
            expect($scope.friendAlreadyExists).toBe(true);
            console.log("Friends: " + $scope.serverReturned.friends);
        });
        it('should alert the user if the input is not valid', function() {
            $scope.addFriend("");
            expect($scope.friendAddedNotValid).toBe(true);
            expect($scope.serverReturned.friends).toEqual([]);
        });
    });

    describe('$scope.deleteFriend', function() {
        it('should remove the given username from the friend list', function() {
            $scope.serverReturned.friends.push("Jack");
            $scope.deleteFriend("Jack");
            expect($scope.serverReturned.friends).not.toContain("Jack");
        });
    });

    describe('$scope.cancelDelete', function() {
        it('should set showConfirmDeleteIndex to empty string', function() {
            $scope.cancelDelete();
            expect($scope.showConfirmDeleteIndex).toEqual('');
        });
    });

    describe('$scope.confirmDelete', function() {
        it('should assign showConfirmDeleteIndex the index of friend to be removed', function() {
            $scope.serverReturned.friends.push("Jack");
            $scope.confirmDelete("Jack", 0);
            expect($scope.showConfirmDeleteIndex).toEqual(0);
        });
    });

    describe('$scope.isShowing', function() {
        it('should return true if showConfirmDeleteIndex is equal to the given index', function() {
            $scope.showConfirmDeleteIndex = 1;
            expect($scope.isShowing(1)).toBe(true);
        });
        it('should return false if showConfirmDeleteIndex is not equal to the given index ', function() {
            $scope.showConfirmDeleteIndex = 1;
            expect($scope.isShowing(0)).toBe(false);
        });
    });

    describe('$scope.propose', function() {
        it('should propose the contract to a selected friend and store the username at local storage', function() {
            //spyOn($location, 'path').andReturn('/contract');

            $window.localStorage = {};
            $window.localStorage.proposingTo = '';
            $scope.propose("Tony");
            expect($window.localStorage.proposingTo).toEqual("Tony");
        });
    });
});