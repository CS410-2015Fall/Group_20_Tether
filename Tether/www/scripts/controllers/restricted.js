'use strict';

angular.module('tetherApp')
  .controller('RestrictedCtrl', function ($scope, $location) {
    $scope.$on('userService.logged_in', function() {
      $location.path('/');
    });
  });
