/**
 * Created by lanepither on 15-10-19.
 */

var startApp = angular.module("startApp", ['ngRoute'])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {

        $routeProvider.when('/index',
            {
                temmplateUrl: '../index.html',
                controller:   'IndexCtrl'
            });

        $routeProvider.when('/login',
            {
                templateUrl:    '../clientApp/loginComponents/login.html',
                controller:     'LoginCtrl'
            });
        $routeProvider.when('/register',
            {
                templateUrl:    '../clientApp/loginComponents/register.html',
                controller:     'RegisterCtrl'
            });

        $routeProvider.otherwise(
            {
                redirectTo:     'index',
                controller:     'IndexCtrl'
            }
        );
    });


startApp.controller('InitCtrl',
    ['$scope', '$location', function ($scope, $location) {
        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || '/home';
            return page === currentRoute ? 'active' : '';
        };

        $scope.loadLogin = function(){
            $location.url('/login');
            ngView();
        };

        $scope.loadRegister = function(){
            $location.url('/register');
            ngView();
        };

    }]);

startApp.controller('LoginCtrl', function($scope, $compile) {
    console.log('inside login controller');

});

startApp.controller('RegisterCtrl', function($scope, $compile) {
    console.log('inside register controller');

});

startApp.controller('IndexCtrl', function($scope, $compile) {
    console.log('inside index controller');

});




