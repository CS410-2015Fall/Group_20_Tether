'use strict';

angular.module('tetherApp')
  .controller('LogoutCtrl', function ($scope, $location, userService, pushService) {
      // unregister not recommended
      //pushService.unregister().then(function(result) {
      //    // Success!
      //}, function(err) {
      //    // An error occured. Show a message to the user
      //});
      userService.logout();
    $location.path('/');
  });
