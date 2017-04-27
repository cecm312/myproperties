(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('PropertiesRecordController', PropertiesRecordController);

  /** @ngInject */
  function PropertiesRecordController(NgMap, $scope, $mdDialog, AppF, clearObjectFilter, toastr, $state, FirebaseF, $log, FbStorage, $q, fileExtensionFilter) {
    var vm = this;
    //variables
    vm.editGps = false;
    vm.saveText = "Guardar Propiedad";
    vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCyA-BPAOyFhVGBMCXS9fB5Yc6Dioh2360";
    vm.blancProperty = {};
    vm.blancPropertyPrivate = {
      owners: [{}],
      intermediaries: []
    };

    vm.mylocation = false;

    //functions in scope
    vm.openAddDialog = openAddDialog;
    vm.addElement = addElement;
    vm.deleteImage = deleteImage;
    vm.addMarker = addMarker;
    vm.goBack = goBack;
    vm.addRow = addRow;
    vm.deleteRow = deleteRow;
    vm.deletePropertyImage = deletePropertyImage;
    vm.saveProperty = saveProperty
    vm.verifyAddOption = verifyAddOption
    vm.centerLocation = centerLocation;
    vm.editLocation = editLocation;

    var locationOptions = {
      enableHighAccuracy: true
    };

    function openAddDialog(obj) {
      var title = "";
      switch (obj.object) {
        case "saleType":
          title = "Añadir nuevo tipo de venta";
          break;
        case "docType":
          title = "Añadir nuevo tipo de documento";
          break;
      }
      var confirm = $mdDialog.prompt()
        .title(title)
        .placeholder('Nombre')
        .ariaLabel(title)
        .ok('Aceptar')
        .cancel('Cancelar');
      $mdDialog.show(confirm).then(function (result) {
        var objToSave = {};
        objToSave[$scope.$parent.main.lang] = {
          name: result
        }
        vm.addElement(objToSave, obj);
      });
    }

    function addElement(object, localReferences) {
      AppF.loading = true;
      object = FirebaseF.prepareObject(object);
      AppF.root.child(localReferences.reference).push(object).then(function (snap) {
        
      });
    }

    function deleteImage(index, array) {
      array.splice(index, 1);
    }

    function addMarker(event) {
      if (vm.editGps) {
        var ll = event.latLng;
        vm.property.gps = {
          lat: ll.lat(),
          lng: ll.lng()
        }
      }
    }

    function goBack() {
      AppF.go("admin.properties");
    }

    function addRow(element, node) {
      vm[node][element].push({});
    }

    function deleteRow(element, index, node) {
      vm[node][element].splice(index, 1);
    }

    function deletePropertyImage(imageObj, propertyId) {
      // Create a reference to the file to delete
      var image = FbStorage.child('images/' + propertyId + '/' + imageObj.name);
      // Delete the file
      image.delete().then(function () {
        // File deleted successfully
        var updates = {};
        updates["images/" + imageObj.uid] = null;
        updates["properties/" + propertyId + "/images/" + imageObj.uid] = null;
        AppF.root.update(updates).then(function () {
          toastr.info("Se elimino la imagen");
        }, function (error) {
          $log.log(error);
        });
      }).catch(function (error) {
        $log.log(error);
      });
    }

    function saveProperty(property, propertyPrivate) {
      AppF.loading = true;
      vm.saveText = "Guardando...";
      savePropertyFB(property, propertyPrivate).then(function (data) {
        toastr.info("Se guardo la propiedad");
        $log.log(data);
        AppF.loading = false;
        vm.goBack();
      }, function (error) {
        toastr.warning(error);
      });
    }

    function verifyAddOption(element) {
      if (typeof (element) == "object") {
        if (element.action == "add") {
          delete vm[element.node][element.object];
          vm.openAddDialog(element);
        }
      }
    }

    function centerLocation() {
      vm.map.setCenter(vm.mylocation);
    }

    function editLocation() {
      vm.editGps = !vm.editGps
    }

    //other functions
    function uploadFile(uploadTask) {
      var deferred = $q.defer();
      var resp = {
        status: false
      };
      uploadTask.on('state_changed', function () {
        // uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
      }, function (error) {
        resp.error = error;
        deferred.resolve(resp);
      }, function () {
        resp.status = true;
        resp.url = uploadTask.snapshot.downloadURL;
        deferred.resolve(resp);
      });
      return deferred.promise;
    }

    function savePropertyFB(property, propertyPrivate) {
      var deferred = $q.defer();
      var promises = [];
      var propertyId = "";
      property = FirebaseF.prepareObject(property);
      propertyPrivate = FirebaseF.prepareObject(propertyPrivate);
      if (angular.isDefined(property.$id)) {
        propertyId = property.$id;
      } else {
        propertyId = AppF.root.child('properties').push().key;
      }
      promises.push(AppF.root.child("properties/" + propertyId).update(clearObjectFilter(property)));
      promises.push(AppF.root.child("propertiesPrivate/" + propertyId).update(clearObjectFilter(propertyPrivate)));
      $q.all(promises).then(function (data) {
        if (angular.isUndefined(property.$id)) vm.property.$id = propertyId
        if (angular.isDefined(vm.files)) {
          var filesReferences = {};
          var uploadTasks = {};
          angular.forEach(vm.files, function (file, index) {
            var imageId = AppF.root.child('images').push().key;
            var newName = imageId + "." + fileExtensionFilter(file.name);
            filesReferences[index] = {
              id: imageId,
              index: index,
              originalName: file.name,
              newName: newName
            };
            uploadTasks[index] = uploadFile(FbStorage.child('images/' + vm.property.$id + '/' + newName).put(file));
          })
          $q.all(uploadTasks).then(function (resp) {
            var updates = {};
            angular.forEach(resp, function (data, index) {
              if (data.status) {
                var imageId = filesReferences[index].id;
                delete filesReferences[index].id;
                filesReferences[index].url = data.url;
                updates["images/" + imageId] = filesReferences[index];
                updates["properties/" + property.$id + "/images/" + imageId] = {
                  url: data.url,
                  name: filesReferences[index].newName,
                  uid: imageId
                };
              }
              vm.files.splice(index, 1);
            })
            $log.log(updates);
            AppF.root.update(updates).then(function () {
              deferred.resolve(data);
            }, function (error) {
              deferred.reject(error);
            });
          });
          deferred.resolve(data);
        } else {
          deferred.resolve(data);
        }

      }, function (error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function error(err) {
      $log.warn('ERROR(' + err.code + '): ' + err.message);
    }

    function showPosition(position) {
      $log.log(position);
      vm.mylocation = new google.maps.LatLng(position.coords.latitude, position.coords.latitude);
    }

    function init() {
      if ($state.params.property) {
        vm.property = $state.params.property;
        vm.propertyPrivate = FirebaseF.loadObject("propertiesPrivate", vm.property.$id);
      } else if ($state.params.propertyId) {
        vm.property = FirebaseF.loadObject("properties", $state.params.propertyId);
        vm.property.$loaded().then(function () {
          vm.propertyPrivate = FirebaseF.loadObject("propertiesPrivate", vm.property.$id);
        });
      } else {
        vm.property = vm.blancProperty;
        vm.propertyPrivate = vm.blancPropertyPrivate;
      }
      FirebaseF.loadList(["saleTypes", "docTypes"])

      NgMap.getMap().then(function (map) {
        vm.map = map;
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, error, locationOptions);
      } else {
        $log.log("GPS not supported")
      }
    }

    //se inicia la carga
    init();
  }
})();
