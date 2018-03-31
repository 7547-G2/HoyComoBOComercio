(function() {
  'use strict';

  angular
    .module('hoyComo')
    .config(config);

  /** @ngInject */
  function config($logProvider, $httpProvider, $urlRouterProvider, $locationProvider) {
    $logProvider.debugEnabled(true);
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors.push('spinnerInterceptor');
    $locationProvider.html5Mode(true);
  }

})();
