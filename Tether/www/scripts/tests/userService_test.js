/**
 * Created by Tunjay Jafarli on 2015-11-29.
 */
describe('Service: userService', function() {

    var service,
        httpBackend;

    //load the angular app module
    beforeEach(function() {
        module('tetherApp');
    });
    // inject your service and $httpBackend from angular-mocks.js
    beforeEach(inject(function (userService ,$httpBackend) {
        service = userService;
        httpBackend = $httpBackend;
    }));


    it('initialize() should set API_URL and use_session variables to the given url and session respectively', function() {
        var url = 'http://listone1993.pythonanywhere.com/';
        var sessions = false;
        service.initialize(url, sessions);
        expect(service.API_URL).toBe(url);
        expect(service.use_session).toBe(sessions);
    });
    /////////////////////////////////
    it('login should return key', function () {
        service.login('admin','123123').then(function (data) {
            expect(data).toEqual({"key": "869d8a62be4cf48f03178e08af2864b1dc1e1743"});
        });
    });


    it('login should return key', function () {
        httpBackend.whenPOST('rest-auth/login/').respond({"key": "sometoken"});
        // invoke your login method
        service.login('username','password').then(function (data) {
            expect(data).toEqual({"key": "sometoken"});
        });
    });

    it('logout should return message', function () {
        httpBackend.whenPOST('rest-auth/logout/').respond({"success": "Successfully logged out."});
        // invoke your logout method
        service.logout().then(function (data) {
            expect(data).toEqual({"success": "Successfully logged out."});
        });
    });

    it('register should return key', function () {
        httpBackend.whenPOST('rest-auth/register/').respond({"key": "somekey"});
        // invoke your register method
        service.register('username','password1','password2','email').then(function (data) {
            expect(data.key).toEqual({"key": "somekey"});
        });
    });

    it('profile should return profile', function () {
        httpBackend.whenGET('rest-auth/user/').respond({
            "username": "someuser",
            "email": "someuser@gmail.com",
            "first_name": "",
            "last_name": "",
            "gcm_token": "",
            "points": 25,
            "friends": "",
            "wins": 0,
            "loses": 0
        });
        // invoke your register method
        service.profile().then(function (data) {
            expect(data).toEqual({
                "username": "someuser",
                "email": "someuser@gmail.com",
                "first_name": "",
                "last_name": "",
                "gcm_token": "",
                "points": 25,
                "friends": "",
                "wins": 0,
                "loses": 0
            });
        });
    });

    it('updateprofile should return updatedprofile', function () {
        httpBackend.whenPATCH('rest-auth/user/').respond({
            "username": "someuser",
            "email": "someuser@gmail.com",
            "first_name": "updatedname",
            "last_name": "",
            "gcm_token": "",
            "points": 25,
            "friends": "",
            "wins": 0,
            "loses": 0
        });
        // invoke your register method
        service.updateProfile({"first_name":"updatedname"}).then(function (data) {
            expect(data).toEqual({
                "username": "someuser",
                "email": "someuser@gmail.com",
                "first_name": "updatedname",
                "last_name": "",
                "gcm_token": "",
                "points": 25,
                "friends": "",
                "wins": 0,
                "loses": 0
            });
        });
    });

    it('users should return list of user profiles', function () {
        httpBackend.whenGET('userprofile/users').respond([
            {
                "username": "admin",
                "email": "jkdsuhr@gmail.com",
                "first_name": "",
                "last_name": "",
                "gcm_token": "",
                "points": 25,
                "friends": "",
                "wins": 0,
                "loses": 0
            },
            {
                "username": "jay",
                "email": "kdslego@gmail.com",
                "first_name": "Jay",
                "last_name": "Suhr",
                "gcm_token": "APA91bF6gPzgMcNLKfQt-n57BJam3SQ4LqIB5m7EQuADvIcNer7tEeLE2Ebs9Zov4J9TR1ZZ5z33_hz6t3aLmRdd6Neu-CKFziTakcVIz9kERRkMl8FhIe8jjDAc8nsSf_X-LzfGd57d",
                "points": 205,
                "friends": "['Steve', 'kds', 'testing1223', 'Lane', 'Jay']",
                "wins": 9,
                "loses": 16
            }]);
        // invoke your logout method
        service.users().then(function (data) {
            expect(data).toEqual([
                {
                    "username": "admin",
                    "email": "jkdsuhr@gmail.com",
                    "first_name": "",
                    "last_name": "",
                    "gcm_token": "",
                    "points": 25,
                    "friends": "",
                    "wins": 0,
                    "loses": 0
                },
                {
                    "username": "jay",
                    "email": "kdslego@gmail.com",
                    "first_name": "Jay",
                    "last_name": "Suhr",
                    "gcm_token": "APA91bF6gPzgMcNLKfQt-n57BJam3SQ4LqIB5m7EQuADvIcNer7tEeLE2Ebs9Zov4J9TR1ZZ5z33_hz6t3aLmRdd6Neu-CKFziTakcVIz9kERRkMl8FhIe8jjDAc8nsSf_X-LzfGd57d",
                    "points": 205,
                    "friends": "['Steve', 'kds', 'testing1223', 'Lane', 'Jay']",
                    "wins": 9,
                    "loses": 16
                }]);
        });
    });

});