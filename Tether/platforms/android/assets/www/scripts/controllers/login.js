'use strict';

angular.module('tetherApp')
  .controller('LoginCtrl', function ($scope, $location, userService, validationService) {
    $scope.model = {'username':'','password':''};
  	$scope.complete = false;
    $scope.login = function(formData){
      $scope.errors = [];
      validationService.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        userService.login($scope.model.username, $scope.model.password)
        .then(function(data){
        	// success case
        	$location.path("/home");
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
  });
