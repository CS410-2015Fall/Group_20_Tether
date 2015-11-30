'use strict';

angular.module('tetherApp')
    .controller('RegisterCtrl', function ($location,$scope, userService, validationService) {
      $scope.model = {'username':'','password':'','email':''};
      $scope.complete = false;
      $scope.register = function(formData){
        $scope.errors = [];
          validationService.form_validation(formData,$scope.errors);
        if(!formData.$invalid){
            userService.register($scope.model.username,$scope.model.password1,$scope.model.password2,$scope.model.email)
              .then(function(data){
                // success case
                $scope.complete = true;
              },function(data){
                // error case
                $scope.errors = data;
              })
        }
      }
    });
