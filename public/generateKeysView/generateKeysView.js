/* global angular */

angular.module('encryptionDemo')
.controller('GenerateKeysViewCtrl',
    [
        '$window', '$q', '$mdToast', 'clearInputSvc',
        function($window, $q, $mdToast, clearInputSvc) {
            "use strict";

            var vm = this;
            var keysRef = new Firebase('https://encryption-demo.firebaseio.com/keys/');

            vm.numberBits = 2048;

            function getKeys(bits, user, passphrase) {
                var options = {
                    numBits: bits,
                    userId: user,
                    passphrase: passphrase
                };
                return $window.openpgp.generateKeyPair(options);
            }

            vm.generate = function() {
                if (vm.numberBits && vm.email && vm.password) {
                    getKeys(vm.numberBits, vm.email, vm.password).then(function(keypair) {
                        $window.localStorage.setItem('openPGP.publicKey', keypair.publicKeyArmored);
                        $window.localStorage.setItem('openPGP.privateKey', keypair.privateKeyArmored);

                        vm.email = undefined;
                        vm.password = undefined;
                        vm.name = undefined;
                        clearInputSvc(['email-input', 'password-input', 'name-input']);

                        $mdToast.show(
                            $mdToast.simple()
                            .content('New keys have been generated!')
                            .position('top right')
                            .hideDelay(3000)
                        );
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

            vm.publish = function() {
                if (vm.numberBits && vm.email && vm.password && vm.name) {
                    getKeys(vm.numberBits, vm.email, vm.password).then(function(keypair) {
                        var keyToPush = keysRef.push();

                        $window.localStorage.setItem('openPGP.publicKey', keypair.publicKeyArmored);
                        $window.localStorage.setItem('openPGP.privateKey', keypair.privateKeyArmored);

                        keyToPush.set({
                            name: vm.name,
                            publicKey: $window.localStorage.getItem('openPGP.publicKey')
                        });

                        vm.email = undefined;
                        vm.password = undefined;
                        vm.name = undefined;
                        clearInputSvc(['email-input', 'password-input', 'name-input']);

                        $mdToast.show(
                            $mdToast.simple()
                            .content('Key generated and published to firebase successfully.')
                            .position('top right')
                            .hideDelay(3000)
                        );
                        vm.nickname = undefined;
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
            };

            vm.clearKeys = function() {
                $window.localStorage.removeItem('openPGP.publicKey');
                $window.localStorage.removeItem('openPGP.privateKey');
                vm.publicKey = undefined;
                vm.privateKey = undefined;
            };
        }
    ]
);