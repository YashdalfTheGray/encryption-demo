/* global angular */

angular.module('encryptionDemo')
.controller('GenerateKeysViewCtrl',
    [
        '$window',
        function($window) {
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
                var options = {
                    numBits: vm.numberBits,
                    userId: vm.email,
                    passphrase: vm.password.toString() + getSalt()
                };
                $window.openpgp.generateKeyPair(options).then(function(keypair) {
                    $window.localStorage.setItem('openPGP.publicKey', keypair.publicKeyArmored);
                    $window.localStorage.setItem('openPGP.privateKey', keypair.privateKeyArmored);
                }).catch(function(error) {
                    console.log(error);
                });
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