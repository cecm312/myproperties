(function () {
  'use strict';

  angular
    .module('myproperties')
    .factory("Auth", Auth)
    .factory("AppF", AppF);

  function Auth($firebaseAuth) {
    return $firebaseAuth();
  }

  function AppF() {
    var obj = {
      
    };
    return obj;
  }

})();
