(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('PublicController', PublicController);

  /** @ngInject */
  function PublicController($timeout, webDevTec, $mdSidenav, toastr, AppF, firebase, $firebaseArray, clearObjectFilter, AuthF, FirebaseF, $log, $translate) {
    var vm = this;
    vm.lang = "es";
    vm.AuthF = AuthF;
    vm.F = AppF;
    vm.FBF = FirebaseF;
    vm.AuthF = AuthF;
    vm.loading = false;
    vm.toggleLeft = buildToggler('left');
    vm.toggleRight = buildToggler('right');
    vm.changeLanguage = changeLanguage;
    vm.toggleLeft = buildToggler('left');
    vm.toggleRight = buildToggler('right');

    var locationOptions = {
      enableHighAccuracy: true
    };
    vm.contactInformation = FirebaseF.loadObject("contactInformation");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, error, locationOptions);
    } else {
      $log.log("GPS not supported")
    }

    function changeLanguage(langKey) {
      $translate.use(langKey);
      vm.lang = langKey;
    }

    function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      };
    }

    function showPosition(position) {
      vm.mylocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    }

    function error(err) {
      $log.warn('ERROR(' + err.code + '): ' + err.message);
    }

    function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      };
    }
  }
})();
