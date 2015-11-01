/* global angular */

angular.module('encryptionDemo')
.controller('SaltViewCtrl',
    [
        '$window',
        function($window) {
            "use strict";

            var vm = this;

            vm.complexity = 8;

            vm.generateSalt = function() {
                var randomArray = new Uint32Array(vm.complexity);
                var randomStrArray = [];
                
                $window.crypto.getRandomValues(randomArray);
                _.forEach(randomArray, function(item) {
                    randomStrArray.push(item.toString(16));
                });
                vm.salt = randomStrArray.join('');
            };
        }
    ]
);