/**
 * Created by Tunjay Jafarli on 2015-11-28.
 */
describe('Push Service', function() {

    var PushService, $q, $window, pushConfig, device;

    beforeEach(function() {
        module('tetherApp');
        $q = {};
        $window = {};
        pushConfig = {};
        device = {};
        device.platform = 'android';
        inject(function($injector) {
            PushService = $injector.get('pushService', {
                $q: $q,
                $window: $window
            });
        });
    });

});