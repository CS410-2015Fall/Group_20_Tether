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
        var json = model;
        var text = JSON.stringify(json);
        var obj = JSON.parse(text);
        var firstname =obj.first_name;
        var lastname =obj.last_name;
        var email = obj.email;
        var updated = {
            'first_name':firstname,
            'last_name':lastname,
            'email':email
        };
      validationService.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        userService.updateProfile(updated)
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
