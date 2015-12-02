/**
 * Created by Tunjay Jafarli on 2015-11-29.
 */
describe('Service: firendsService', function() {

    var service, httpBackend;

    // load the angular app module
    beforeEach(function() {
        module('tetherApp');
    });
    // inject your service and $httpBackend from angular-mocks.js
    beforeEach(inject(function (friendsService ,$httpBackend) {
        service = friendsService;
        httpBackend = $httpBackend;
    }));



    it('login should return key', function () {
        httpBackend.whenPOST('https://android.googleapis.com/gcm/send').respond({
            "multicast_id": 6974076693575526417,
            "success": 1,
            "failure": 0,
            "canonical_ids": 0,
            "results": [
                {
                    "message_id": "0:1449036088133479%39597f64f9fd7ecd"
                }
            ]
        });
        service.notifyfriend('somegcm','message').then(function (data) {
            expect(data).toEqual({
                "multicast_id": 6974076693575526417,
                "success": 1,
                "failure": 0,
                "canonical_ids": 0,
                "results": [
                    {
                        "message_id": "0:1449036088133479%39597f64f9fd7ecd"
                    }
                ]
            });
        });
    });

});
