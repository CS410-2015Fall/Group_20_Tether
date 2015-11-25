/**
 * Created by Tunjay Jafarli on 2015-11-24.
 */
describe('User Profile Controller', function() {

    beforeEach(module('tetherApp'));

    var $scope, $controller, controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    beforeEach(function() {
        $scope = {};
        $scope.model = {'first_name':'','last_name':'','email':''};
        controller = $controller('UserprofileCtrl', { $scope: $scope });
    });

    describe('$scope.updateProfile', function() {
        it('should call userService to update the server if valid input', function() {
            $scope.model = {'first_name':'Tunjay','last_name':'Jafarli','email':'tunjay.jafarli@gmail.com'};
            // TODO
        });
    });

});