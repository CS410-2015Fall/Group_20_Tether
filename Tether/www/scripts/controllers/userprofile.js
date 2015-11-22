'use strict';

angular.module('tetherApp')
  .controller('UserprofileCtrl', function ($scope, userService, validationService) {

    $scope.model = {'username':'', 'email':'', 'first_name':'','last_name':'', 'friends':[], 'score':0, 'wins':0, ;'totalContracts':0};
  	$scope.complete = false;

  	userService.profile().then(function(data){
  		//$scope.model = data;
      $scope.model = {username:"Lane", email:"lpither@hotmail.com", first_name:"", last_name:"", friends:["Arthur", "Steven", "Paul"], score:10, wins:1, totalContracts:1};
  	});

    $scope.updateProfile = function(formData, model){
      $scope.errors = [];
      validationServicee.form_validation(formData,$scope.errors);
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
