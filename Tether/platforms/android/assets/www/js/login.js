/**
 * Created by lanepither on 15-10-19.
 */

var loginApp = angular.module("LoginApp", []);

loginApp.controller("loginCtrl", [ '$scope', function($scope){
    $scope.name = "Login Reached";
}]);