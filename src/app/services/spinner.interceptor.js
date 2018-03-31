(function () {
  'use strict';

  angular.module('hoyComo')
    .factory('spinnerInterceptor', function ($q, usSpinnerService) {
      return {
        responseError: function (response) {
          usSpinnerService.stop('spinner-1')
          return $q.reject(response)
        },
        response: function (response) {
          usSpinnerService.stop('spinner-1')
          return response
        },
        request: function (config) {
          usSpinnerService.spin('spinner-1')
          return config
        },
        requestError: function (request) {
          usSpinnerService.spin('spinner-1')
          return $q.reject(request)
        }
      }
    })
})();
