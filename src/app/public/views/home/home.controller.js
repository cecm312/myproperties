(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($firebaseArray, $interval, AppF, $scope, FirebaseF, $q, FbStorage, toastr, $log, $state) {
    var vm = this;
    vm.F = AppF;
    //other functions
    vm.slides = [{
        src: 'assets/images/w01.jpg'
      },
      {
        src: 'assets/images/w02.jpg'
      },
      {
        src: 'assets/images/w03.jpg'
      },
      {
        src: 'assets/images/w04.jpg'
      }
    ];

    function init() {
     
    }
    init();
  }
})();
