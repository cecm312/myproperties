(function () {
  'use strict';

  angular
    .module('myproperties')
    .factory("Auth", Auth);

  function Auth($firebaseAuth) {
    return $firebaseAuth();
  }

})();
