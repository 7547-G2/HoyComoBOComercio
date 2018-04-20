(function() {
  'use strict';

  angular
    .module('hoyComo')
    .config(stateConfig);

  function stateConfig($stateProvider) {
    $stateProvider

      .state({
        name: 'firstlogin',
        url: '/firstlogin',
        templateUrl: 'app/firstlogin/firstlogin.view.html',
        controller: 'firstLoginController',
        controllerAs: 'vm'
      })
  }

})();
