(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($timeout, toastr, $firebaseAuth, $log,$state) {
    var vm = this;
    var auth = $firebaseAuth();

    vm.classAnimation = '';
    vm.showToastr = showToastr;
    vm.signIn = signIn;

    activate();

    function signIn() {
      vm.firebaseUser = null;
      vm.error = null;
      auth.$signInWithEmailAndPassword(vm.formData.email, vm.formData.password).then(function (firebaseUser) {
        vm.firebaseUser = firebaseUser;
        $state.go("home");
      }).catch(function (error) {
        vm.error = error;
        $log.log(error);
        showToastrWarning(error.message)
      });
    }

    function activate() {
      $timeout(function () {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function showToastrWarning(msg) {
      toastr.error(msg);
      vm.classAnimation = '';
    }


  }
})();
