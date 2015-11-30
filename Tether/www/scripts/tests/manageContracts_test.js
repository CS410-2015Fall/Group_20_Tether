/**
 * Created by Tunjay Jafarli on 2015-11-28.
 */
describe('Manage Contracts Controller', function() {

    beforeEach(module('tetherApp'));

    var $scope, $window, $location, $controller, controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    beforeEach(function() {
        $scope = {};
        $window = {};
        $location = {};
        controller = $controller('manageContractCtrl', {
            $scope: $scope,
            $window: $window,
            $location: $location
        });
    });

    var contractJSON = {"contract":{"apps":[],"durationInMins":0,"hours":"","mins":"","seconds":"","wagerAmount":0,"friend":"","gcmTokenFromProposer":"","from":"","status":"","timeStart":"","points":"","claimed":""}};

    describe('$scope.isShowing', function() {
        it('should return true if $scope.showDetails == index', function() {
            $scope.showDetails = 1;
            expect($scope.isShowing(1)).toBe(true);
        });
        it('should return false if $scope.showDetails is not equal to the given index', function() {
            $scope.showDetails = 1;
            expect($scope.isShowing(2)).toBe(false);
        });
    });

    describe('$scope.viewDetails', function() {
        contractJSON.contract.apps = [{'name':"Facebook"}, {"name":"Instagram"}];
        it('should update $scope.selectedContractApps with the name of apps in the given contractJSON', function() {
            $scope.viewDetails(1, contractJSON);
            expect($scope.showDetails).toEqual(1);
            expect($scope.selectedContractApps).toEqual(["Facebook", "Instagram"]);
        });
    });

    describe('$scope.viewDetailsOngoing', function() {
        contractJSON.contract.apps = [{'name':"Facebook"}, {"name":"Instagram"}];
        contractJSON.contract.timeStart = new Date().getTime();
        it('should ', function() {
            contractJSON.contract.durationInMins = 0;
            $scope.viewDetailsOngoing(1, contractJSON);
            expect($scope.showDetails).toEqual(1);
            expect($scope.selectedContractApps).toEqual(["Facebook", "Instagram"]);
        });
        it('should ', function() {
            contractJSON.contract.durationInMins = 60;
            $scope.viewDetailsOngoing(1,contractJSON);
        });
    });

    describe('$scope.viewDetailsFinished', function() {
        contractJSON.contract.status = "success";
        it('should set $scope.isClaimed to be true', function() {
            contractJSON.contract.claimed = "yes";
            $scope.viewDetailsFinished(1, contractJSON);
            expect($scope.isClaimed).toBe(true);
        });
        it('should set $scope.isClaimed to be false', function() {
            contractJSON.contract.claimed = "no";
            $scope.viewDetailsFinished(1, contractJSON);
            expect($scope.isClaimed).toBe(false);
        });
    });

    describe('$scope.calculatePointsEarned', function() {
        contractJSON.contract.points = 10;
        it('should set $scope.pointsEarned = 0 if success', function() {
            contractJSON.contract.status = "success";
            $scope.calculatePointsEarned(contractJSON);
            expect($scope.pointsEarned).toEqual(0);
        });
        it('should set $scope.pointsEarned = 10 if forfeit', function() {
            contractJSON.contract.status = "forfeit";
            $scope.calculatePointsEarned(contractJSON);
            expect($scope.pointsEarned).toEqual(10);
        });
        it('should set $scope.pointsEarned = 10 if failure', function() {
            contractJSON.contract.status = "failure";
            $scope.calculatePointsEarned(contractJSON);
            expect($scope.pointsEarned).toEqual(10);
        });
        it('should console out error message otherwise', function() {
            contractJSON.contract.status = "";
            $scope.calculatePointsEarned(contractJSON);
            expect($scope.pointsEarned).toBeUndefined();
        });
    });

    describe('$scope.getPoints', function() {
        it('should ', function() {
            // TODO
        });
    });

    describe('$scope.deleteContract', function() {
        it('should remove contractForm from $window.localStorage', function() {
            // TODO
        });
    });

    describe('$scope.getContractTimeRemaining', function() {
        contractJSON.contract.timeStart = new Date().getTime();
        it('should ', function() {
            contractJSON.contract.durationInMins = 60.00;
            $scope.getContractTimeRemaining(contractJSON);
        });
        it('should ', function() {
            contractJSON.contract.durationInMins = 0;
            $scope.getContractTimeRemaining(contractJSON);
            expect($scope.selectedContractHours).toEqual(0);
            expect($scope.selectedContractMins).toEqual(0);
            expect($scope.selectedContractSeconds).toEqual(0);
        });
    });

    describe('$scope.hideDetails', function() {
        it('should initialize $scope.showDetails and call clearInterval()', function() {
            $scope.hideDetails();
            expect($scope.showDetails).toBe("");
        });
    });

    describe('$scope.getContractsFromLocalStorage', function() {
        // TODO
    });

    describe('$scope.getNumProposedContracts', function() {
        // TODO
    });

    describe('$scope.getNumOngoingContracts', function() {
        // TODO
    });


    describe('$scope.getNumFinishedContracts', function() {
        // TODO
    });

    describe('$scope.displayPending', function() {
        it('should correctly set scope variables', function() {
            $scope.displayPending();
            expect($scope.showPending).toBe(true);
            expect($scope.showOngoing).toBe(false);
            expect($scope.showFinished).toBe(false);
        });
    });

    describe('$scope.displayOngoing', function() {
        it('should correctly set scope variables', function() {
            $scope.displayOngoing()
            expect($scope.showPending).toBe(false);
            expect($scope.showOngoing).toBe(true);
            expect($scope.showFinished).toBe(false);
        });
    });

    describe('$scope.displayFinished', function() {
        it('should correctly set scope variables', function() {
            $scope.displayFinished();
            expect($scope.showPending).toBe(false);
            expect($scope.showOngoing).toBe(false);
            expect($scope.showFinished).toBe(true);
        });
    });

    describe('$scope.update', function() {
        // TODO
    });

    describe('$scope.rejectContract', function() {
        // TODO
    });

    describe('$scope.acceptAndWatch', function() {
        // TODO
    });

    describe('$scope.acceptAndStartOwn', function() {
        // TODO
    });

});