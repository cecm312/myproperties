(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, $mdSidenav, toastr, AppF, firebase, $firebaseArray, clearObjectFilter, AuthF, FirebaseF, $translate) {
    var vm = this;
    vm.lang = "es";
    vm.AuthF = AuthF;
    vm.F = AppF;
    vm.FBF = FirebaseF;
    vm.AuthF = AuthF;
    vm.loading = false;
    vm.toggleLeft = buildToggler('left');
    vm.changeLanguage = changeLanguage;

    function changeLanguage(langKey) {
      $translate.use(langKey);
      vm.lang = langKey;
    }

    function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      };
    }
  }
})();
