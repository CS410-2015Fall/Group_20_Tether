/**
 * Created by lanepither on 15-10-17.
 */


var app = angular.module("navigationBar", ['ngRoute'])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {

        $routeProvider.when('/home',
            {
                templateUrl:    '../clientApp/home.html',
                controller:     'HomeCtrl'
            });
        $routeProvider.when('/friends',
            {
                templateUrl:    '../clientApp/friends.html',
                controller:     'FriendsCtrl'
            });
        $routeProvider.when('/profile',
            {
                templateUrl:    '../clientApp/profile.html',
                controller:     'ProfileCtrl'
            });
        $routeProvider.when('/settings',
            {
                templateUrl:    '../ClientApp/settings.html',
                controller:     'SettingsCtrl'
            });
        $routeProvider.otherwise(
            {
                redirectTo:     'home',
                controller:     'HomeCtrl'
            }
        );
    });

app.controller('NavCtrl',
    ['$scope', '$location', function ($scope, $location) {
        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || '/home';
            return page === currentRoute ? 'active' : '';
        };

        $scope.loadHome = function(){
            $location.url('/home');
        };

        $scope.loadFriends = function(){
            $location.url('/friends');
        };

        $scope.loadProfiles = function(){
            $location.url('/profile');
        };

        $scope.loadSettings = function(){
            $location.url('/settings');
        };

    }]);

app.controller('HomeCtrl', function($scope, $compile) {
    console.log('inside home controller');

});

app.controller('FriendsCtrl', function($scope, $compile) {
    console.log('inside friends controller');

});

app.controller('ProfileCtrl', function($scope, $compile) {
    console.log('inside profile controller');

});

app.controller('SettingsCtrl', function($scope, $compile) {
    console.log('inside settings controller');

});