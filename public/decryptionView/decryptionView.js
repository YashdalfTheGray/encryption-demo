/* global angular */

angular.module('encryptionDemo')
.controller('DecryptionViewCtrl',
    [
        '$window', '$firebaseArray', '$mdToast', 'clearInputSvc',
        function($window, $firebaseArray, $mdToast, clearInputSvc) {
            "use strict";

            var vm = this;
            var messagesRef = new Firebase('https://encryption-demo.firebaseio.com/messages');
            vm.messages = $firebaseArray(messagesRef);

            vm.publicKey = $window.localStorage.getItem('openPGP.publicKey');
            vm.privateKey = $window.localStorage.getItem('openPGP.privateKey');

            if (vm.publicKey && vm.privateKey) {
                vm.enableDecryption = true;
            }
            else {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Keys need to be generated before decrypting messages.')
                    .position('top right')
                    .hideDelay(3000)
                );
            }

            vm.decrypt = function() {
                if(vm.message && vm.password) {
                    var privateKey = $window.openpgp.key.readArmored($window.localStorage.getItem('openPGP.privateKey')).keys[0];
                    privateKey.decrypt(vm.password);
                    vm.message = JSON.parse(vm.message);
                    
                    var pgpMessage = $window.openpgp.message.readArmored(vm.message.cipherText);

                    $window.openpgp.decryptMessage(privateKey, pgpMessage).then(function(plainText) {
                        vm.plainText = plainText;
                        vm.messages.$remove(vm.messages.$indexFor(vm.message.$id));

                        vm.password = undefined;
                        vm.message = undefined;
                        clearInputSvc('password-input');
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
        }
    ]
);