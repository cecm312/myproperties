(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('PropertiesRecordController', PropertiesRecordController);

  /** @ngInject */
  function PropertiesRecordController($scope, $mdDialog, AppF, clearObjectFilter, toastr, $state, FirebaseF, $log, FbStorage, $q, fileExtensionFilter) {
    var vm = this;
    vm.editGps = false;
    var init = function () {
      if ($state.params.property) {
        vm.property = $state.params.property;
      } else {
        vm.property = vm.blancProperty;
      }
      FirebaseF.loadList(["saleTypes", "docTypes"])
    }

    vm.openAddDialog = function (obj) {
      var title = "";
      switch (obj.object) {
        case "saleType":
          title = "Añadir nuevo tipo de venta";
          break;
        case "docType":
          title = "Añadir nuevo tipo de documento";
          break;
      }
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.prompt()
        .title(title)
        .placeholder('Nombre')
        .ariaLabel(title)
        .ok('Aceptar')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function (result) {
        var objToSave = {
          name: result
        };
        vm.addElement(objToSave, obj);
      });
    };

    vm.addElement = function (object, localReferences) {
      AppF.loading = true;
      object = FirebaseF.prepareObject(object);
      //console.log(object, localReferences.reference)
      AppF.root.child(localReferences.reference).push(object).then(function (snap) {
        var id = snap.key;
        vm.property[localReferences.object] = id;
        AppF.loading = false;
        toastr.info("Se añadio elemento con exito");
      });
    }

    vm.saveText = "Guardar Propiedad";
    vm.blancProperty = {
      owners: [{}],
      intermediaries: []
    };
    vm.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCyA-BPAOyFhVGBMCXS9fB5Yc6Dioh2360";
    vm.deleteImage = function (index, array) {
      array.splice(index, 1);
    }
    vm.addMarker = function (event) {
      if (vm.editGps) {
        var ll = event.latLng;
        vm.property.gps = {
          lat: ll.lat(),
          lng: ll.lng()
        }
      }
    }
    vm.goBack = function () {
      AppF.go("admin.properties");
    }
    vm.addRow = function (element) {
      vm.property[element].push({});
    }
    vm.deleteRow = function (element, index) {
      vm.property[element].splice(index, 1);
    }

    vm.deletePropertyImage = function (imageObj, propertyId) {
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

    var uploadFile = function (uploadTask) {
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
    var saveProperty = function (property) {
      var deferred = $q.defer();
      var promise = "";
      property = FirebaseF.prepareObject(property);
      if (angular.isDefined(property.$id)) {
        promise = AppF.root.child("properties/" + property.$id).update(clearObjectFilter(property));
      } else {
        promise = AppF.root.child("properties").push(clearObjectFilter(property));
      }
      promise.then(function (data) {
        $log.log(data, property);
        if (angular.isUndefined(property.$id)) vm.property.$id = data.key;
        $log.log(vm.files, angular.isDefined(vm.files));
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
    vm.saveProperty = function (property, files) {
      $log.log(files);
      AppF.loading = true;
      vm.saveText = "Guardando...";
      saveProperty(property).then(function (data) {
        toastr.info("Se guardo la propiedad");
        AppF.loading = false;
        vm.goBack();
      }, function (error) {
        toastr.warning(error);
      });
    }

    vm.verifyAddOption = function (element) {
      if (typeof (element) == "object") {
        if (element.action == "add") {
          delete vm.property[element.object];
          vm.openAddDialog(element);
        }
      }


    };

    init();

  }
})();
