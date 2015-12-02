/**
 * Created by Tunjay Jafarli on 2015-12-02.
 */
describe('Logout Controller', function() {

    beforeEach(module('tetherApp'));

    var rootScope, scope, location, controller;

    beforeEach(inject(function($location, $rootScope, $controller) {
        location = $location;
        rootScope = $rootScope;
        scope = $rootScope.$new();
        controller = $controller('LogoutCtrl', {$scope: scope});
    }));

    it('location.path should set to /', function() {
        expect(location.path()).toBe('/');
    });

});