!function(){"use strict";angular.module("myproperties",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","pascalprecht.translate","ngAria","ui.router","ngMaterial","toastr","firebase"])}(),function(){"use strict";function e(){function e(){return t}var t=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Less",url:"http://lesscss.org/",description:"Less extends the CSS language, adding features that allow variables, mixins, functions and many other techniques.",logo:"less.png"}];this.getTec=e}angular.module("myproperties").service("webDevTec",e)}(),function(){"use strict";function e(){function e(e){var t=this;t.relativeDate=e(t.creationDate).fromNow()}e.$inject=["moment"];var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:e,controllerAs:"vm",bindToController:!0};return t}angular.module("myproperties").directive("acmeNavbar",e)}(),function(){"use strict";function e(e){function t(t,n,a,o){var r,i=e(n[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});n.addClass("acme-malarkey"),angular.forEach(t.extraValues,function(e){i.type(e).pause()["delete"]()}),r=t.$watch("vm.contributors",function(){angular.forEach(o.contributors,function(e){i.type(e.login).pause()["delete"]()})}),t.$on("$destroy",function(){r()})}function n(e,t){function n(){return a().then(function(){e.info("Activated Contributors View")})}function a(){return t.getContributors(10).then(function(e){return o.contributors=e,o.contributors})}var o=this;o.contributors=[],n()}n.$inject=["$log","githubContributor"];var a={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:t,controller:n,controllerAs:"vm"};return a}e.$inject=["malarkey"],angular.module("myproperties").directive("acmeMalarkey",e)}(),function(){"use strict";function e(e,t){function n(n){function o(e){return e.data}function r(t){e.error("XHR Failed for getContributors.\n"+angular.toJson(t.data,!0))}return n||(n=30),t.get(a+"/contributors?per_page="+n).then(o)["catch"](r)}var a="https://api.github.com/repos/Swiip/generator-gulp-angular",o={apiHost:a,getContributors:n};return o}e.$inject=["$log","$http"],angular.module("myproperties").factory("githubContributor",e)}(),function(){"use strict";function e(e,t,n,a,o,r,i,l){function m(){d(),e(function(){p.classAnimation="rubberBand"},4e3)}function s(){n.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),p.classAnimation=""}function d(){p.awesomeThings=t.getTec(),angular.forEach(p.awesomeThings,function(e){e.rank=Math.random()})}a.root=o.database().ref("/");var p=this;p.Auth=l,p.awesomeThings=[],p.classAnimation="",p.creationDate=1485298545181,p.showToastr=s,p.saleTypes=r(a.root.child("saleTypes")),p.docTypes=r(a.root.child("docTypes")),p.properties=r(a.root.child("properties")),p.blancProperty={owners:[{}],intermediaries:[]},p.property=p.blancProperty,p.addRow=function(e){p.property[e].push({})},p.loading=!1,p.deleteRow=function(e,t){console.log(e,t,p.property[e]),p.property[e].splice(t,1)},p.addElement=function(e){console.log(e),p.loading=!0;var t="";switch(e){case"docType":t="newDocType";break;case"saleType":t="newSaleType"}a.root.child(e+"s").push(p[t]).then(function(t){var n=t.key;switch(e){case"docType":p.property.docType=n,p.addingDocType=!1,p.newDocType={};break;case"saleType":p.property.saleType=n,p.addingSaleType=!1,p.newSaleType={}}p.loading=!1})},p.editProperty=function(e){p.showPropertyForm=!0,p.property=e},p.addProperty=function(){console.log("asdasd"),p.showPropertyForm=!0,p.property=p.blancProperty};var c=function(e){return angular.isDefined(e.$id)?p.properties.$save(e.$id):a.root.child("properties").push(i(e))};p.saveProperty=function(e){c(e).then(function(){n.info("Se guardo la propiedad"),p.showPropertyForm=!1,p.property=p.blancProperty})},m()}e.$inject=["$timeout","webDevTec","toastr","AppF","firebase","$firebaseArray","clearObjectFilter","Auth"],angular.module("myproperties").controller("MainController",e)}(),function(){"use strict";function e(e,t,n,a,o){function r(){s.firebaseUser=null,s.error=null,d.$signInWithEmailAndPassword(s.formData.email,s.formData.password).then(function(e){s.firebaseUser=e,o.go("home")})["catch"](function(e){s.error=e,a.log(e),m(e.message)})}function i(){e(function(){s.classAnimation="rubberBand"},4e3)}function l(){t.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),s.classAnimation=""}function m(e){t.error(e),s.classAnimation=""}var s=this,d=n();s.classAnimation="",s.showToastr=l,s.signIn=r,i()}e.$inject=["$timeout","toastr","$firebaseAuth","$log","$state"],angular.module("myproperties").controller("LoginController",e)}(),function(){"use strict";function e(){function e(e){e=angular.copy(e);var t={};return angular.forEach(e,function(e,n){switch(n){case"$priority":break;case"$id":break;case"$$conf":break;default:t[n]=e}}),t}return e}angular.module("myproperties").filter("clearObject",e)}(),function(){"use strict";function e(e,t,n,a,o){a.initializeApp(n);var r=a.auth();t.debug("runBlock end"),e.$on("$stateChangeError",function(e,t,n,a,r,i){"AUTH_REQUIRED"===i&&o.go("login")}),r.onAuthStateChanged(function(e){e||o.go("login")})}e.$inject=["$rootScope","$log","FB_CONFIG","firebase","$state"],angular.module("myproperties").run(e)}(),function(){"use strict";function e(e,t,n,a,o){o.useLoader("$translatePartialLoader",{urlTemplate:"{part}/i18n/{lang}.json"}),o.preferredLanguage("es"),a.addPart("app"),n.html5Mode(!0),e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main",resolve:{currentAuth:["Auth",function(e){return e.$requireSignIn()}]}}).state("login",{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"main"}),t.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider","$locationProvider","$translatePartialLoaderProvider","$translateProvider"],angular.module("myproperties").config(e)}(),function(){"use strict";function e(e){return e()}function t(){var e={};return e}e.$inject=["$firebaseAuth"],angular.module("myproperties").factory("Auth",e).factory("AppF",t)}(),function(){"use strict";angular.module("myproperties").constant("malarkey",malarkey).constant("moment",moment).constant("FB_CONFIG",{apiKey:"AIzaSyCghgZ-p-Ek11XWf_OCRptlUcTqyA7KI0c",authDomain:"myproperties-c4a80.firebaseapp.com",databaseURL:"https://myproperties-c4a80.firebaseio.com",storageBucket:"myproperties-c4a80.appspot.com",messagingSenderId:"234749633393"})}(),function(){"use strict";function e(e,t){e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=3e3,t.positionClass="toast-top-right",t.preventDuplicates=!0,t.progressBar=!0}e.$inject=["$logProvider","toastrConfig"],angular.module("myproperties").config(e)}(),angular.module("myproperties").run(["$templateCache",function(e){e.put("app/login/login.html","<md-content layout=row layout-align=space-around layout-padding=layout-padding ng-cloak=ng-cloak class=login-form><md-card flex=flex flex-gt-sm=50 flex-gt-md=33><md-toolbar><div class=md-toolbar-tools><h2><span>{{'loginPage.formName' | translate}}</span></h2></div></md-toolbar><md-card-content><form name=Form ng-submit=main.signIn()><md-input-container class=md-block><label>{{'loginPage.labelUsername' | translate}}</label><input type=text name=email ng-model=main.formData.email placeholder=\"{{'loginPage.inputUsername' | translate}}\" required><div ng-messages=Form.email.$error role=alert multiple><div ng-message=required class=my-message>{{'loginPage.invalidUsername' | translate}}</div></div></md-input-container><md-input-container class=md-block><label>{{'loginPage.labelPassword' | translate}}</label><input type=password name=password ng-model=main.formData.password placeholder=\"{{'loginPage.inputPassword' | translate}}\" required md-maxlength=16><div ng-messages=Form.password.$error role=alert multiple><div ng-message=required class=my-message>{{'loginPage.invalidPassword' | translate}}</div></div></md-input-container><md-button ng-disabled=!Form.$valid type=submit ng-click=main.signIn() class=\"md-raised md-primary\">&nbsp {{'loginPage.buttonLogin' | translate}} &nbsp</md-button></form></md-card-content></md-card></md-content>"),e.put("app/main/main.html",'<div layout=column ng-cloak=ng-cloak layout-fill><md-toolbar class=md-hue-2><div class=md-toolbar-tools><!--<md-button ng-click="toggleRight()" ng-hide="isOpenRight()">\n        <md-icon> view_headline </md-icon>\n      </md-button>--><h2 flex=nogrow><span>Panel de Administracion</span></h2><span flex></span><md-button flex=nogrow ng-click=main.Auth.$signOut()><md-icon>exit_to_app</md-icon></md-button><span flex></span></div></md-toolbar><md-content layout=column layout-padding=layout-padding ng-if=!main.showPropertyForm><div flex layout=row layout-align="start center"><h1 flex=nogrow>Lista de propiedades</h1><md-button flex=nogrow class="md-raised md-primary" ng-click=main.addProperty()>Añadir Propiedad</md-button></div><md-list flex><md-list-item class=md-3-line ng-repeat="property in main.properties" ng-click=null><div class=md-list-item-text layout=row layout-align="start center"><div flex layout=column><h3 style=margin:0px>{{ property.location}} <small>{{ property.meters|currency }}</small></h3><p>{{ property.closerReference}}</p></div><div flex=nogrow><md-button flex=nogrow class="md-raised md-primary" ng-click=main.editProperty(property)>Editar</md-button></div></div></md-list-item></md-list></md-content><md-content layout-padding=layout-padding ng-if=main.showPropertyForm><form name=propertyForm><div layout layout-sm=column><md-input-container flex><label>Ubicacion</label><input type=text ng-model=main.property.location></md-input-container></div><div layout layout-sm=column><md-input-container flex=30><label>M2</label><input type=number ng-model=main.property.meters></md-input-container><md-input-container flex=70><label>Referencia mas cercana</label><input type=text ng-model=main.property.closerReference></md-input-container></div><div layout layout-sm=column><md-input-container flex><label>Campo Libre</label><input type=text ng-model=main.property.otherpublic></md-input-container></div><div layout layout-sm=column><md-input-container flex style="margin-right: 10px"><label>Tipo de documento</label><md-select ng-model=main.property.docType><md-option ng-repeat="docType in main.docTypes" ng-value=docType.$id>{{docType.name}}</md-option><md-option ng-click="main.addingDocType=true">Agregar nuevo</md-option></md-select></md-input-container><md-input-container flex><label>Precio Pactado</label><input type=number ng-model=main.property.price></md-input-container><md-input-container flex><label>Precio Venta</label><input type=number ng-model=main.property.salePrice></md-input-container></div><div layout layout-sm=column ng-if=main.addingDocType><md-input-container flex style="margin-right: 10px"><label>Nombre</label><input type=name ng-model=main.newDocType.name><md-button class="md-raised md-primary" ng-disabled=main.loading ng-click="main.addElement(\'docType\')">Agregar nuevo tipo de documento</md-button><md-button class="md-raised md-primary" ng-disabled=main.loading ng-click="main.addingDocType=false">Cancelar</md-button></md-input-container></div><div layout layout-sm=column layout-align="start center"><div flex=nogrow><label>Propietario</label></div><md-button class="md-raised md-primary" ng-click="main.addRow(\'owners\')">Agregar</md-button></div><div layout=column><div flex layout ng-repeat="($index,owner) in main.property.owners"><md-input-container flex style="margin-right: 10px"><label>Nombre</label><input type=name ng-model=owner.name></md-input-container><md-input-container flex style="margin-right: 10px"><label>Telefono</label><input type=text ng-model=owner.phone></md-input-container><md-input-container flex style="margin-right: 10px"><label>Correo</label><input type=email ng-model=owner.email></md-input-container><md-button flex=nogrow class="md-raised md-primary" ng-click="main.deleteRow(\'owners\',$index)">Eliminar</md-button></div></div><div layout layout-sm=column layout-align="start center"><div flex=nogrow><label>Intermediarios</label></div><md-button class="md-raised md-primary" ng-click="main.addRow(\'intermediaries\')">Agregar</md-button></div><div layout=column><div flex layout ng-repeat="($index,intermediary) in main.property.intermediaries"><md-input-container flex style="margin-right: 10px"><label>Nombre</label><input type=name ng-model=intermediary.name></md-input-container><md-input-container flex style="margin-right: 10px"><label>Telefono</label><input type=text ng-model=intermediary.phone></md-input-container><md-button flex=nogrow class="md-raised md-primary" ng-click="main.deleteRow(\'intermediaries\',$index)">Eliminar</md-button></div></div><div layout layout-sm=column><md-input-container flex=30 style="margin-right: 10px"><label>Tipo de venta</label><md-select ng-model=main.property.saleType><md-option ng-repeat="saleType in main.saleTypes" ng-value=saleType.$id>{{saleType.name}}</md-option><md-option ng-click="main.addingSaleType=true">Agregar nuevo</md-option></md-select></md-input-container><md-input-container flex><label>Campo Libre</label><input type=text ng-model=main.property.otherprivate></md-input-container></div><div layout layout-sm=column ng-if=main.addingSaleType><md-input-container flex style="margin-right: 10px"><label>Nombre</label><input type=name ng-model=main.newSaleType.name><md-button class="md-raised md-primary" ng-click="main.addElement(\'saleType\')" ng-disabled=main.loading>Agregar nuevo tipo de venta</md-button><md-button class="md-raised md-primary" ng-click="main.addingSaleType=false" ng-disabled=main.loading>Cancelar</md-button></md-input-container></div><div layout layout-sm=column><label flex></label><md-button flex=nogrow ng-click=main.saveProperty(main.property) class="md-raised md-primary">Añadir Propiedad</md-button><md-button flex=nogrow ng-click="main.showPropertyForm=false" class="md-raised md-primary">Cancelar</md-button></div></form></md-content></div>'),e.put("app/components/navbar/navbar.html",'<md-toolbar layout=row layout-align="center center"><md-button href=https://github.com/Swiip/generator-gulp-angular>Gulp Angular</md-button><section flex layout=row layout-align="left center"><md-button href=# class=md-raised>Home</md-button><md-button href=# class=md-raised>About</md-button><md-button href=# class=md-raised>Contact</md-button></section><md-button class=acme-navbar-text>Application was created {{ vm.relativeDate }}.</md-button></md-toolbar>')}]);
//# sourceMappingURL=../maps/scripts/app-39776c764d.js.map
