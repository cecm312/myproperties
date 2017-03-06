(function () {
  'use strict';

  angular
    .module('myproperties')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider, $translatePartialLoaderProvider, $translateProvider) {
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '{part}/i18n/{lang}.json'
    });
    $translateProvider.preferredLanguage('es');
    //$translateProvider.useSanitizeValueStrategy('sanitize');

    $translatePartialLoaderProvider.addPart('app');

    $locationProvider.html5Mode(true);
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: {
          "currentAuthF": ["AuthF", function (AuthF) {
            return AuthF.$requireSignIn();
          }]
        }
      })
      .state('admin.properties', {
        url: '/properties',
        views: {
          'content@admin': {
            templateUrl: function () {
              return 'app/main/views/propertiesRecords/propertiesRecords.html';
            },
            controller: 'PropertiesRecordsController',
            controllerAs: 'propertiesCtrl'
          }
        },
        resolve: {
          "currentAuthF": ["AuthF", function (AuthF) {
            return AuthF.$requireSignIn();
          }]
        }
      })
      .state('admin.properties.details', {
        url: '/details/:propertyId',
        params:{
          property:false,
          propertyId:null
        },
        views: {
          'content@admin': {
            templateUrl: function () {
              return 'app/main/views/propertiesRecord/propertiesRecord.html';
            },
            controller: 'PropertiesRecordController',
            controllerAs: 'propertyCtrl'
          }
        },
        resolve: {
          "currentAuthF": ["AuthF", function (AuthF) {
            return AuthF.$requireSignIn();
          }]
        }
      })

      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'main'
      });
    $urlRouterProvider.otherwise('/admin/properties');
  }

})();
