/* global angular */

angular.module('encryptionDemo')
.controller('GenerateKeysViewCtrl',
    [
        '$window', '$mdToast', 'clearInputSvc',
        function($window, $mdToast, clearInputSvc) {
            "use strict";

            var vm = this;
            var randomArray = new Uint32Array(8);
            var randomStrArray = [];

            vm.numberBits = 2048;

            function getSalt() {
                $window.crypto.getRandomValues(randomArray);
                _.forEach(randomArray, function(item) {
                    randomStrArray.push(item.toString(16));
                });
                return randomStrArray.join('');
            }

            vm.generate = function() {
                if (vm.numberBits && vm.email && vm.password) {
                    var options = {
                        numBits: vm.numberBits,
                        userId: vm.email,
                        passphrase: vm.password.toString() + getSalt()
                    };
                    $window.openpgp.generateKeyPair(options).then(function(keypair) {
                        $window.localStorage.setItem('openPGP.publicKey', keypair.publicKeyArmored);
                        $window.localStorage.setItem('openPGP.privateKey', keypair.privateKeyArmored);

                        vm.email = undefined;
                        vm.password = undefined;
                        clearInputSvc(['email-input', 'password-input']);

                        $mdToast.show(
                            $mdToast.simple()
                            .content('New keys have been generated!')
                            .position('top right')
                            .hideDelay(3000)
                        );

                        vm.refresh();
                    }).catch(function(error) {
                        console.log(error);
                    });
                }
                else {
                    $mdToast.show(
                        $mdToast.simple()
                        .content('Some information is missing!')
                        .position('top right')
                        .hideDelay(3000)
                    );
                }
            };

            vm.refresh = function() {
                vm.publicKey = $window.localStorage.getItem('openPGP.publicKey');
                vm.privateKey = $window.localStorage.getItem('openPGP.privateKey');
            }

            vm.clearKeys = function() {
                $window.localStorage.removeItem('openPGP.publicKey');
                $window.localStorage.removeItem('openPGP.privateKey');
                vm.publicKey = undefined;
                vm.privateKey = undefined;
            }
        }
    ]
);