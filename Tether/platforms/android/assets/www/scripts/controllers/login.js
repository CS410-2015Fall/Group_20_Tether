'use strict';

angular.module('tetherApp')
  .controller('LoginCtrl', function ($scope, $location, userService,$window, validationService, pushService) {
    $scope.model = {'username':'','password':''};
  	$scope.complete = false;
    $scope.login = function(formData){
      $scope.errors = [];
      validationService.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
         //register device when login
          pushService.register().then(function(result) {
              // Success!
          }, function(err) {
              // An error occured. Show a message to the user
          });


        userService.login($scope.model.username, $scope.model.password)
        .then(function(data){
        	// success case
            // Update server with new GCM registration
            var token = $window.localStorage.gcmtoken;
            var data = {
                'gcm_token':token
            }
            userService.updateProfile(data).then(function(result) {
                // Success!
            }, function(err) {
                // An error occured. Show a message to the user
            });
        	$location.path("/home");
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }
  });
