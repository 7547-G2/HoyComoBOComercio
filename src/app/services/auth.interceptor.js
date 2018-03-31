(function () {
  'use strict';

  angular.module('hoyComo')
    .factory('authInterceptor', function ($rootScope, $q, $location) {
      return {
        responseError: function (response) {
          if (response.status === 401) {
            $location.path('/logReg/login')
            return $q.reject(response)
          } else {
            return $q.reject(response)
          }
        }
      }
    })
})();
