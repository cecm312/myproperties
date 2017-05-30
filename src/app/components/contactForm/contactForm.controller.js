(function () {
  'use strict';

  angular
    .module('myproperties')
    .controller('ContactFormController', ContactFormController);

  /** @ngInject */
  function ContactFormController($scope, AppF, $log, $http, API, toastr, $filter) {
    $scope.F = AppF;
    $scope.sendMail = sendMail;

    function sendMail(data, form) {
      $scope.readMode = true;
      var senObj = {
        name: data.name,
        email: data.email
      }
      if ($scope.subject) {
        senObj.subject = $filter("translate")("components.contactForm.wantInformation") + $scope.subject;
      } else {
        senObj.subject = data.subject;
      }
      senObj.msg = "Telefono: " + data.phone + "<br>Mensaje: " + data.message
      $http({
          method: 'POST',
          url: API + '/sendEmail',
          data: senObj, //forms user object
          transformRequest: function (obj) {
            var str = [];
            for (var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(function (resp) {
          $scope.readMode = false;
          $log.log(resp);
          if (resp.data.status) {
            toastr.info($filter("translate")("components.contactForm.successEmail"));
          }
          $scope.contact = {};
          form.$setPristine();
          form.$setUntouched();
        }, function (error) {
          $scope.readMode = false;
          $log.log(error);
          toastr.warning(error.data.msg);
        });
    }
  }
})();
