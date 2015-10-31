/* global angular */

angular.module('encryptionDemo')
.controller('SidebarCtrl',
    [
        '$state', '$mdSidenav',
        function($state, $mdSidenav) {
            "use strict";

            var vm = this;

            vm.goTo = function goToState(state) {
                $state.go(state);
                if(!$mdSidenav('demo').isLockedOpen()) {
                    $mdSidenav('demo').close();
                }
            };

            vm.demos = [
                { name: 'Generate Keys', state: 'generate-keys' }
            ];
        }
    ]
)