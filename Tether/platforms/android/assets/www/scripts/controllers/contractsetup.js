/**
 * Created by tuncay_ceferli on 2015-10-30.
 */


var contractSetup = angular.module('contractSetup',['ngRoute','ngTouch', 'ngCordova']);


contractSetup.controller('contractSetupCtrl', ['$scope', '$http', '$', '$routeParams',
    function($scope,$location, $http, $routeParams, $cordovaApplist) {

        $scope.apps = [];

        $scope.getApps = function(){
            Applist.createEvent('','','','','', function(app_list){
                $scope.$apply(function(){
                    $scope.apps = JSON.parse(app_list);
                });
                console.log(JSON.stringify((app_list)));
            }, function(app_list){
                console.log("Oopsie! " + app_list);
            });
        };
    }]);
