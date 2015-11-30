'use strict';

angular.module('tetherApp')
  .controller('PasswordresetCtrl', function ($scope, userService, validationService) {
    $scope.model = {'email':''};
  	$scope.complete = false;
    $scope.resetPassword = function(formData){
      $scope.errors = [];
      validationService.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        userService.resetPassword($scope.model.email)
        .then(function(data){
        	// success case
        	$scope.complete = true;
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
  });
