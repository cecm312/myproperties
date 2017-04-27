(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('MapController', MapController);

  /** @ngInject */
  function MapController($firebaseArray, AppF, $scope, FirebaseF, $q, FbStorage, toastr, $log, NgMap, $state) {
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
        verifyId();
        verifyLocation();
      });
    }

    function verifyId() {
      var propertyId = $state.params.id;
      if (propertyId) {
        FirebaseF.lists.properties.$loaded().then(function () {
          angular.forEach(FirebaseF.lists.properties, function (property, index) {
            var active = false;
            if (property.$id == propertyId) {
              active = true;
            }
            if (property.gps) {
              FirebaseF.lists.properties[index].gps.active = active;
              if (active) {
                vm.lat = FirebaseF.lists.properties[index].gps.lat;
                vm.lng = FirebaseF.lists.properties[index].gps.lng;
                vm.map.setZoom(16)
              }
            }
          });
        });
      }
    }

    function verifyLocation() {
      var propertyId = $state.params.id;
      if (!propertyId) {
        var lng = $state.params.lng;
        var lat = $state.params.lat;
        if (lng && lat) {
          vm.lat = lat;
          vm.lng = lng;
        } else {
          var watcherLocation = $scope.$parent.$watch("main.mylocation", function (location) {
            if (location) {
              console.log(location);
              vm.lat = $scope.$parent.main.mylocation.lat;
              vm.lng = $scope.$parent.main.mylocation.lng;
              watcherLocation();
            }
          }, true);
        }
      }
    }

    function showDetail(e, property) {
      this.setAnimation(null);
      angular.forEach(FirebaseF.lists.properties, function (property, index) {
        if (property.gps)
          FirebaseF.lists.properties[index].gps.active = false;
      });
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
