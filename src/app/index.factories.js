(function () {
  'use strict';

  angular
    .module('myproperties')
    .factory("AuthF", AuthF)
    .factory("AppF", AppF)
    .factory("FirebaseF", FirebaseF)
    .factory("FbStorage", FbStorage);

  function AuthF($firebaseAuth) {
    return $firebaseAuth();
  }

  function FbStorage(firebase) {
    return firebase.storage().ref();
  }

  function AppF($state, firebase) {
    var obj = {
      siteName: "Propiedades <br> Puerto Morelos",
      langs: [{
          img: "http://imagenpng.com/wp-content/uploads/2015/09/Bandera_de_M%C3%A9xico_1934-1968.png",
          name: "es",
          displayName: "Español"
        },
        {
          img: "http://www.banderas-mundo.es/data/flags/ultra/us.png",
          name: "en",
          displayName: "English"
        }
      ],
      go: go,
      root: firebase.database().ref('/'),
      menu: [{
        icon: "label",
        name: "Propiedades",
        state: "admin.properties"
      }],
      publicMenu: [{
        state: "home.home",
        name: "home"
      }, {
        state: "home.map",
        name: "map"
      }, {
        state: "home.properties",
        name: "list"
      }, {
        state: "home.about",
        name: "about"
      }, 
      // {
      //   state: "home.faq",
      //   name: "faq"
      // }, 
      {
        state: "home.contact",
        name: "contact"
      }]
    };

    function go(state, params) {
      if (angular.isDefined(params) && typeof (params) == "object")
        $state.go(state, params);
      else
        $state.go(state);
    }

    return obj;
  }

  function FirebaseF($firebaseArray, AppF, firebase, $firebaseObject) {
    var obj = {
      loadList: loadList,
      prepareObject: prepareObject,
      loadObject: loadObject
    };

    function prepareObject(obj) {
      if (angular.isUndefined(obj.saved)) {
        obj.saved = {
          date: firebase.database.ServerValue.TIMESTAMP,
          user: firebase.auth().currentUser.uid
        }
      } else {
        obj.updated = {
          date: firebase.database.ServerValue.TIMESTAMP,
          user: firebase.auth().currentUser.uid
        }
      }
      return obj;
    }

    function loadNode(node) {
      if (angular.isUndefined(obj.lists)) obj.lists = {}
      if (angular.isUndefined(obj.lists[node])) obj.lists[node] = $firebaseArray(AppF.root.child(node));
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

    function loadObject(reference, id) {
      if (angular.isUndefined(obj.objects)) obj.objects = {};
      if (angular.isUndefined(obj.objects[reference])) obj.objects[reference] = {};
      if (id) {
        if (angular.isUndefined(obj.objects[reference][id])) obj.objects[reference][id] = $firebaseObject(AppF.root.child(reference).child(id));
        return obj.objects[reference][id]
      } else {
        obj.objects[reference] = $firebaseObject(AppF.root.child(reference));
        return obj.objects[reference]
      }

    }

    return obj;
  }

})();
