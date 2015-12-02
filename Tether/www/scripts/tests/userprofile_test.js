/**
 * Created by Tunjay Jafarli on 2015-11-24.
 */
describe('User Profile Controller', function() {

    beforeEach(module('tetherApp'));

    var $scope, $window, $controller, controller;

    var storage = {};

    var mockStorage =  {
        setItem: function(key, value) {
            storage[key] = value || '';
        },
        getItem: function(key) {
            return storage[key] || null;
        },
        removeItem: function(key) {
            delete storage[key];
        },
        get length() {
            return Object.keys(storage).length;
        },
        key: function(i) {
            var keys = Object.keys(storage);
            return keys[i] || null;
        }
    };

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    beforeEach(function() {
        $scope = {
            '$apply': function () {}
        };
        $window = {};
        $window.localStorage = mockStorage;
        $scope.model = {'first_name':'','last_name':'','email':''};
        controller = $controller('UserprofileCtrl', {
            $scope: $scope,
            $window: $window
        });
    });

    describe('$scope.hideEdit', function() {
        it('should set $scope.editProfile variable to false', function() {
            $scope.hideEdit();
            expect($scope.editProfile).toBe(false);
        });
    });

    describe('$scope.edit', function() {
        it('should set $scope.editProfile variable to true', function() {
            $scope.edit();
            expect($scope.editProfile).toBe(true);
        });
    });

    describe('$scope.updateProfile', function() {
        it('should call userService to update the server if valid input', function() {
            $scope.model = {'first_name':'Tunjay','last_name':'Jafarli','email':'tunjay.jafarli@gmail.com'};
            $scope.updateProfile([], $scope.model);
        });
    });

    describe('$scope.checkAchievements', function() {
        it('should set firstWin, fiveWins, tenWins and hundredPercentWins variables to be true', function() {
            mockStorage.userWins = 15;
            mockStorage.userLosses = 0;
            $scope.checkAchievements();
            expect($scope.firstWin).toBe(true);
            expect($scope.fiveWins).toBe(true);
            expect($scope.tenWins).toBe(true);
            expect($scope.twentyFiveWins).toBe(false);
            expect($scope.hundredPercentWins).toBe(true);
        });
        it('should hundredWins, lost25, seventyFivePercentWins variable to be true', function() {
            mockStorage.userWins = 100;
            mockStorage.userLosses = 25;
            $scope.checkAchievements();
            expect($scope.hundredWins).toBe(true);
            expect($scope.lost25).toBe(true);
            expect($scope.seventyFivePercentWins).toBe(true);
        });
        it('shoould set firstWin = false and lost10 = true', function() {
            mockStorage.userWins = 0;
            mockStorage.userLosses = 10;
            $scope.checkAchievements();
            expect($scope.firstWin).toBe(false);
            expect($scope.lost10).toBe(true);
        });
    });

});