/**
 * Created by Tunjay Jafarli on 2015-11-23.
 */
describe('Login Controller', function() {

    beforeEach(module('tetherApp'));

    var $scope, $location, $controller, controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    beforeEach(function() {
        $scope = {};
        $location = {};
        $scope.model = {'username':'','password':''};
        controller = $controller('LoginCtrl', { $scope: $scope, $location: $location });
    });

    describe('$scope.login', function() {
        // TODO
        // cannot find variable 'device' in pushService :line 5
    });
});