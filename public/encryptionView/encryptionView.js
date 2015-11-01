/* global angular */

angular.module('encryptionDemo')
.controller('EncryptionViewCtrl',
    [
        '$window', '$firebaseArray', '$mdToast', 'clearInputSvc',
        function($window, $firebaseArray, $mdToast, clearInputSvc) {
            "use strict";

            var vm = this;
            var keysRef = new Firebase('https://encryption-demo.firebaseio.com/keys');
            var messagesRef = new Firebase('https://encryption-demo.firebaseio.com/messages');
            vm.keys = $firebaseArray(keysRef);

            vm.publicKey = $window.localStorage.getItem('openPGP.publicKey');
            vm.privateKey = $window.localStorage.getItem('openPGP.privateKey');

            if (vm.publicKey && vm.privateKey) {
                vm.enableEncryption = true;
            }
            else {
                $mdToast.show(
                    $mdToast.simple()
                    .content('Keys need to be generated before encrypting messages.')
                    .position('top right')
                    .hideDelay(3000)
                );
            }

            vm.encrypt = function() {
                var publicKey = $window.openpgp.key.readArmored(vm.recipient);

                openpgp.encryptMessage(publicKey.keys, vm.message).then(function(cipherText) {
                    var messageToPush = messagesRef.push();

                    messageToPush.set({ cipherText: cipherText });

                    $mdToast.show(
                        $mdToast.simple()
                        .content('Message encrypted and posted to firebase!')
                        .position('top right')
                        .hideDelay(3000)
                    );

                    vm.cipherText = cipherText;
                    vm.message = undefined;
                    clearInputSvc('message-input');
                }).catch(function(error) {
                    console.log(error);
                });
            };
        }
    ]
)