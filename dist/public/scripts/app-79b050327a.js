!function(){"use strict";angular.module("myproperties",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","pascalprecht.translate","ngAria","ui.router","ngMaterial","toastr","firebase"])}(),function(){"use strict";function t(){function t(){return e}var e=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Less",url:"http://lesscss.org/",description:"Less extends the CSS language, adding features that allow variables, mixins, functions and many other techniques.",logo:"less.png"}];this.getTec=t}angular.module("myproperties").service("webDevTec",t)}(),function(){"use strict";function t(){function t(t){var e=this;e.relativeDate=t(e.creationDate).fromNow()}t.$inject=["moment"];var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return e}angular.module("myproperties").directive("acmeNavbar",t)}(),function(){"use strict";function t(t){function e(e,a,n,r){var o,i=t(a[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});a.addClass("acme-malarkey"),angular.forEach(e.extraValues,function(t){i.type(t).pause()["delete"]()}),o=e.$watch("vm.contributors",function(){angular.forEach(r.contributors,function(t){i.type(t.login).pause()["delete"]()})}),e.$on("$destroy",function(){o()})}function a(t,e){function a(){return n().then(function(){t.info("Activated Contributors View")})}function n(){return e.getContributors(10).then(function(t){return r.contributors=t,r.contributors})}var r=this;r.contributors=[],a()}a.$inject=["$log","githubContributor"];var n={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:e,controller:a,controllerAs:"vm"};return n}t.$inject=["malarkey"],angular.module("myproperties").directive("acmeMalarkey",t)}(),function(){"use strict";function t(t,e){function a(a){function r(t){return t.data}function o(e){t.error("XHR Failed for getContributors.\n"+angular.toJson(e.data,!0))}return a||(a=30),e.get(n+"/contributors?per_page="+a).then(r)["catch"](o)}var n="https://api.github.com/repos/Swiip/generator-gulp-angular",r={apiHost:n,getContributors:a};return r}t.$inject=["$log","$http"],angular.module("myproperties").factory("githubContributor",t)}(),function(){"use strict";function t(t,e,a){function n(){o(),t(function(){i.classAnimation="rubberBand"},4e3)}function r(){a.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),i.classAnimation=""}function o(){i.awesomeThings=e.getTec(),angular.forEach(i.awesomeThings,function(t){t.rank=Math.random()})}var i=this;i.awesomeThings=[],i.classAnimation="",i.creationDate=1485298545181,i.showToastr=r,n()}t.$inject=["$timeout","webDevTec","toastr"],angular.module("myproperties").controller("MainController",t)}(),function(){"use strict";function t(t,e,a,n,r){function o(){u.firebaseUser=null,u.error=null,c.$signInWithEmailAndPassword(u.formData.email,u.formData.password).then(function(t){u.firebaseUser=t,r.go("home")})["catch"](function(t){u.error=t,n.log(t),l(t.message)})}function i(){t(function(){u.classAnimation="rubberBand"},4e3)}function s(){e.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),u.classAnimation=""}function l(t){e.error(t),u.classAnimation=""}var u=this,c=a();u.classAnimation="",u.showToastr=s,u.signIn=o,i()}t.$inject=["$timeout","toastr","$firebaseAuth","$log","$state"],angular.module("myproperties").controller("LoginController",t)}(),function(){"use strict";function t(t,e,a,n,r){n.initializeApp(a),e.debug("runBlock end"),t.$on("$stateChangeError",function(t,e,a,n,o,i){"AUTH_REQUIRED"===i&&r.go("login")})}t.$inject=["$rootScope","$log","FB_CONFIG","firebase","$state"],angular.module("myproperties").run(t)}(),function(){"use strict";function t(t,e,a,n,r){r.useLoader("$translatePartialLoader",{urlTemplate:"{part}/i18n/{lang}.json"}),r.preferredLanguage("es"),n.addPart("app"),a.html5Mode(!0),t.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main",resolve:{currentAuth:["Auth",function(t){return t.$requireSignIn()}]}}).state("login",{url:"/login",templateUrl:"app/login/login.html",controller:"LoginController",controllerAs:"main"}),e.otherwise("/")}t.$inject=["$stateProvider","$urlRouterProvider","$locationProvider","$translatePartialLoaderProvider","$translateProvider"],angular.module("myproperties").config(t)}(),function(){"use strict";function t(t){return t()}t.$inject=["$firebaseAuth"],angular.module("myproperties").factory("Auth",t)}(),function(){"use strict";angular.module("myproperties").constant("malarkey",malarkey).constant("moment",moment).constant("FB_CONFIG",{apiKey:"AIzaSyCghgZ-p-Ek11XWf_OCRptlUcTqyA7KI0c",authDomain:"myproperties-c4a80.firebaseapp.com",databaseURL:"https://myproperties-c4a80.firebaseio.com",storageBucket:"myproperties-c4a80.appspot.com",messagingSenderId:"234749633393"})}(),function(){"use strict";function t(t,e){t.debugEnabled(!0),e.allowHtml=!0,e.timeOut=3e3,e.positionClass="toast-top-right",e.preventDuplicates=!0,e.progressBar=!0}t.$inject=["$logProvider","toastrConfig"],angular.module("myproperties").config(t)}(),angular.module("myproperties").run(["$templateCache",function(t){t.put("app/login/login.html","<md-content layout=row layout-align=space-around layout-padding=layout-padding ng-cloak=ng-cloak class=login-form><md-card flex=flex flex-gt-sm=50 flex-gt-md=33><md-toolbar><div class=md-toolbar-tools><h2><span>{{'loginPage.formName' | translate}}</span></h2></div></md-toolbar><md-card-content><form name=Form><md-input-container class=md-block><label>{{'loginPage.labelUsername' | translate}}</label><input type=text name=email ng-model=main.formData.email placeholder=\"{{'loginPage.inputUsername' | translate}}\" required><div ng-messages=Form.email.$error role=alert multiple><div ng-message=required class=my-message>{{'loginPage.invalidUsername' | translate}}</div></div></md-input-container><md-input-container class=md-block><label>{{'loginPage.labelPassword' | translate}}</label><input type=password name=password ng-model=main.formData.password placeholder=\"{{'loginPage.inputPassword' | translate}}\" required md-maxlength=16><div ng-messages=Form.password.$error role=alert multiple><div ng-message=required class=my-message>{{'loginPage.invalidPassword' | translate}}</div></div></md-input-container><md-button ng-disabled=!Form.$valid ng-click=main.signIn() class=\"md-raised md-primary\">&nbsp {{'loginPage.buttonLogin' | translate}} &nbsp</md-button></form></md-card-content></md-card></md-content>"),t.put("app/main/main.html",'<div layout=vertical layout-fill><md-content><header><acme-navbar creation-date=main.creationDate></acme-navbar></header><section class=jumbotron><h1>\'Allo, \'Allo!</h1><p class=lead><img src=assets/images/yeoman.png alt="I\'m Yeoman"><br>Always a pleañure scaffolding your apps.</p><md-button class="md-raised animated infinite" ng-class=main.classAnimation ng-click=main.showToastr()>Splendid Toastr</md-button><p>With ♥ thanks to the contributions of<acme-malarkey extra-values="[\'Yeoman\', \'Gulp\', \'Angular\']"></acme-malarkey></p></section><div class=techs layout-align=center><md-card ng-repeat="awesomeThing in main.awesomeThings | orderBy:\'rank\'"><md-card-content><img class=pull-right ng-src="assets/images/{{ awesomeThing.logo }}" alt="{{ awesomeThing.title }}"><h3 class=md-title>{{ awesomeThing.title }}</h3><p>{{ awesomeThing.description }}</p></md-card-content><div class=md-action-buttons><md-button ng-href="{{ awesomeThing.url }}">Website</md-button></div></md-card></div></md-content></div>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout=row layout-align="center center"><md-button href=https://github.com/Swiip/generator-gulp-angular>Gulp Angular</md-button><section flex layout=row layout-align="left center"><md-button href=# class=md-raised>Home</md-button><md-button href=# class=md-raised>About</md-button><md-button href=# class=md-raised>Contact</md-button></section><md-button class=acme-navbar-text>Application was created {{ vm.relativeDate }}.</md-button></md-toolbar>')}]);
//# sourceMappingURL=../maps/scripts/app-79b050327a.js.map
