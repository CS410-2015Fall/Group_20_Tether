/**
 * Created by Tunjay Jafarli on 2015-12-02.
 */
describe('Master Controller', function() {

    var scope, rootScope, location, controller;

    beforeEach(module('tetherApp'));

    beforeEach(inject(function($location, $rootScope, $controller) {
        location = $location;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        controller = $controller('MasterCtrl', {$scope: scope});
    }));

    describe('$scope.$on', function() {
        it('should set scope.authenticated to false if userService.logged_out', function() {
            scope.$on('userService.logged_in');
            expect(scope.authenticated).toBe(false);
        });
    });

    describe('$scope.goToLogin', function() {
        it('should change location.path to /login', function() {
            scope.goToLogin();
            expect(location.path()).toBe('/login');
        });
    });

    describe('$scope.goToRegister', function() {
        it('should change location.path to /register', function() {
            scope.goToRegister();
            expect(location.path()).toBe('/register');
        });
    });

    describe('$scope.goToLogout', function() {
        it('should change location.path to /logout', function() {
            scope.goToLogout();
            expect(location.path()).toBe('/logout');
        });
    });

    describe('$scope.goToProfile', function() {
        it('should change location.path to /userProfile', function() {
            scope.goToProfile();
            expect(location.path()).toBe('/userProfile');
        });
    });

    describe('$scope.goToHome', function() {
        it('should change location.path to /home', function() {
            scope.goToHome();
            expect(location.path()).toBe('/home');
        });
    });

    describe('$scope.goToFriends', function() {
        it('should change location.path to /friends', function() {
            scope.goToFriends();
            expect(location.path()).toBe('/friends');
        });
    });

    describe('$scope.goToManageContracts', function() {
        it('should change location.path to /manageContracts', function() {
            scope.goToManageContracts();
            expect(location.path()).toBe('/manageContracts');
        });
    });
});