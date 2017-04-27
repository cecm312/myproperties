(function () {
  'use strict';

  angular
    .module('myproperties')
    .filter('getImageOfProperty', getImageOfProperty)

  function getImageOfProperty() {

    return getImageOfPropertyFn;

    function getImageOfPropertyFn(images) {
      var image = "http://img2.wikia.nocookie.net/__cb20120819040410/naruto/es/images/8/84/Sin_imagen_disponible.jpg";
      if (images) {
        angular.forEach(images, function (img) {
          if (img.default) {
            image = img.url;
            return true;
          }
          image = img.url;
        });
      }
      return image;
    }
  }

}());
