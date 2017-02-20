(function () {
  'use strict';

  angular
    .module('myproperties')
    .filter('fileExtension', fileExtension)

  function fileExtension() {

    return fileExtensionFn;

    function fileExtensionFn(filename) {
      return filename.split('.').pop();
    }
  }

}());
