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
      .state('home', {
        url: '/',
        abstract: true,
        templateUrl: 'app/public/public.html',
        controller: 'PublicController',
        controllerAs: 'main',
        ncyBreadcrumb: {
          label: 'Inicio'
        }
      })
      .state('home.home', {
        url: 'home',
        views: {
          'content@home': {
            templateUrl: function () {
              return 'app/public/views/home/home.html';
            },
            controller: 'HomeController',
            controllerAs: 'homeCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Inicio'
        }
      })
      .state('home.map', {
        url: 'map?lat&lng&id',
        views: {
          'content@home': {
            templateUrl: function () {
              return 'app/public/views/map/map.html';
            },
            controller: 'MapController',
            controllerAs: 'mapCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Mapa'
        }
      })
      .state('home.about', {
        url: 'about',
        views: {
          'content@home': {
            templateUrl: function () {
              return 'app/public/views/about/about.html';
            },
            controller: 'AboutController',
            controllerAs: 'aboutCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Nosotros'
        }
      })
      // .state('home.faq', {
      //   url: 'faq',
      //   views: {
      //     'content@home': {
      //       templateUrl: function () {
      //         return 'app/public/views/faq/faq.html';
      //       },
      //       controller: 'FaqController',
      //       controllerAs: 'faqCtrl'
      //     }
      //   },
      //   ncyBreadcrumb: {
      //     label: 'FAQ'
      //   }
      // })
      .state('home.properties', {
        url: 'properties',
        views: {
          'content@home': {
            templateUrl: function () {
              return 'app/public/views/properties/properties.html';
            },
            controller: 'PublicPropertiesController',
            controllerAs: 'publicPropertiesCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Propiedades'
        }
      })
      .state('home.properties.detail', {
        url: '/detail/:propertyId',
        params: {
          property: false,
          propertyId: null
        },
        views: {
          'content@home': {
            templateUrl: function () {
              return 'app/public/views/properties/property.html';
            },
            controller: 'PublicPropertyController',
            controllerAs: 'publicPropertyCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Detalles'
        }
      })
      .state('home.contact', {
        url: 'contact',
        views: {
          'content@home': {
            templateUrl: function () {
              return 'app/public/views/contact/contact.html';
            },
            controller: 'ContactController',
            controllerAs: 'contactCtrl'
          }
        },
        ncyBreadcrumb: {
          label: 'Propiedades'
        }
      })
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
        params: {
          property: false,
          propertyId: null
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
    $urlRouterProvider.otherwise('/map');
  }

})();
