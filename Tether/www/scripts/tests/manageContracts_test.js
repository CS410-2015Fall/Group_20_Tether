/**
 * Created by Tunjay Jafarli on 2015-11-28.
 */
describe('Manage Contracts Controller', function() {

    beforeEach(module('tetherApp'));

    var $scope, $window, $location, $controller, controller;

    var storage = {};

    var mockStorage =  {
        setItem: function(key, value) {
            storage[key] = value || '';
        },
        getItem: function(key) {
            return storage[key] || null;
        },
        removeItem: function(key) {
            delete storage[key];
        },
        get length() {
            return Object.keys(storage).length;
        },
        key: function(i) {
            var keys = Object.keys(storage);
            return keys[i] || null;
        }
    };

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;

    }));

    beforeEach(function() {
        $scope = {'$apply': function() {}};
        $window = {};
        $location = {};
        $window.localStorage = mockStorage;
        controller = $controller('manageContractCtrl', {
            $scope: $scope,
            $window: $window,
            $location: $location
        });
    });

    var contractJSON = {"contract":{"apps":[],"durationInMins":0,"hours":"","mins":"","seconds":"","wagerAmount":0,"friend":"","gcmTokenFromProposer":"","from":"","status":"","timeStart":"","points":"","claimed":""}};

    beforeEach(function() {
        contractJSON = {"contract":{"apps":[],"durationInMins":0,"hours":"","mins":"","seconds":"","wagerAmount":0,"friend":"","gcmTokenFromProposer":"","from":"","status":"","timeStart":"","points":"","claimed":""}};
    });

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

    describe('$scope.isShowingComplete', function() {
        it('should return true if $scope.showDetailsComplete == index', function() {
            $scope.showDetailsComplete = 1;
            expect($scope.isShowingComplete(1)).toBe(true);
        });
        it('should return false if $scope.showDetailsComplete is not equal to the given index', function() {
            $scope.showDetailsComplete = 1;
            expect($scope.isShowingComplete(2)).toBe(false);
        });
    });

    describe('$scope.viewDetails', function() {
        it('should update $scope.selectedContractApps with the name of apps in the given contractJSON', function() {
            contractJSON.contract.apps = [{'name':"Facebook"}, {"name":"Instagram"}];
            $scope.viewDetails(1, contractJSON);
            expect($scope.showDetails).toEqual(1);
            expect($scope.selectedContractApps).toEqual(["Facebook", "Instagram"]);
        });
    });

    describe('$scope.viewDetailsOngoing', function() {
        contractJSON.contract.timeStart = new Date().getTime();
        it('should set $scope.showDetails to the given index and set $scope.timerInterval', function() {
            contractJSON.contract.apps = [{'name':"Facebook"}, {"name":"Instagram"}];
            contractJSON.contract.durationInMins = 0;
            $scope.viewDetailsOngoing(1, contractJSON);
            expect($scope.showDetails).toEqual(1);
            expect($scope.selectedContractApps).toEqual(["Facebook", "Instagram"]);
        });
        it('should set $scope.showDetails to the given index and set $scope.timerInterval', function() {
            contractJSON.contract.durationInMins = 60;
            $scope.viewDetailsOngoing(1,contractJSON);
            expect($scope.showDetails).toEqual(1);
        });
    });

    describe('$scope.viewDetailsFinished', function() {
        contractJSON.contract.status = "failure";
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
        it('should set $scope.pointsEarned = 0 if success', function() {
            contractJSON.contract.points = 10;
            contractJSON.contract.status = "success";
            $scope.calculatePointsEarned(contractJSON);
            expect($scope.pointsEarned).toEqual(0);
        });
        it('should set $scope.pointsEarned = 10 if forfeit', function() {
            contractJSON.contract.points = 10;
            contractJSON.contract.status = "forfeit";
            $scope.calculatePointsEarned(contractJSON);
            expect($scope.pointsEarned).toEqual(10);
        });
        it('should set $scope.pointsEarned = 10 if failure', function() {
            contractJSON.contract.points = 10;
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
        contractJSON.contract.claimed = "";
        it('should set claimed == yes and store contractJSON in the local storage if success', function() {
            $scope.getPoints("Jay", "success", 25, contractJSON, 0);
            expect(contractJSON.contract.claimed).toEqual("yes");
        });
        it('should set claimed == yes and  store contractJSON in the local storage if forfeit', function() {
            $scope.getPoints("Jay", "forfeit", 25, contractJSON, 0);
            expect(contractJSON.contract.claimed).toEqual("yes");
            expect($scope.isClaimed).toBe(true);
        });
        it('should set claimed == yes and  store contractJSON in the local storage if failure', function() {
            $scope.getPoints("Jay", "failure", 25, contractJSON, 0);
            expect(contractJSON.contract.claimed).toEqual("yes");
            expect($scope.isClaimed).toBe(true);
        });
        it('should do nothing otherwise', function() {
            $scope.getPoints("Jay", "", 25, contractJSON, 0);
            expect($scope.isClaimed).toBeUndefined();
        });
    });

    describe('$scope.deleteContract', function() {
        it('should remove contractForm from $window.localStorage', function() {
            contractJSON.contract.from = "Jay";
            contractJSON.contract.uniqueId = "85"

            var dummyContract = JSON.stringify(contractJSON);
            var storageKey = "contract" + "Jay" + "85";

            mockStorage.setItem(storageKey, dummyContract);
            expect(dummyContract).toEqual(mockStorage.getItem(storageKey));

            $scope.deleteContract("Jay", "85");
            expect(mockStorage.getItem(storageKey)).toBe(null);
        });
    });

    describe('$scope.getContractTimeRemaining', function() {
        it('should ', function() {
            contractJSON.contract.timeStart = new Date().getTime();
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
        it('', function() {
            contractJSON.contract.status = "forfeit";
            mockStorage.setItem("key", JSON.stringify(contractJSON));
            $scope.getContractsFromLocalStorage();
        });
    });

    describe('$scope.getNumProposedContracts', function() {
        it('should set $scopeNumProposedContracts to the # of contracts with status=proposed', function() {
            var contract1 = {key: "111", val: contractJSON};
            contract1.val["contract"]["status"] = "proposed";
            $scope.contracts = [contract1];
            expect($scope.contracts.length).toEqual(1);
            $scope.getNumProposedContracts();
            expect($scope.numProposedContracts).toEqual(1);
            expect($scope.pendingContracts).toEqual([contract1]);
        });
    });

    describe('$scope.getNumOngoingContracts', function() {
        it('should set $scopeNumOngoingContracts to the # of contracts with status accepted and rejected', function() {
            var contract1 = {key: "111", val: contractJSON};
            contract1.val["contract"]["status"] = "accepted";
            var contract2 = {key: "111", val: contractJSON};
            contract1.val["contract"]["status"] = "rejected";
            $scope.contracts = [contract1, contract2];
            expect($scope.contracts.length).toEqual(2);
            $scope.getNumOngoingContracts();
            expect($scope.numOngoingContracts).toEqual(2);
            expect($scope.ongoingContracts).toEqual([contract1, contract1]);
        });
    });


    describe('$scope.getNumFinishedContracts', function() {
        it('should set $scopeNumFinishedContracts to the # of contracts with uniqueId', function() {
            var contract1 = {key: "111", val: contractJSON};
            contract1.val["contract"]["uniqueId"] = "dummyID";
            $scope.contracts = [contract1, contract1];

            expect($scope.contracts.length).toEqual(2);
            $scope.getNumFinishedContracts();
            expect($scope.numFinishedContracts).toEqual(2);
            expect($scope.finishedContracts).toEqual([contract1, contract1]);
        });
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
        it('should update number of pending, ongoing and finished contracts', function() {
            $scope.update();
        });
    });

    describe('$scope.rejectContract', function() {
        it('should set contract status to rejected and remove from local storage', function() {
            var storageKey = "contractuser";
            mockStorage.setItem("contractuser", contractJSON);
            $scope.rejectContract("user", "dummyToken", contractJSON);
            expect(contractJSON["contract"].status).toEqual("rejected");
            expect(mockStorage.getItem("contractuser")).toBe(null);
        });
    });

    describe('$scope.acceptAndWatch', function() {
        it('should set contract status to accepted and store in local storage', function() {
            $scope.acceptAndWatch("user", "dummyToken", contractJSON);
            expect(contractJSON["contract"].status).toEqual("accepted");
            expect(mockStorage.getItem("contractuser")).toBe(JSON.stringify(contractJSON));
        });
    });

    describe('$scope.acceptAndStartOwn', function() {
        it('should set contract status to accepted and store in local storage', function() {
            $scope.acceptAndStartOwn("user", "dummyToken", contractJSON);
            expect(contractJSON["contract"].status).toEqual("accepted");
            expect(mockStorage.getItem("contractuser")).toBe(JSON.stringify(contractJSON));
            expect(mockStorage.getItem("myCurrentContract")).toBe(JSON.stringify(contractJSON));
        });
    });

});