/* global angular */

angular.module('encryptionDemo')
.controller('ToolbarCtrl',
    [
        '$state', '$mdSidenav',
        function($state, $mdSidenav) {
            "use strict";

            var vm = this;

            vm.isHome = function() {
                return $state.is('home');
            };

            vm.showNav = function() {
                $mdSidenav('demo').toggle();
            };
        }
    ]
);