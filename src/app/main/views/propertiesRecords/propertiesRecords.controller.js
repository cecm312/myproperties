(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('PropertiesRecordsController', PropertiesRecordsController);

  /** @ngInject */
  function PropertiesRecordsController($firebaseArray, AppF, FirebaseF, $q, FbStorage, toastr, $log) {
    var vm = this;
    //variables
    vm.selected = [];
    vm.isOpen = false;
    //functions
    vm.go = go;
    vm.deleteProperty = deleteProperty;

    function go(property) {
      if (angular.isDefined(property) && typeof (property) == "object") {
        var params = {
          property: property,
          propertyId: property.$id
        }
        AppF.go("admin.properties.details", params);
      } else {
        AppF.go("admin.properties.details");
      }
    }

    function deleteImage(promise) {
      var deferred = $q.defer();
      promise.then(function () {
        deferred.resolve(true)
      }, function (error) {
        $log.log(error);
        deferred.resolve(true)
      })
      return deferred.promise;
    }

    function deleteProperty(properties) {
      var promises = [];
      var count = 0;
      angular.forEach(properties, function (property) {
        count++;
        var updates = {};
        angular.forEach(property.images, function (image) {
          promises.push(deleteImage(FbStorage.child('images/' + property.$id + '/' + image.name).delete()));
          updates["images/" + image.uid] = null;
        })

        updates["properties/" + property.$id] = null;
        updates["propertiesPrivate/" + property.$id] = null;
        $log.log(updates)
        promises.push(AppF.root.update(updates));
      })
      $q.all(promises).then(function () {
        vm.selected = [];
        toastr.info("Se eliminaron " + count + " propiedad(es)");
      });
    }

    //other functions
    function init() {
      FirebaseF.loadList(["saleTypes", "docTypes", "properties"]);
    }

    init();
  }
})();
