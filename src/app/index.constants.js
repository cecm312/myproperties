/* global malarkey:false, moment:false */
(function () {
  'use strict';

  angular
    .module('myproperties')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('FB_CONFIG', {
      apiKey: "AIzaSyCghgZ-p-Ek11XWf_OCRptlUcTqyA7KI0c",
      authDomain: "myproperties-c4a80.firebaseapp.com",
      databaseURL: "https://myproperties-c4a80.firebaseio.com",
      storageBucket: "myproperties-c4a80.appspot.com",
      messagingSenderId: "234749633393"
    })
    .constant('API', "http://localhost:3000");

})();
