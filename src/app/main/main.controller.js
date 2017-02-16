(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, AppF, firebase, $firebaseArray, clearObjectFilter, AuthF,FirebaseF) {
    var vm = this;
    vm.AuthF = AuthF;
    vm.F=AppF;
    vm.FBF=FirebaseF;
    vm.AuthF=AuthF;
    vm.loading = false;
  }
})();
