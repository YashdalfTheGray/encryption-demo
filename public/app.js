/* global angular */
/* global _ */

angular.module('encryptionDemo', 
    [
        'ui.router',
        'ngAnimate',
        'ngMaterial',
        'firebase'
    ]
)
.config([
        '$urlRouterProvider', '$stateProvider', '$mdThemingProvider',
        function($urlRouterProvider, $stateProvider, $mdThemingProvider) {
            "use strict";

            $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'homeView/homeView.tpl.html',
                controller: 'HomeViewCtrl as ctrl'
            })
            .state('generate-keys', {
                url: '/generate',
                templateUrl: 'generateKeysView/generateKeysView.tpl.html',
                controller: 'GenerateKeysViewCtrl as ctrl'
            })
            .state('encrypt', {
                url: '/encrypt',
                templateUrl: 'encryptionView/encryptionView.tpl.html',
                controller: 'EncryptionViewCtrl as ctrl'
            })
            .state('decrypt', {
                url: '/decrypt',
                templateUrl: 'decryptionView/decryptionView.tpl.html',
                controller: 'DecryptionViewCtrl as ctrl'
            });
            $urlRouterProvider.otherwise('/');

            $mdThemingProvider.theme('default')
                .primaryPalette('blue-grey')
                .accentPalette('amber',{
                    'default': 'A400',
                    'hue-1': 'A700'
                })
                .warnPalette('red');
        }
])
