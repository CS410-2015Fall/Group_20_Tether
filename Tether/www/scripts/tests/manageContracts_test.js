/**
 * Created by Tunjay Jafarli on 2015-11-28.
 */
describe('Manage Contracts Controller', function() {

    beforeEach(module('tetherApp'));

    var $scope, $window, $location, $controller, controller;

    var mockPushService;

    module(function($provide) {
        $provide.value('pushService', mockPushService);
    });


    beforeEach(inject(function (_$controller_, pushService) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        mockPushService = pushService;
    }));

    beforeEach(function() {
        $scope = {};
        $window = {};
        $location = {};
        controller = $controller('manageContractCtrl', {
            $scope: $scope,
            $window: $window,
            $location: $location,
            $pushService: mockPushService
        });
    });

});