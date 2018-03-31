(function() {
  'use strict';

  angular
    .module('hoyComo')
    .config(stateConfig);

  function stateConfig($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state({
        name: 'main.comercio',
        url: 'platos',
        templateUrl: 'app/comercio/platos/platos.view.html',
        controller: 'PlatoController',
        controllerAs: 'vm'
      })
      
      .state({
        name: 'main.nuevoPlato',
        url: 'nuevoPlato',
        templateUrl: 'app/comercio/platos/nuevoPlato/nuevoPlato.view.html',
        controller: 'NuevoPlatoController',
        controllerAs: 'vm'
      })   


    $urlRouterProvider.otherwise('login')
  }

})();
