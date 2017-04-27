(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('ContactController', ContactController);

  /** @ngInject */
  function ContactController($firebaseArray, $interval, AppF, $scope, FirebaseF, $q, FbStorage, toastr, $log, $state) {
    var vm = this;
    vm.F = AppF;
    //other functions
    function init() {
      
    }
    init();
  }
})();
