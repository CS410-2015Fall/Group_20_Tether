/**
 * Created by lanepither on 15-10-19.
 */

var startApp = angular.module("startApp", ['ngRoute', 'UserApp'])
    .config(['$routeProvider', function ($routeProvider, $locationProvider, $httpProvider) {

        $routeProvider.when('/index',
            {
                temmplateUrl: '../index.html',
                controller:   'IndexCtrl'
            });

        $routeProvider.when('/login',
            {
                templateUrl:    '../clientApp/loginComponents/login.html',
                login: true,
                controller:     'LoginCtrl'
            });
        $routeProvider.when('/signup',
            {
                templateUrl:    '../clientApp/loginComponents/signup.html',
                public: true,
                controller:     'SignupCtrl'
            });

        $routeProvider.otherwise(
            {
                redirectTo:     '/home',
                controller:     'HomeCtrl'
            }
        );
    }])
    .run(function(user) {
        // Initiate the user service with UserApp App Id
        user.init({ appId: '562812a967f8b' });
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
            $location.url('/signup');
            ngView();
        };

    }]);

startApp.controller('LoginCtrl', function($scope, $compile) {
    console.log('inside login controller');

});

startApp.controller('SignupCtrl', function($scope, $compile) {
    console.log('inside signup controller');

});

startApp.controller('IndexCtrl', function($scope, $compile) {
    console.log('inside index controller');

});




