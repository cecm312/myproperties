(function() {
    'use strict';

    angular
        .module('myproperties')
        .filter('clearObject', clearObject)

    function clearObject() {

        return clearObjectFn;

        function clearObjectFn(object) {
            object = angular.copy(object);
            var newObject = {};
            angular.forEach(object, function(value, index) {
                switch (index) {
                    case "$priority":
                        break;
                    case "$id":
                        break;
                    case "$$conf":
                        break;
                    default:
                        newObject[index] = value;
                        break;
                }

            });
            return newObject;
        }
    }

}());