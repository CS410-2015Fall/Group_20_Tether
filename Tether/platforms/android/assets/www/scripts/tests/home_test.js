/**
 * Created by Tunjay Jafarli on 2015-11-23.
 */
describe('Home Controller', function() {

    beforeEach(module('tetherApp'));

    var $scope, $window, $location, $http, $routeParams, $controller, controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    beforeEach(function() {
        $scope = {};
        $window = {};
        $location = {};
        $http = {};
        $scope.serverReturned = {username: "", email: "", first_name: "", last_name: "", friends:[], points:""};
        controller = $controller('homeCtrl', { $scope: $scope, $window: $window, $location: $location, $http: $http });
    });

    describe('$scope.quickMatch', function() {
        it('should propose to a random friend', function() {
            // TODO
        });
    });

    describe('$scope.propose', function() {
        it('should propose the contract to a selected friend and store the username at local storage', function() {
            // TODO
        });
    });

    describe('$scope.getUser', function() {
        it('should set $scope.user to data.username ', function() {
            // TODO
            //$scope.serverReturned.username = "johnsmith";
            $scope.getUser();
            expect($scope.user).toBeUndefined();
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
            // TODO
            $scope.updateFriends();
            expect($scope.serverReturned.friends).toEqual([]);
        });
    });

    describe('$scope.createRandomFriends', function() {
        it('if friend list contains <=3 items, should add those items to the list $scope.randomFriends after shuffling ', function() {
            $scope.serverReturned.friends = ["Arthur"];
            $scope.createRandomFriends();
            expect($scope.randomFriends).toEqual(["Arthur"]);
        });
        it('if friend list contains >3 items, should add first three to the list $scope.randomFriends after shuffling', function() {
            // TODO
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