(function () {
  'use strict';

  angular
    .module('myproperties')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $qProvider, $mdThemingProvider) {
    // Enable log

    $qProvider.errorOnUnhandledRejections(false);
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
    $mdThemingProvider.theme('default').primaryPalette('brown').accentPalette('orange');
  }

})();
