'use strict';

angular.module('tetherApp')
    .controller('UserprofileCtrl', function ($scope, userService,$window, validationService) {
        $scope.model = {'first_name':'','last_name':'','email':''};
        $scope.complete = false;
        $scope.editProfile = false;
        userService.profile().then(function(data){
            $scope.model = data;
        });

        $scope.hideEdit = function(){
            $scope.editProfile = false;
            $scope.$apply();
        };

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
                        setTimeout(function(){
                            $scope.editProfile = false;
                            $scope.$apply();
                        }, 2000);
                    },function(data){
                        // error case
                        $scope.error = data;
                    });
            }
        };

        $scope.edit = function(){
            $scope.editProfile = true;
            $scope.$apply()
        };

        userService.profile().then(function(data){
            var text = JSON.stringify(data);
            var jdata = JSON.parse(text);
            $window.localStorage.userWins = jdata.wins.toString();
            $window.localStorage.userLosses = jdata.loses.toString();
        });



        //Achievements
        $scope.firstWin = false; // for first win
        $scope.fiveWins = false;// for 5 wins
        $scope.tenWins = false; // for 10 wins
        $scope.twentyFiveWins = false; // for 25 wins
        $scope.fiftyWins = false; // for 50 wins
        $scope.hundredWins = false; // for 100 wins

        $scope.twentyFivePercentWins = false; // for 25% of games being won
        $scope.fiftyPercentWins = false;  // for 50% of games being won
        $scope.seventyFivePercentWins = false; // for 75% of games being won
        $scope.hundredPercentWins = false; // for 100% of games being won

        $scope.negativePoints = false; // for negative points
        $scope.lost10 = false; // for 10 losses
        $scope.lost25 = false; // for 25 losses


        $scope.calculateLevelsAndAchievements = function(){

            /*userService.profile().then(function(data){
                var text = JSON.stringify(data);
                var jdata = JSON.parse(text);

                $window.localStorage.userWins = jdata.wins.toString();
                $window.localStorage.userLosses = jdata.loses.toString(); */








            if (parseInt($window.localStorage.userWins) >= 1){
                $scope.firstWin = true;
                $scope.$apply();
            }

            if (parseInt($window.localStorage.userWins) >= 5){
                $scope.fiveWins = true;
                $scope.$apply();
            }

            if (parseInt($window.localStorage.userWins) >= 10){
                $scope.tenWins = true;
                $scope.$apply();

            }

            if (parseInt($window.localStorage.userWins) >= 25){
                $scope.twentyFiveWins = true;
                $scope.$apply();

            }

            if (parseInt($window.localStorage.userWins) >= 50){
                $scope.fiftyWins = true;
                $scope.$apply();

            }

            if (parseInt($window.localStorage.userWins) >= 100){
                $scope.hundredWins = true;
                $scope.$apply();

            }

            if ((parseInt($window.localStorage.userWins) / (parseInt($window.localStorage.userWins) + parseInt($window.localStorage.userLosses))) >= 0.25){
                $scope.twentyFivePercentWins = true;
                $scope.$apply();
            }

            if ((parseInt($window.localStorage.userWins) / (parseInt($window.localStorage.userWins) + parseInt($window.localStorage.userLosses))) >= 0.50){
                $scope.fiftyPercentWins = true;
                $scope.$apply();
            }

            if ((parseInt($window.localStorage.userWins) / (parseInt($window.localStorage.userWins) + parseInt($window.localStorage.userLosses))) >= 0.75){
                $scope.seventyFivePercentWins = true;
                $scope.$apply();
            }

            if ((parseInt($window.localStorage.userWins) / (parseInt($window.localStorage.userWins) + parseInt($window.localStorage.userLosses))) === 1) {
                $scope.hundredPercentWins = true;
                $scope.$apply();
            }

            if (parseInt($window.localStorage.userLosses)  >= 10) {
                $scope.lost10 = true;
                $scope.$apply();
            }

            if (parseInt($window.localStorage.userLosses)  >= 25) {
                $scope.lost25 = true;
                $scope.$apply();
            }

            $scope.$apply();

            //});

            //$scope.$apply();





        };


        $scope.calculateLevelsAndAchievements();


    });
