'use strict';

angular.module('tetherApp')
  .controller('UserprofileCtrl', function ($scope, userService, validationService) {
    $scope.model = {'first_name':'','last_name':'','email':''};
  	$scope.complete = false;
  	userService.profile().then(function(data){
  		$scope.model = data;
  	});
    $scope.updateProfile = function(formData, model){
      $scope.errors = [];
      validationService.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        userService.updateProfile(model)
        .then(function(data){
        	// success case
        	$scope.complete = true;
        },function(data){
        	// error case
        	$scope.error = data;
        });
      }
    }
  });
