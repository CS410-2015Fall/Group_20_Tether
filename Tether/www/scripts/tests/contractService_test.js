/**
 * Created by Tunjay Jafarli on 2015-11-28.
 */
describe('Contract Service', function() {

    var ContractService, $q, $http;

    beforeEach(function() {
        module('tetherApp');
        $q = {};
        $http = {};
        inject(function($injector) {
            ContractService = $injector.get('contractService', {
                $q: $q,
                $http: $http
            });
        });
    });

    it('should initialize GCM_URL', function() {
        expect(ContractService.GCM_URL).toBe('https://android.googleapis.com/gcm/send')
    });

    it('applist() should retrieve list of installed apps', function() {
        //ContractService.applist();
    });

    it('request() should make request to the server', function() {
        ContractService.request({});
    });

    it('contractbroken() should alert that contract has been broken by the contractor', function() {
        ContractService.contractbroken("dummyGCM",{"contract": "dummyContractJSON"});
    });

    it('contractsucceed() should alert that contract has been successfully completed by the contractor', function() {
        ContractService.contractsucceed("dummyGCM",{"contract": "dummyContractJSON"});
    });

    it('sendcontract() should alert the user that a new contract has been received', function() {
        ContractService.sendcontract("dummyGCM",{"contract": "dummyContractJSON"});
    });

    it('acceptsontract() should alert the proposer that proposed contract has been accepted', function() {
        ContractService.acceptcontract("dummyGCM",{"contract": "dummyContractJSON"});
    });

    it('declinecontract() should alert the proposer that proposed contract has been declined', function() {
        ContractService.declinecontract("dummyGCM",{"contract": "dummyContractJSON"});
    });
});