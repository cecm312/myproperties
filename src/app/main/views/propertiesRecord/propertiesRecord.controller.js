(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('PropertiesRecordController', PropertiesRecordController);

  /** @ngInject */
  function PropertiesRecordController($scope, AppF, clearObjectFilter, toastr, $state, FirebaseF) {
    var vm = this;
    var init = function () {
      if ($state.params.property) {
        vm.property = $state.params.property;
      } else {
        vm.property = vm.blancProperty;
      }
      FirebaseF.loadList(["saleTypes", "docTypes"])
    }

    vm.blancProperty = {
      owners: [{}],
      intermediaries: []
    };
    vm.goBack = function () {
      AppF.go("admin.properties");
    }
    vm.addRow = function (element) {
      vm.property[element].push({});
    }
    vm.deleteRow = function (element, index) {
      vm.property[element].splice(index, 1);
    }
    vm.addElement = function (ruta) {
      vm.loading = true;
      var object = "";
      switch (ruta) {
        case "docType":
          object = "newDocType"
          break;
        case "saleType":
          object = "newSaleType"
          break;
      }
      AppF.root.child(ruta + "s").push(vm[object]).then(function (snap) {
        var id = snap.key;
        switch (ruta) {
          case "docType":
            vm.property.docType = id;
            vm.addingDocType = false;
            vm.newDocType = {};
            break;
          case "saleType":
            vm.property.saleType = id;
            vm.addingSaleType = false;
            vm.newSaleType = {};
            break;
        }
        vm.loading = false;
      });
    }
    var saveProperty = function (property) {
      if (angular.isDefined(property.$id)) {
        return AppF.root.child("properties/" + property.$id).update(clearObjectFilter(property));
      } else {
        return AppF.root.child("properties").push(clearObjectFilter(property));
      }
    }
    vm.saveProperty = function (property) {
      saveProperty(property).then(function () {
        toastr.info("Se guardo la propiedad");
        vm.showPropertyForm = false;
        vm.property = vm.blancProperty;
      });
    }

    $scope.$watch(function () {
      return vm.property.saleType;
    }, function (current) {
      if (current && current == "add") {
        vm.addingSaleType = true;
        delete vm.property.saleType;
      }
    });

    $scope.$watch(function () {
      return vm.property.docType;
    }, function (current) {
      if (current && current == "add") {
        vm.addingDocType = true;
        delete vm.property.docType;
      }
    });

    init();

  }
})();
