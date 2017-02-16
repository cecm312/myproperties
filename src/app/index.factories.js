(function () {
  'use strict';

  angular
    .module('myproperties')
    .factory("AuthF", AuthF)
    .factory("AppF", AppF)
    .factory("FirebaseF", FirebaseF);

  function AuthF($firebaseAuth) {
    return $firebaseAuth();
  }

  function AppF($state, firebase) {
    var obj = {
      go: go,
      root: firebase.database().ref('/')
    };

    function go(state, params) {
      if (angular.isDefined(params) && typeof (params) == "object")
        $state.go(state, params);
      else
        $state.go(state);
    }
    return obj;
  }

  function FirebaseF($firebaseArray, AppF) {
    var obj = {
      loadList: loadList
    };

    function loadNode(node) {
      if (angular.isUndefined(obj[node])) obj[node] = $firebaseArray(AppF.root.child(node));
    }

    function loadList(item) {
      switch (typeof (item)) {
        case "object":
          angular.forEach(item, function (ob) {
            loadNode(ob)
          });
          break;
        case "string":
          loadNode(item)
          break;
      }
    }

    return obj;
  }

})();
