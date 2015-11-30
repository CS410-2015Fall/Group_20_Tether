'use strict';

/**
 * @ngdoc function
 * @name tetherApp.controller:RestrictedCtrl
 * @description
 * # RestrictedCtrl
 * Controller of the tetherApp
 */
angular.module('tetherApp')
  .controller('RestrictedCtrl', function ($scope, $location) {
    $scope.$on('userService.logged_in', function() {
      $location.path('/');
    });
  });
