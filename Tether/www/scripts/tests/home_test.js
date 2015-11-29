/**
 * Created by Tunjay Jafarli on 2015-11-23.
 */
describe('Home Controller', function() {

    beforeEach(module('tetherApp'));

    var $scope, $window, $location, $http, $routeParams, mockUserService, $controller, controller;

    beforeEach(function() {
        mockUserService = {
            profile: jasmine.createSpy()
        };
    });

    module(function($provide) {
        $provide.service('userService', mockUserService)
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
        $location = {};
        $http = {};
        $window.localStorage = {};
        $window.localStorage.gcmtoken = "dummyGCMtoken";
        $scope.serverReturned = {username: "", email: "", first_name: "", last_name: "", friends:[], points:""};
        controller = $controller('homeCtrl', {
            $scope: $scope,
            $window: $window,
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

    describe('$scope.quickMatch', function() {
        it('should alert if user has no friend', function() {
            $scope.serverReturned.friends = [];
            $scope.quickMatch();
            expect($scope.noFriends).toBe(true);
        });
        it('should propose to a random friend', function() {
            $scope.serverReturned.friends = ["Arthur", "Steven", "Paul", "Emily", "Tony"];
            $scope.quickMatch();
            expect($scope.serverReturned.friends).toContain($window.localStorage.proposingTo);
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

    describe('$scope.getUser', function() {
        it('should set $scope.user to data.username ', function() {
            // TODO
            $scope.getUser();
            expect($scope.user).toBeUndefined();
        });
    });

    describe('$scope.updateFriends', function() {
        it('should update friend list of the user from the server', function() {
            // TODO
            $scope.updateFriends();
            expect($scope.serverReturned.friends).toEqual([]);
        });
    });

    describe('$scope.createRandomFriends', function() {
        it('if friend list contains <=3 items, should add those items to the list $scope.randomFriends after shuffling ', function() {
            $scope.serverReturned.friends = ["Arthur", "Steven"];
            $scope.createRandomFriends();
            expect($scope.randomFriends).toEqual($scope.serverReturned.friends);
        });
        it('if friend list contains >3 items, should add first three to the list $scope.randomFriends after shuffling', function() {
            $scope.serverReturned.friends = ["Arthur", "Steven", "Paul", "Emily", "Tony"];
            $scope.createRandomFriends();
            expect($scope.serverReturned.friends).toEqual(jasmine.arrayContaining($scope.randomFriends));
        });
    });

    describe('$scope.getRandomFriend', function() {
        var randomFriend;
        it('if friend list is empty, should return undefined', function() {
            $scope.serverReturned.friends = [];
            randomFriend = $scope.getRandomFriend();
            expect(randomFriend).toBeUndefined();
        });
        it('if friend list contains only one item, should return it', function() {
            $scope.serverReturned.friends = ["Arthur"];
            randomFriend = $scope.getRandomFriend();
            expect(randomFriend).toEqual("Arthur");
        });
        it('if friend list contains more than one item, should return first friend after the friend list is shuffled', function() {
            $scope.serverReturned.friends = ["Arthur", "Steven", "Paul", "Jack", "Tony"];
            randomFriend = $scope.getRandomFriend();
            expect($scope.serverReturned.friends).toContain(randomFriend);
        });
    });

});