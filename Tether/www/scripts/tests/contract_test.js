/**
 * Created by Tunjay Jafarli on 2015-11-23.
 */
describe('Contract Controller', function() {
    beforeEach(module('tetherApp'));
    var $scope, $window, $location, $http, $routeParams, mockContractService, $controller, controller, mockUserService;
    var storage = {};
    var contractJSON = {"contract":{"apps":[],"durationInMins":0,"hours":"","mins":"","seconds":"","wagerAmount":0,"friend":"","gcmTokenFromProposer":"","from":"","status":"","timeStart":"","points":"","claimed":""}};
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

    module(function($provide) {
        $provide.service('contractService', function(){
            this.applist = jasmine.createSpy('applist').and.callFake(function(){
                return ["Facebook", "Chrome", "Instagram"];
            });
            this.cancelContract = jasmine.createSpy('cancelContract').and.callFake(function(){
                //do nothing since gcm call
            });
            this.sendContract = jasmine.createSpy('sendContract').and.callFake(function(){
                //do nothing since gcm call
            });
            this.contractSucceed = jasmine.createSpy('contractSucceed').and.callFake(function(){
                //do nothing since gcm call
            });
            this.contractBroken = jasmine.createSpy('contractBroken').and.callFake(function(){
                //do nothing since gcm call
            });
        });
        $provide.service('userService', function() {
            this.users = jasmine.createSpy('users').and.callFake(function() {
                return ["Tony", "Lane", "Jack", "Jenna", "Steven", "Arthur", "Paul"];
            });
            this.profile = jasmine.createSpy('profile').and.callFake(function() {
                var data = {username: "Lane", email: "lpither@hotmail.com", first_name: "", last_name: "", friends:["Arthur", "Steven", "Paul"], points: 3};
                return data;
            });
            this.then = jasmine.createSpy('then').and.callFake(function(){
                var data = {username: "Lane", email: "lpither@hotmail.com", first_name: "", last_name: "", friends:["Arthur", "Steven", "Paul"], points: 3};
                //$scope.from = data.username;
                var text = JSON.stringify(data);
                var jdata = JSON.parse(text);
                $scope.from = jdata.username;
                $scope.userPoints = jdata.points;
                $scope.userWins = jdata.wins;
                $scope.userLosses = jdata.loses;
            })
        });
    });

    beforeEach(inject(function (_$controller_, contractService, userService) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        mockContractService = contractService;
        mockUserService = userService;
    }));

    beforeEach(function() {
        $scope = {
            '$apply' : function(){},
            'showButton' : true,
            'submitted' : false,
            'waitingForResponse' : false,
            'validHours': true,
            'validAppSelection' : true,
            'validWagerAmount' : true,
            'enoughPoints' : true,
            'contractHours' : 0,
            'contractMinutes' : 0,
            'contractSeconds' : 0,
            'blacklistedApps' : [],
            'foregroundApp' : "",
            'blacklistedAppUsed' : "",
            'ongoingContract' : false,
            'contractOver' : false
        };
        $window = {};
        $location : {};
        $http = {};
        $routeParams = {};
        $window.localStorage = mockStorage;
        $window.plugins = {};
        $window.plugins.toast = {
            'showWithOptions': function(){}
        };
        Applist = {
            'createEvent' : function(){
                return ["Facebook", "Instagram"];
            }
        };
        navigator = {};
        navigator.notification = {
            'alert': function(){}
        };
        controller = $controller('contractCtrl', {
            $scope: $scope,
            $window: $window,
            $location: $location,
            $http: $http,
            $routeParams: $routeParams,
            contractService: mockContractService,
            userService: mockUserService
        });

        this.element = $('<input name="contract_hours" id="hrID" type="number" ng-model="contractHours" placeholder="Hr" class="form-control" required value="5" />')
        this.element.appendTo('body');
        this.element = $('<input name="contract_minutes" id="minID" type="number" ng-model="contractMinutes" placeholder="Min" class="form-control" required value="10" />')
        this.element.appendTo('body');
        this.element = $('<input name="contract_seconds" id="secID" type="number" ng-model="contractSeconds" placeholder="Sec" class="form-control" required value="15" />')
        this.element.appendTo('body');
        this.element = $('<input name="contract_wager" id="wagerID" type="number" ng-model="contractWager" placeholder="Amount to wager" class="form-control" required value="20" />');
        this.element.appendTo('body');
    });

    describe('$scope.validateHours', function() {
        var validDuration;
        it('should return true if total duration input is valid, i.e. >0', function() {
            validDuration = $scope.validateHours(1,30,0);
            expect(validDuration).toBe(true);
        });
        it('should return false if total duration input is not valid, i.e. <=0', function() {
            validDuration = $scope.validateHours(0,0,0);
            expect(validDuration).toBe(false);
        });
    });

    describe('$scope.waitForResponse', function(){
        var checkInterval;
        it('should be 1 after running waitForResponse', function(){
            $scope.waitForResponse();
            checkInterval = $scope.checkForResponseInterval;
            expect(checkInterval).toBe(1);
        });
        it('should be 2 after clearingInterval waitForResponse', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.waitForResponse();
            $scope.succeeded();
            checkInterval = $scope.checkForResponseInterval;
            expect(checkInterval).toBe(2);
        });
    });

    describe('$scope.succeed with accept same terms contract', function(){
        it('ongoingContract should be false after running succeed', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.succeeded();
            var ongoingContract = $scope.ongoingContract;
            expect(ongoingContract).toBe(false);
        });
        it('contractOver should be true after running succeed', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.succeeded();
            var contractOver = $scope.contractOver;
            expect(contractOver).toBe(true);
        });
        it('contractSuccess should be true after running succeed', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.succeeded();
            var contractSuccess = $scope.contractSuccess;
            expect(contractSuccess).toBe(true);
        });
        it('contractForfeited should be false after running succeed', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.succeeded();
            var contractForfeited = $scope.contractForfeited;
            expect(contractForfeited).toBe(false);
        });
        it('remove myCurrentContract local storage after running forfeit', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.succeeded();
            var currentContract = $window.localStorage.getItem("myCurrentContract");
            expect(currentContract).toBe(null);
        });
    });

    describe('$scope.succeed with contract you propose', function(){
        it('ongoingContract should be false after running succeed', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs,JSON.stringify(contractJSON));
            $scope.succeeded();
            var ongoingContract = $scope.ongoingContract;
            expect(ongoingContract).toBe(false);
        });
        it('contractOver should be true after running succeed', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs,JSON.stringify(contractJSON));
            $scope.succeeded();
            var contractOver = $scope.contractOver;
            expect(contractOver).toBe(true);
        });
        it('contractSuccess should be true after running succeed', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs,JSON.stringify(contractJSON));
            $scope.succeeded();
            var contractSuccess = $scope.contractSuccess;
            expect(contractSuccess).toBe(true);
        });
        it('contractForfeited should be false after running succeed', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs,JSON.stringify(contractJSON));
            $scope.succeeded();
            var contractForfeited = $scope.contractForfeited;
            expect(contractForfeited).toBe(false);
        });
        it('remove myCurrentContract local storage after running forfeit', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs,JSON.stringify(contractJSON));
            $scope.succeeded();
            var nonexistentContract = $window.localStorage.getItem("myCurrentContract");
            var currentContract = $window.localStorage.getItem(storeAs);
            expect(currentContract).toBe(null);
            expect(nonexistentContract).toBe(null);
        });
    });

    describe('$scope.forfeit with accept same terms contract', function(){
        it('ongoingContract should be false after running forfeit', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.forfeit();
            var ongoingContract = $scope.ongoingContract;
            expect(ongoingContract).toBe(false);
        });
        it('contractOver should be true after running forfeit', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.forfeit();
            var contractOver = $scope.contractOver;
            expect(contractOver).toBe(true);
        });
        it('contractSuccess should be false after running forfeit', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.forfeit();
            var contractSuccess = $scope.contractSuccess;
            expect(contractSuccess).toBe(false);
        });
        it('contractForfeited should be true after running forfeit', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.forfeit();
            var contractForfeited = $scope.contractForfeited;
            expect(contractForfeited).toBe(true);
        });
        it('remove myCurrentContract local storage after running forfeit', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.forfeit();
            var currentContract = $window.localStorage.getItem("myCurrentContract");
            expect(currentContract).toBe(null);
        });
    });

    describe('$scope.forfeit with contract you propose', function(){
        it('ongoingContract should be false after running forfeit', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs,JSON.stringify(contractJSON));
            $scope.forfeit();
            var ongoingContract = $scope.ongoingContract;
            expect(ongoingContract).toBe(false);
        });
        it('contractOver should be true after running forfeit', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs,JSON.stringify(contractJSON));
            $scope.forfeit();
            var contractOver = $scope.contractOver;
            expect(contractOver).toBe(true);
        });
        it('contractSuccess should be false after running forfeit', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs,JSON.stringify(contractJSON));
            $scope.forfeit();
            var contractSuccess = $scope.contractSuccess;
            expect(contractSuccess).toBe(false);
        });
        it('contractForfeited should be true after running forfeit', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs,JSON.stringify(contractJSON));
            $scope.forfeit();
            var contractForfeited = $scope.contractForfeited;
            expect(contractForfeited).toBe(true);
        });
        it('remove all contracts from local storage after running forfeit', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.forfeit();
            var nonexistentContract = $window.localStorage.getItem("myCurrentContract");
            var currentContract = $window.localStorage.getItem(storeAs);
            expect(currentContract).toBe(null);
            expect(nonexistentContract).toBe(null);
        });
    });

    describe('$scope.lose with accept same terms contract', function(){
        it('ongoingContract should be false after running lose', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.lose();
            var ongoingContract = $scope.ongoingContract;
            expect(ongoingContract).toBe(false);
        });
        it('contractOver should be true after running lose', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.lose();
            var contractOver = $scope.contractOver;
            expect(contractOver).toBe(true);
        });
        it('contractSuccess should be false after running lose', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.lose();
            var contractSuccess = $scope.contractSuccess;
            expect(contractSuccess).toBe(false);
        });
        it('contractForfeited should be false after running lose', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.lose();
            var contractForfeited = $scope.contractForfeited;
            expect(contractForfeited).toBe(false);
        });
        it('remove myCurrentContract local storage after running lose', function(){
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.lose();
            var currentContract = $window.localStorage.getItem("myCurrentContract");
            expect(currentContract).toBe(null);
        });
    });

    describe('$scope.lose with contract you propose', function(){
        it('ongoingContract should be false after running lose', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs,JSON.stringify(contractJSON));
            $scope.lose();
            var ongoingContract = $scope.ongoingContract;
            expect(ongoingContract).toBe(false);
        });
        it('contractOver should be true after running lose', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs,JSON.stringify(contractJSON));
            $scope.lose();
            var contractOver = $scope.contractOver;
            expect(contractOver).toBe(true);
        });
        it('contractSuccess should be false after running lose', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs,JSON.stringify(contractJSON));
            $scope.lose();
            var contractSuccess = $scope.contractSuccess;
            expect(contractSuccess).toBe(false);
        });
        it('contractForfeited should be true after running lose', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem(storeAs,JSON.stringify(contractJSON));
            $scope.lose();
            var contractForfeited = $scope.contractForfeited;
            expect(contractForfeited).toBe(false);
        });
        it('remove all contracts from local storage after running lose', function(){
            $scope.from = "Lane";
            var storeAs = "contract" + $scope.from;
            $window.localStorage.setItem("myCurrentContract",JSON.stringify(contractJSON));
            $scope.lose();
            var nonexistentContract = $window.localStorage.getItem("myCurrentContract");
            var currentContract = $window.localStorage.getItem(storeAs);
            expect(currentContract).toBe(null);
            expect(nonexistentContract).toBe(null);
        });
    });

    describe('checkForResponse', function(){
        it('waitingForResponse, onGoingContract, and ContractOver should be false', function(){
            $scope.from = "TestUser1";
            contractJSON.contract.status = "proposed";
            var storeAs = "contract" + "TestUser1";
            $scope.waitingForResponse = true;
            $scope.ongoingContract = false;
            $scope.ongoingContract = false;
            $window.localStorage.setItem("contractTestUser1", JSON.stringify(contractJSON));
            $scope.checkForResponse();
            var waitingForResponse = $scope.waitingForResponse;
            var onGoingContract = $scope.ongoingContract;
            var contractOver = $scope.contractOver;
            expect(waitingForResponse).toBe(true);
            expect(onGoingContract).toBe(false);
            expect(contractOver).toBe(false);
        });
        it('waitingForResponse,ContractOver should be false, onGoingContract should be true', function(){
            $scope.from = "TestUser1";
            contractJSON.contract.status = "accepted";
            var storeAs = "contract" + "TestUser1";
            $window.localStorage.setItem(storeAs, JSON.stringify(contractJSON));
            $scope.checkForResponse();
            var waitingForResponse = $scope.waitingForResponse;
            var onGoingContract = $scope.ongoingContract;
            var contractOver = $scope.contractOver;
            expect(waitingForResponse).toBe(false);
            expect(onGoingContract).toBe(true);
            expect(contractOver).toBe(false);
            expect(JSON.parse($window.localStorage.getItem(storeAs)).contract.status).toMatch("accepted");
        });
    });

    describe('routeToContract', function(){
        Applist = {
            'createEvent' : function(){
            }
        };
        it('showButton should be true', function(){
            $scope.routeToContract();
            var showButton = $scope.showButton;
            expect(showButton).toBe(true);
        });
        it('submitted should be false', function(){
            $scope.routeToContract();
            var showButton = $scope.submitted;
            expect(showButton).toBe(false);
        });
        it('waitingForResponse should be false', function(){
            $scope.routeToContract();
            var showButton = $scope.waitingForResponse;
            expect(showButton).toBe(false);
        });
        it('other scope variables should equal the commented out code in this describe', function(){
            $scope.routeToContract();
            var validHours =  $scope.validHours;
            expect(validHours).toBe(true);
            var validAppSelection = $scope.validAppSelection;
            expect(validAppSelection).toBe(true);
            var validWagerAmount = $scope.validWagerAmount;
            expect(validWagerAmount).toBe(true);
            var enoughPoints = $scope.enoughPoints;
            expect(enoughPoints).toBe(true);
            var contractHours = $scope.contractHours;
            expect(contractHours).toEqual(0);
            var contractMinutes = $scope.contractMinutes;
            expect(contractMinutes).toEqual(0);
            var contractSeconds = $scope.contractSeconds;
            expect(contractSeconds).toEqual(0);
            //Scope variables for monitoring
            var blacklistedApps = $scope.blacklistedApps;
            expect(blacklistedApps).toEqual([]);
            var foregroundApp = $scope.foregroundApp;
            expect(foregroundApp).toMatch("");
            var blacklistedAppUsed = $scope.blacklistedAppUsed;
            expect(blacklistedAppUsed).toMatch("");
            var ongoingContract = $scope.ongoingContract;
            expect(ongoingContract).toBe(false);
            var contractOver = $scope.contractOver;
            expect(contractOver).toBe(false);
        });
    });

    describe('cancelContract', function(){
        it('contract should be removed from local storage', function(){
            $scope.from = "Lane";
            $window.localStorage.setItem("contractLane", JSON.stringify(contractJSON));
            $scope.cancelContract();
            var contract = $window.localStorage.getItem("contractLane");
            expect(contract).toBe(null);
        });
    });

    describe('myCurrentContractExists', function(){
        it('blacklistapps should equal contractJSON apps', function(){
            contractJSON.contract.apps = [{'name': "facebook"}, {'name': "browser"}];
            $window.localStorage.setItem("myCurrentContract", JSON.stringify(contractJSON));
            $scope.checkIfStartingOwn();
            var blacklistedApps = $scope.blacklistedApps;
            expect(blacklistedApps).toEqual(["facebook", "browser"]);
        });
        it('wagerAmount should equal contractJSON wagerAmount', function(){
            contractJSON.contract.wagerAmount = 40;
            $window.localStorage.setItem("myCurrentContract", JSON.stringify(contractJSON));
            $scope.checkIfStartingOwn();
            var wager = $scope.wagerAmount;
            expect(wager).toEqual(40);
        });
        it('$scope.hours/mins/seconds should equal contractJSON hours/mins/sec', function(){
            contractJSON.contract.hours = 4;
            contractJSON.contract.mins = 6;
            contractJSON.contract.seconds = 3;
            $window.localStorage.setItem("myCurrentContract", JSON.stringify(contractJSON));
            $scope.checkIfStartingOwn();
            var hours = $scope.contractHours;
            var minutes = $scope.contractMinutes;
            var seconds = $scope.contractSeconds;
            expect(hours).toEqual(4);
            expect(minutes).toEqual(6);
            expect(seconds).toEqual(3);

        })
    });

    describe('creatingToasts', function(){
        it('scope.refreshlocalMessage should equal to 1', function(){
            $scope.startToasts();
            var toastInterval = $scope.refreshToastMessage;
            var localInterval = $scope.refreshLocalMessage;
            expect(toastInterval).toBe(6);
            expect(localInterval).toBe(7);
        });
    });

    describe('validationInput', function(){
        it('validation of contract proposal input - incorrect case', function(){
            $scope.wagerAmount = "text";
            $scope.blacklistedApps = [];
            $scope.validationInput("ab","akdm","text", contractJSON);
            var hrs = $scope.contractHours;
            expect(hrs).toEqual(0);
            var mins = $scope.contractMinutes;
            expect(mins).toEqual(0);
            var secs = $scope.contractSeconds;
            expect(secs).toEqual(0);
            var wager = $scope.wagerAmount;
            expect(wager).toEqual(0);
            var validApps = $scope.validAppSelection;
            expect(validApps).toBe(false);
        });
        it('validation of contract proposal input - correct case', function(){
            $scope.wagerAmount = 6;
            $scope.blacklistedApps = ["Facebook", "Tether"];
            contractJSON.contract.hours = "";
            contractJSON.contract.mins = "";
            contractJSON.contract.seconds = "";
            $scope.validationInput(7,34,1, contractJSON);
            var wager = $scope.wagerAmount;
            expect(wager).toEqual(6);
            var validApps = $scope.validAppSelection;
            expect(validApps).toBe(true);
        });
        it('user needs to have more points (Absolute value) than wagering amonut and must select apps - not valid case', function(){
            $scope.wagerAmount = 100;
            $scope.userPoints = -40;
            $scope.blacklistedApps = [];
            $scope.validationInput("ab","akdm","text", contractJSON);

            var enoughPoints = $scope.enoughPoints;
            expect(enoughPoints).toBe(false);
            var validApps = $scope.validAppSelection;
            expect(validApps).toBe(false);
        });
        it('user needs to have more points (Absolute value) than wagering amonut and must select app - valid case', function(){
            $scope.wagerAmount = 50;
            $scope.userPoints = 1000;
            $scope.blacklistedApps = ["facebook", "Tether"];
            $scope.validationInput("ab","akdm","text", contractJSON);

            var enoughPoints = $scope.enoughPoints;
            expect(enoughPoints).toBe(true);
            var validApps = $scope.validAppSelection;
            expect(validApps).toBe(true);
        });
    });

    describe('$scope.submitContract', function(){
       it('', function(){
         $scope.submitContract();
           expect($scope.waitingForResponse).toBe(true);
           expect($scope.submitted).toBe(true);
       });
    });

});
