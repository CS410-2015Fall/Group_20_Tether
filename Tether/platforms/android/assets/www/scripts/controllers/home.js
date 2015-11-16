/**
 * Created by lanepither on 15-11-12.
 */

'use strict';

angular.module('tetherApp')
    .controller('homeCtrl',['$scope', '$window', '$location', function($scope, $window, $location, $http,
                                                                $routeParams, contractCtrl){


        $scope.quickMatch = function(){
            //$window.location.assign('views/contract.html');
            //contractCtrl.routeToContract();
            $location.path('/contract');
            $scope.$apply();
        };


        $scope.newContract = function(){
            //$window.location.assign('views/contract.html');
            //contractCtrl.routeToContract();
            $location.path('/contract');
            $scope.$apply();
        };

    }]);