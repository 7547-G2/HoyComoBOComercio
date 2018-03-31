(function() {
  'use strict';

  angular
    .module('hoyComo')
    .config(stateConfig);

  function stateConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state({
        name: 'main',
        url: '/main',
        templateUrl: 'app/general/main.view.html',
        controller: 'MainController',
        controllerAs: 'mainController'
      })

    $urlRouterProvider.otherwise('login')
  }

})();
