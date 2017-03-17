(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('PublicPropertyController', PublicPropertyController);

  /** @ngInject */
  function PublicPropertyController($firebaseArray, $interval, AppF, $scope, FirebaseF, $q, FbStorage, toastr, $log, $state) {
    var vm = this;
    vm.F = AppF;
    vm.lang = "es";
    vm.goSlide = goSlide;
    //other functions
    function init() {
      if ($state.params.property) {
        vm.property = $state.params.property;
        startSlide();
      } else if ($state.params.propertyId) {
        vm.property = FirebaseF.loadObject("properties", $state.params.propertyId).$loaded().then(function (property) {
          vm.property = property;
          startSlide();
        });
      }

    }

    function goSlide(direction) {
      var actualShow = false;
      var index = [];
      angular.forEach(vm.property.images, function (image, key) {
        index.push(key);
        if (image.show) {
          actualShow = index.length - 1;
        }
        vm.property.images[key].show = false;
      });
      if (index.length) {
        if (actualShow !== false) {
          var toShow = false;
          if (direction == "prev") {
            toShow = actualShow - 1;
            if (toShow < 0) {
              vm.property.images[index[index.length - 1]].show = true;
            } else {
              vm.property.images[index[toShow]].show = true;
            }
          } else {
            toShow = actualShow + 1;
            if (toShow >= index.length) {
              vm.property.images[index[0]].show = true;
            } else {
              vm.property.images[index[toShow]].show = true;
            }
          }
        } else {
          if (direction == "prev") {
            vm.property.images[index[index.length - 1]].show = true;
          } else {
            vm.property.images[index[0]].show = true;
          }
        }
      }
    }

    function startSlide() {
      goSlide()
      $interval(goSlide, 5000);
    }

    init();
  }
})();
