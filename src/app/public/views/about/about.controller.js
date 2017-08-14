(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('AboutController', AboutController);

  /** @ngInject */
  function AboutController($firebaseArray, $interval, AppF, $scope, FirebaseF, $q, FbStorage, toastr, $log, $state) {
    var vm = this;
    vm.F = AppF;
    //other functions
    function init() {

    }
    init();
  }
})();
