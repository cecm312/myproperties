(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('PublicPropertiesController', PublicPropertiesController);

  /** @ngInject */
  function PublicPropertiesController($firebaseArray, $interval, AppF, $scope, FirebaseF, $q, FbStorage, toastr, $log, $state) {
    var vm = this;
    vm.F = AppF;
    vm.lang = "es";
    //other functions
    function init() {
      FirebaseF.loadList(["properties"]);
    }
    init();
  }
})();
