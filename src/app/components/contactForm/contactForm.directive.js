(function () {
  'use strict';

  angular
    .module('myproperties')
    .directive('contactForm', contactForm);

  /** @ngInject */
  function contactForm() {
    var directive = {
      restrict: "E",
      scope: {
        subject: '@'
      },
      templateUrl: "app/components/contactForm/contactForm.html",
      controller: "ContactFormController"
    };


    return directive;
  }

})();
