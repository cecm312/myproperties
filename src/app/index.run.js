(function () {
  'use strict';

  angular
    .module('myproperties')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope, $log, FB_CONFIG, firebase, $state) {
    firebase.initializeApp(FB_CONFIG);
    $log.debug('runBlock end');

    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
      // We can catch the error thrown when the $requireSignIn promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $state.go("login");
      }
    });
  }



})();
