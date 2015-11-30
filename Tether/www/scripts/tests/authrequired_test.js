/**
 * Created by Tunjay Jafarli on 2015-11-28.
 */
describe('AuthRequired Controller', function() {

    beforeEach(module('tetherApp'));

    var $scope, $controller, controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    beforeEach(function() {
        $scope = {};
        controller = $controller('AuthrequiredCtrl', {
            $scope: $scope
        });
    });

    it('$scope.awesomeThings', function() {
        var awesomeThings = ['HTML5 Boilerplate', 'AngularJS', 'Karma'];
        expect($scope.awesomeThings).toEqual(awesomeThings);
    });
});