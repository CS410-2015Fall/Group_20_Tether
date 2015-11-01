/**
 * Created by Tunjay Jafarli on 2015-10-30.
 */

'use strict';

angular.module('angularDjangoRegistrationAuthApp')
    .controller('contractSetupCtrl',['$scope', '$location', function($scope, $location, $http, $routeParams, $cordovaApplist){

        $scope.showButton = true;

        $scope.contractDuration = 0;

        $scope.submitted = false;



        $scope.startContract = function(){
            $location.path("/contract");
            $scope.showButton = false;

            var getInstalledAppEvent = new CustomEvent("getInstalledApps",{
                'bubbles': true,
                'cancelable': true
            });
            document.getElementById("startContract").dispatchEvent(getInstalledAppEvent);

        };


        document.addEventListener('getInstalledApps', function (){

            Applist.createEvent('','','','','',function(app_list){

                    $.each(app_list, function () {
                        $("#installedApps").append($("<label>").text(this.name).prepend(
                            $("<input>").attr('type', 'checkbox').attr('id',(this.name))
                        ));
                    });


                },

                function(app_list){
                    console.log("Fail:" + app_list);
                });

        });




        var contractJSON = '{"contract":{"apps":[],"duration":0}}';


        $scope.submitContract = function(){

            var checkedBoxes = $(':checkbox:checked');

            var obj = JSON.parse(contractJSON);

            for (var i = 0; i < checkedBoxes.length; i++){

                obj["contract"]["apps"].push({"name":checkedBoxes[i].id});
                console.log(checkedBoxes.text());

            }

            obj["contract"].duration = document.getElementById("id_duration").value;

            contractJSON = JSON.stringify(obj);


            console.log(JSON.stringify(contractJSON));
            $scope.ongoingContract = true;
            $scope.submitted = true;

            $scope.startTimer();
        };


    $scope.startTimer = function(){

        var target_dateOld = new Date();

        var target_date = target_dateOld.setHours(target_dateOld.getHours() + $scope.contractDuration);






        // variables for time units
        var days, hours, minutes, seconds, min, sec, ms,  ms_step=10;

        // get tag element
        var countdown = document.getElementById('countdown');

        var refreshIntervalId = setInterval(function () {
            var current_date = new Date().getTime();
            var seconds_left = (target_date - current_date) / 1000;
            days = parseInt(seconds_left / 86400);
            seconds_left = seconds_left % 86400;
            hours = parseInt(seconds_left / 3600);
            seconds_left = seconds_left % 3600;
            min = parseInt(seconds_left / 60);
            sec = parseInt(seconds_left % 60);
            ms = parseInt(target_date-current_date);

            // format countdown string + set tag value
            countdown.innerHTML = ''+
                '<span class="hours">'+hours+'<b>Hours</b></span><br>'+
                '<span class="minutes">'+min+'<b>Minutes</b></span><br>'+
                '<span class="seconds">'+sec+'<b>Seconds</b></span>';
            // this is just for milliseconds only
            /* countdown.innerHTML =
             '<span class="ms">'+ms+' ms</span>'; */

            if (target_date < current_date){
                clearInterval(refreshIntervalId);
                $scope.ongoingContract = false;
                $scope.contractOver = true;
                $scope.contractSuccess = true;
            }
        }, ms_step);
    };

        $scope.forfeit = function(){

            $scope.ongoingContract = false;
            $scope.contractOver = true;
            $scope.contractSuccess = false;

        };



        /*
         $scope.contract = [contract: {apps:[ {name: "FB", img: xxx}, {name: "Google", img:yyy}], duration:"2"}]
         contract.duration = 3;
         */





    }]);


