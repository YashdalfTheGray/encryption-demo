/* global angular */

angular.module('encryptionDemo')
.controller('EncryptionViewCtrl',
    [
        '$window', '$mdToast',
        function($window, $mdToast) {
            "use strict";

            var vm = this;

            vm.publicKey = $window.localStorage.getItem('openPGP.publicKey');
            vm.privateKey = $window.localStorage.getItem('openPGP.privateKey');

            if (vm.publicKey && vm.privateKey) {
                vm.enableEncryption = true;
            }
            else {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Keys need to be generated before encrypting.')
                    .position('top right')
                    .hideDelay(3000)
                );
            }
        }
    ]
)