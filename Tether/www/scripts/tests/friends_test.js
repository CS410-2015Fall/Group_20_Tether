/**
 * Created by Tunjay Jafarli on 2015-11-23.
 */
describe('Friends Controller', function() {

    beforeEach(module('tetherApp'));

    var $scope, $window, $rootScope, $location, $http, mockUserService, $controller, controller;

    module(function($provide) {
        $provide.service('userService', function() {
            this.users = jasmine.createSpy('users').and.callFake(function() {
                return [];
            });
            this.profile = jasmine.createSpy('profile').and.callFake(function() {
                var data = {username: "Lane", email: "lpither@hotmail.com", first_name: "", last_name: "", friends:["Arthur", "Steven", "Paul"]};
                return data;
            });
        });
    });

    beforeEach(inject(function (_$controller_, userService) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        // Get a reference to mock userService
        mockUserService = userService;
    }));

    beforeEach(function() {
        $scope = {};
        $window = {};
        $rootScope = {};
        $location = {};
        $http = {};
        $window.localStorage = {};
        $scope.serverReturned = {username: "", email: "", first_name: "", last_name: "", friends:[]};
        controller = $controller('friendsCtrl', {
            $scope: $scope,
            $window: $window,
            $rootScope: $rootScope,
            $location: $location,
            $http: $http,
            userService: mockUserService
        });
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
            // TODO Mock userService
            $scope.updateFriends();
            console.log("Update Friends: " + $scope.serverReturned.friends);
            expect($scope.serverReturned.friends).toEqual([]);
        });
    });

    // Mock getElementById to return a dummy HTML element
    //dummyElement = document.createElement("id_userToAdd");
    //document.getElementById = jasmine.createSpy("Tony").and.returnValue(dummyElement);

    describe('$scope.addFriend', function() {
        // TODO
        it('should add new friend if the input is valid and is not already in the list', function() {
            /*
            $scope.serverReturned.friends = ["Jack", "Jerry", "Jenna"]
            $scope.addFriend("Tony");
            expect($scope.friendAddedNotValid).toBe(false);
            expect($scope.friendAlreadyExists).toBe(false);
            expect($scope.serverReturned.friends).toContain("Tony");
            console.log("Friends: " + $scope.serverReturned.friends);
            /*
        });
        it('should not add and alert if friend list already contains the friend to be added', function() {
            /*
            $scope.addFriend("Steven");
            console.log("Friends: " + $scope.serverReturned.friends);

            $scope.addFriend("Steven");
            expect($scope.friendAlreadyExists).toBe(true);
            console.log("Friends: " + $scope.serverReturned.friends);
            */
        });
        it('should alert the user if the input is not valid', function() {
            $scope.addFriend("");
            expect($scope.friendAddedNotValid).toBe(true);
            expect($scope.serverReturned.friends).toEqual([]);
        });
    });

    describe('$scope.deleteFriend', function() {
        it('should remove the given username from the friend list', function() {
            $scope.serverReturned.friends = ["Sam", "Jack", "Tony"];
            console.log("Friends: " + $scope.serverReturned.friends);
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
            // TODO
            //spyOn($location, 'path').and.returnValue('/contract');

            $scope.propose("Tony");
            expect($window.localStorage.proposingTo).toEqual("Tony");
        });
    });
});