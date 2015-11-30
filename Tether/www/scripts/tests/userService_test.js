/**
 * Created by Tunjay Jafarli on 2015-11-29.
 */
describe('User Service', function() {

    var UserService, $q, $http, $cookies, $rootScope;

    beforeEach(function() {
        module('tetherApp');
        $q = {};
        $http = {};
        $cookies = {};
        $rootScope = {};
        inject(function ($injector) {
            UserService = $injector.get('userService', {
                $q: $q,
                $http: $http,
                $cookies: $cookies,
                $rootScope: $rootScope
            });
        });
    });

    it('initialize() should set API_URL and use_session variables to the given url and session respectively', function() {
        var url = 'http://206.87.220.31:8000/';
        var sessions = false;
        UserService.initialize(url, sessions);
        expect(UserService.API_URL).toBe(url);
        expect(UserService.use_session).toBe(sessions);
    });
});