(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('FaqController', FaqController);

  /** @ngInject */
  function FaqController($firebaseArray, $interval, AppF, $scope, FirebaseF, $q, FbStorage, toastr, $log, $state) {
    var vm = this;
    vm.F = AppF;
    //other functions
    function init() {

    }
    init();
  }
})();
