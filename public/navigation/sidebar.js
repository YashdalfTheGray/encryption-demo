/* global angular */

angular.module('encryptionDemo')
.controller('SidebarCtrl',
    [
        '$state', '$mdSidenav',
        function($state) {
            "use strict";

            var vm = this;

            vm.goTo = function goToState(state) {
                $state.go(state);
                if(!$mdSidenav('services').isLockedOpen()) {
                    $mdSidenav('services').close();
                }
            };

            vm.demos = [
                { name: 'Demo', state: 'demo-state' }
            ];
        }
    ]
)