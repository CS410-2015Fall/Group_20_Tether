'use strict';

angular.module('tetherApp')
  .controller('LogoutCtrl', function ($scope, $location, userService) {
    userService.logout();
    $location.path('/');
  });
