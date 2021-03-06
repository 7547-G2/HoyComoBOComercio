(function() {
  'use strict';

  angular
    .module('hoyComo')
    .config(stateConfig);

  function stateConfig($stateProvider) {
    $stateProvider

      .state({
        name: 'login',
        url: '/login',
        templateUrl: 'app/login/login.view.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
  }

})();
