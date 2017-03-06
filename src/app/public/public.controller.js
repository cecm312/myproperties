(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('PublicController', PublicController);

  /** @ngInject */
  function PublicController($timeout, webDevTec, $mdSidenav, toastr, AppF, firebase, $firebaseArray, clearObjectFilter, AuthF, FirebaseF) {
    var vm = this;
    vm.lang = "es";
    vm.AuthF = AuthF;
    vm.F = AppF;
    vm.FBF = FirebaseF;
    vm.AuthF = AuthF;
    vm.loading = false;
    vm.toggleLeft = buildToggler('left');
    vm.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      };
    }
  }
})();
