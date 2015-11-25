'use strict';

angular.module('tetherApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  "mobile-angular-ui"
])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/register', {
                templateUrl: 'views/register.html',
                resolve: {
                    authenticated: ['userService', function(userService){
                        return userService.authenticationStatus();
                    }],
                }
            })
            .when('/passwordReset', {
                templateUrl: 'views/passwordreset.html',
                resolve: {
                    authenticated: ['userService', function(userService){
                        return userService.authenticationStatus();
                    }],
                }
            })
            .when('/passwordResetConfirm/:firstToken/:passwordResetToken', {
                templateUrl: 'views/passwordresetconfirm.html',
                resolve: {
                    authenticated: ['userService', function(userService){
                        return userService.authenticationStatus();
                    }],
                }
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                resolve: {
                    authenticated: ['userService', function(userService){
                        return userService.authenticationStatus();
                    }],
                }
            })
            .when('/verifyEmail/:emailVerificationToken', {
                templateUrl: 'views/verifyemail.html',
                resolve: {
                    authenticated: ['userService', function(userService){
                        return userService.authenticationStatus();
                    }],
                }
            })
            .when('/logout', {
                templateUrl: 'views/logout.html',
                resolve: {
                    authenticated: ['userService', function(userService){
                        return userService.authenticationStatus();
                    }],
                }
            })
            .when('/userProfile', {
                templateUrl: 'views/userprofile.html',
                resolve: {
                    authenticated: ['userService', function(userService){
                        return userService.authenticationStatus();
                    }],
                }
            })
            .when('/passwordChange', {
                templateUrl: 'views/passwordchange.html',
                resolve: {
                    authenticated: ['userService', function(userService){
                        return userService.authenticationStatus();
                    }],
                }
            })
            .when('/restricted', {
                templateUrl: 'views/restricted.html',
                controller: 'RestrictedCtrl',
                resolve: {
                    authenticated: ['userService', function(userService){
                        return userService.authenticationStatus();
                    }],
                }
            })
            .when('/authRequired', {
                templateUrl: 'views/authrequired.html',
                controller: 'AuthrequiredCtrl',
                resolve: {
                    authenticated: ['userService', function(userService){
                        return userService.authenticationStatus(true);
                    }],
                }
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                //controller: 'homeCtrl',
                resolve: {
                    authenticated: ['userService', function(userService){
                        return userService.authenticationStatus(true);
                    }],
                }
            })

            .when('/friends', {
                templateUrl: 'views/friends.html',
                //controller: 'friendsCtrl',
                resolve: {
                    authenticated: ['userService', function(userService){
                        return userService.authenticationStatus(true);
                    }],
                }
            })

            .when('/contract', {
                templateUrl: 'views/contract.html',
                //controller: 'contractCtrl',
                resolve: {
                    authenticated: ['userService', function(userService){
                        return userService.authenticationStatus(true);
                    }],
                }
            })


            .otherwise({
                redirectTo: '/'
            });
    })
  .run(function(userService){
    //userService.initialize('http://128.189.254.186:8000/rest-auth', false);
        userService.initialize('http://192.168.1.67:8000/rest-auth', false);


  });
