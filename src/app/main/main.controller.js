(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr, AppF, firebase, $firebaseArray,clearObjectFilter) {

    AppF.root = firebase.database().ref('/');

    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1485298545181;
    vm.showToastr = showToastr;
    vm.saleTypes = $firebaseArray(AppF.root.child("saleTypes"));
    vm.docTypes = $firebaseArray(AppF.root.child("docTypes"));
    vm.properties = $firebaseArray(AppF.root.child("properties"));
    vm.blancProperty = {
      owners: [{}],
      intermediaries: []
    };
    vm.property = vm.blancProperty;
    vm.addRow = function (element) {
      vm.property[element].push({});
    }
    vm.loading=false;

    vm.deleteRow = function (element, index) {
      console.log(element, index, vm.property[element])

      vm.property[element].splice(index, 1);;
    }

    vm.addElement = function (ruta) {
      console.log(ruta);
      vm.loading=true;
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
        vm.loading=false;
      });
    }

    vm.editProperty = function (property) {
      vm.showPropertyForm = true;
      vm.property = property;
    }

    vm.addProperty = function () {
      console.log("asdasd");
      vm.showPropertyForm = true;
      vm.property = vm.blancProperty;
    }

    var saveProperty = function (property) {
      if (angular.isDefined(property.$id)) {
        return vm.properties.$save(property.$id);
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



    activate();

    function activate() {
      getWebDevTec();
      $timeout(function () {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();
      angular.forEach(vm.awesomeThings, function (awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
