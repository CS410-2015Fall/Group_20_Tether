'use strict';

angular.module('tetherApp')
  .controller('VerifyemailCtrl', function ($scope, $routeParams, userService) {
    userService.verify($routeParams["emailVerificationToken"]).then(function(data){
    	$scope.success = true;
    },function(data){
    	$scope.failure = false;
    });
  });
