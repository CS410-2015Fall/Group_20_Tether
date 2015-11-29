'use strict';

angular.module('tetherApp')
  .controller('UserprofileCtrl', function ($scope, userService, validationService) {
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
                    $scope.hideEdit();
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


        //Levels progress
        $scope.level0 = false;  // less than 0
        $scope.level1 = false; // less than 100
        $scope.level2 = false; // less than 250
        $scope.level3 = false; // less than 500
        $scope.level4 = false; // less than 1000
        $scope.level5 = false; // less than 2000
        $scope.level6 = false; // less than 5000
        $scope.level7 = false; // greater than 5000

        //Levels completed
        $scope.level0completed = false;  // less than 0
        $scope.level1completed = false; // less than 100
        $scope.level2completed = false; // less than 250
        $scope.level3completed = false; // less than 500
        $scope.level4completed = false; // less than 1000
        $scope.level5completed = false; // less than 2000
        $scope.level6completed = false; // less than 5000
        $scope.level7completed = false; // greater than 5000

        $scope.level0value = 0;  // less than 0
        $scope.level1value = 0; // less than 100
        $scope.level2value = 0; // less than 250
        $scope.level3value = 0; // less than 500
        $scope.level4value = 0; // less than 1000
        $scope.level5value = 0; // less than 2000
        $scope.level6value = 0; // less than 5000
        $scope.level7value = 0; // greater than 5000

        $scope.level0max = 0;  // less than 0
        $scope.level1max = 100; // less than 100
        $scope.level2max = 250; // less than 250
        $scope.level3max = 500; // less than 500
        $scope.level4max = 1000; // less than 1000
        $scope.level5max = 2000; // less than 2000
        $scope.level6max = 5000; // less than 5000
        $scope.level7max = 10000; // more than 5000

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
            userService.profile().then(function(data){
                var text = JSON.stringify(data);
                var jdata = JSON.parse(text);
                $scope.points = jdata.points;
                $scope.wins = jdata.wins;
                $scope.losses = jdata.loses;
            });


            if ($scope.points < 0){
                document.getElementById("level0notComplete").attr('aria-valuenow', $scope.points);
                $scope.level0 = true;
                $scope.negativePoints = true;
            }

            if (0 <= $scope.points < 100){
                $scope.level0 = false;
                document.getElementById("level0Complete").attr('aria-valuenow', 0);
                $scope.level0completed = true;
                document.getElementById("level1notComplete").attr('aria-valuenow', $scope.points);
                $scope.level1 = true;
            }

            if (100 <= $scope.points < 250){
                $scope.level0 = false;
                $scope.level1 = false;
                document.getElementById("level0Complete").attr('aria-valuenow', 0);
                $scope.level0completed = true;
                document.getElementById("level1Complete").attr('aria-valuenow', 100);
                $scope.level1completed = true;
                document.getElementById("level2notComplete").attr('aria-valuenow', $scope.points);
                $scope.level2 = true;
            }
            if (250 <= $scope.points < 500){
                $scope.level0 = false;
                $scope.level1 = false;
                $scope.level2 = false;

                document.getElementById("level0Complete").attr('aria-valuenow', 0);
                $scope.level0completed = true;
                document.getElementById("level1Complete").attr('aria-valuenow', 100);
                $scope.level1completed = true;
                document.getElementById("level2Complete").attr('aria-valuenow', 250);
                $scope.level2completed = true;
                document.getElementById("level3notComplete").attr('aria-valuenow', $scope.points);
                $scope.level3 = true;
            }
            if (500 <= $scope.points < 1000){
                $scope.level0 = false;
                $scope.level1 = false;
                $scope.level2 = false;
                $scope.level3 = false;

                document.getElementById("level0Complete").attr('aria-valuenow', 0);
                $scope.level0completed = true;
                document.getElementById("level1Complete").attr('aria-valuenow', 100);
                $scope.level1completed = true;
                document.getElementById("level2Complete").attr('aria-valuenow', 250);
                $scope.level2completed = true;
                document.getElementById("level3Complete").attr('aria-valuenow', 500);
                $scope.level3completed = true;
                document.getElementById("level4notComplete").attr('aria-valuenow', $scope.points);
                $scope.level4 = true;
            }
            if (1000 <= $scope.points < 2000){
                $scope.level0 = false;
                $scope.level1 = false;
                $scope.level2 = false;
                $scope.level3 = false;
                $scope.level4 = false;

                document.getElementById("level0Complete").attr('aria-valuenow', 0);
                $scope.level0completed = true;
                document.getElementById("level1Complete").attr('aria-valuenow', 100);
                $scope.level1completed = true;
                document.getElementById("level2Complete").attr('aria-valuenow', 250);
                $scope.level2completed = true;
                document.getElementById("level3Complete").attr('aria-valuenow', 500);
                $scope.level3completed = true;
                document.getElementById("level4Complete").attr('aria-valuenow', 1000);
                $scope.level4completed = true;
                document.getElementById("level5notComplete").attr('aria-valuenow', $scope.points);
                $scope.level5 = true;
            }
            if (2000 <= $scope.points < 5000){
                $scope.level0 = false;
                $scope.level1 = false;
                $scope.level2 = false;
                $scope.level3 = false;
                $scope.level4 = false;
                $scope.level5 = false;

                document.getElementById("level0Complete").attr('aria-valuenow', 0);
                $scope.level0completed = true;
                document.getElementById("level1Complete").attr('aria-valuenow', 100);
                $scope.level1completed = true;
                document.getElementById("level2Complete").attr('aria-valuenow', 250);
                $scope.level2completed = true;
                document.getElementById("level3Complete").attr('aria-valuenow', 500);
                $scope.level3completed = true;
                document.getElementById("level4Complete").attr('aria-valuenow', 1000);
                $scope.level4completed = true;
                document.getElementById("level5Complete").attr('aria-valuenow', 2000);
                $scope.level5completed = true;
                document.getElementById("level6notComplete").attr('aria-valuenow', $scope.points);
                $scope.level6 = true;
            }
            if (5000 <= $scope.points < 10000){
                $scope.level0 = false;
                $scope.level1 = false;
                $scope.level2 = false;
                $scope.level3 = false;
                $scope.level4 = false;
                $scope.level5 = false;
                $scope.level6 = false;

                document.getElementById("level0Complete").attr('aria-valuenow', 0);
                $scope.level0completed = true;
                document.getElementById("level1Complete").attr('aria-valuenow', 100);
                $scope.level1completed = true;
                document.getElementById("level2Complete").attr('aria-valuenow', 250);
                $scope.level2completed = true;
                document.getElementById("level3Complete").attr('aria-valuenow', 500);
                $scope.level3completed = true;
                document.getElementById("level4Complete").attr('aria-valuenow', 1000);
                $scope.level4completed = true;
                document.getElementById("level5Complete").attr('aria-valuenow', 2000);
                $scope.level5completed = true;
                document.getElementById("level6Complete").attr('aria-valuenow', 5000);
                $scope.level6completed = true;
                document.getElementById("level7notComplete").attr('aria-valuenow', $scope.points);
                $scope.level7 = true;
            }



            if ($scope.wins >= 1){
                $scope.firstWin = true;
            }

            if ($scope.wins >= 5){
                $scope.fiveWins = true;
            }

            if ($scope.wins >= 10){
                $scope.tenWins = true;

            }

            if ($scope.wins >= 25){
                $scope.twentyFiveWins = true;

            }

            if ($scope.wins >= 50){
                $scope.fiftyWins = true;

            }

            if ($scope.wins >= 100){
                $scope.hundredWins = true;

            }

            if (($scope.wins / ($scope.wins + $scope.losses)) >= 0.25){
                $scope.twentyFivePercentWins = true;
            }

            if (($scope.wins / ($scope.wins + $scope.losses)) >= 0.50){
                $scope.fiftyPercentWins = true;
            }

            if (($scope.wins / ($scope.wins + $scope.losses)) >= 0.75){
                $scope.seventyFivePercentWins = true;
            }

            if (($scope.wins / ($scope.wins + $scope.losses)) === 1) {
                $scope.hundredPercentWins = true;
            }

            if ($scope.losses  >= 10) {
                $scope.lost10 = true;
            }

            if ($scope.losses  >= 25) {
                $scope.lost25 = true;
            }

            $scope.$apply();





        }



  });
