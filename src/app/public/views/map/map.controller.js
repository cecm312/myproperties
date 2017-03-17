(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('MapController', MapController);

  /** @ngInject */
  function MapController($firebaseArray, AppF, $scope, FirebaseF, $q, FbStorage, toastr, $log, NgMap) {
    var vm = this;
    vm.positions = {};
    vm.FBF = FirebaseF;
    vm.showDetail = showDetail;
    vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCyA-BPAOyFhVGBMCXS9fB5Yc6Dioh2360";
    //other functions
    function init() {
      FirebaseF.loadList(["properties"]);
      NgMap.getMap().then(function (map) {
        vm.map = map;
      });

    }

    function showDetail(e, property) {
      vm.propertySelected = property;
      vm.map.showInfoWindow('foo-iw', property.$id);
    }

    // $scope.$watch(function () {
    //   return vm.FBF.properties
    // }, function (properties) {
    //   if (properties) {
    //     if (propertes.length) {
    //       angular.forEach(properties, function (property) {
    //         if (property.gps) {
    //           vm[property.$id]=pr
    //         }
    //       })
    //     }
    //   }
    // });

    init();
  }
})();
