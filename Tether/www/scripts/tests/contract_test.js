/**
 * Created by Tunjay Jafarli on 2015-11-23.
 */
describe('Contract Controller', function() {

    beforeEach(module('tetherApp'));

    var $scope, $window, $location, $http, $routeParams, mockContractService, $controller, controller;

    module(function($provide) {
        $provide.service('contractService', mockContractService);
    });

    beforeEach(inject(function (_$controller_, contractService) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        mockContractService = contractService;
    }));

    beforeEach(function() {
        $scope = {};
        $window = {};
        $location = {};
        $http = {};
        $routeParams = {};
        $window.localStorage = {};
        controller = $controller('contractCtrl', {
            $scope: $scope,
            $window: $window,
            $location: $location,
            $http: $http,
            $routeParams: $routeParams,
            contractService: mockContractService
        });
    });

    describe('$scope.validateHours', function() {
        var validDuration;
        it('should return true if total duration input is valid, i.e. >0', function() {
            validDuration = $scope.validateHours(1,30,0);
            expect(validDuration).toBe(true);
        });
        it('should return false if total duration input is not valid, i.e. <=0', function() {
            validDuration = $scope.validateHours(0,0,0);
            expect(validDuration).toBe(false);
        });
    });

});