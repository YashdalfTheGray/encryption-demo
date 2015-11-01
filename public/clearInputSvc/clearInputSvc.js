/* global angular */

angular.module('encryptionDemo')
.factory('clearInputSvc', 
    [
        function() {
            "use strict";

            function clearInput(inputId) {
                var inputBox = document.getElementById(inputId);
                if (inputBox !== null) {
                    inputBox.value = '';
                    angular.element(document.getElementById(inputId + '-container')).removeClass('md-input-has-value');
                }
            }

            function clearInputs(inputIdArray) {
                if (_.isArray(inputIdArray)) {
                    _.forEach(inputIdArray, function(item) {
                        clearInput(item);
                    });
                }
                else if (_.isString(inputIdArray)) {
                    clearInput(inputIdArray);
                }
            }

            return clearInputs;
        }
    ]
);