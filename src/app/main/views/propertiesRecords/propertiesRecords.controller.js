(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('PropertiesRecordsController', PropertiesRecordsController);

  /** @ngInject */
  function PropertiesRecordsController($firebaseArray, AppF,FirebaseF) {
    var vm = this;
    FirebaseF.loadList(["saleTypes", "docTypes", "properties"])
    vm.go = function (property) {
      if (angular.isDefined(property) && typeof (property) == "object") {
        var params = {
          property: property
        }
        AppF.go("admin.properties.details", params);
      } else {
        AppF.go("admin.properties.details");
      }
    }

  }
})();
