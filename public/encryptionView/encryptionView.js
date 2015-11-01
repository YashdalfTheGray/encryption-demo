/* global angular */

angular.module('encryptionDemo')
.controller('EncryptionViewCtrl',
    [
        '$window', '$firebaseObject', '$mdToast', 'clearInputSvc',
        function($window, $firebaseObject, $mdToast, clearInputSvc) {
            "use strict";

            var vm = this;
            var keysRef = new Firebase('https://encryption-demo.firebaseio.com/keys');
            var messagesRef = new Firebase('https://encryption-demo.firebaseio.com/messages');
            vm.serverKeys = $firebaseObject(keysRef);

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

            vm.encrypt = function() {
                var publicKey = $window.openpgp.key.readArmored(vm.serverKeys.public);
                console.log(publicKey);

                openpgp.encryptMessage(publicKey.keys, vm.message).then(function(cipherText) {
                    console.log(vm.message);
                    var messageToPush = messagesRef.push();

                    messageToPush.set({ cipherText: cipherText });

                    vm.cipherText = cipherText;
                    clearInputSvc('message-input');
                    console.log(vm.cipherText);
                }).catch(function(error) {
                    console.log(error);
                });
            };
        }
    ]
)