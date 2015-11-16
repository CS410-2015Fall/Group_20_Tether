'use strict';

angular.module('tetherApp')
  .controller('MasterCtrl', function ($scope, $location, userService) {
    // Assume user is not logged in until we hear otherwise
    $scope.authenticated = false;
    // Wait for the status of authentication, set scope var to true if it resolves
    userService.authenticationStatus(true).then(function(){
        $scope.authenticated = true;
    });
    // Wait and respond to the logout event.
    $scope.$on('userService.logged_out', function() {
      $scope.authenticated = false;
    });
    // Wait and respond to the log in event.
    $scope.$on('userService.logged_in', function() {
      $scope.authenticated = true;
    });
    // If the user attempts to access a restricted page, redirect them back to the main page.
    $scope.$on('$routeChangeError', function(ev, current, previous, rejection){
      console.error("Unable to change routes.  Error: ", rejection)
      $location.path('/restricted').replace();
    });

      //$scope.$on('$routeChangeSuccess', function(ev, current, previous, rejection){
        //$scope.pageName = $location.path().toUpperCase().substring(1);
        //$scope.$apply();
      //});


        $scope.goToLogin = function(){

          $location.path('/login');
        };

        $scope.goToRegister = function(){

          $location.path('/register');
        };

        $scope.goToLogout = function(){

          $location.path('/logout');
        };

        $scope.goToProfile = function(){

          $location.path('/userProfile');
        };

        $scope.goToHome = function(){

          $location.path('/home');
        };

        $scope.goToFriends = function(){

          $location.path('/friends');
        };


  });
