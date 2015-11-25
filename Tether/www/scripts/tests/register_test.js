/**
 * Created by Tunjay Jafarli on 2015-11-23.
 */
describe('Register Controller', function() {

    beforeEach(module('tetherApp'));

    var $scope, $controller, controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    beforeEach(function() {
        $scope = {};
        $scope.model = {'username':'','password':'','email':''};
        controller = $controller('RegisterCtrl', { $scope: $scope });
    });

    describe('$scope.register', function() {
        it('should call userService to register new user if valid input', function() {
            // TODO
        });
    });
});