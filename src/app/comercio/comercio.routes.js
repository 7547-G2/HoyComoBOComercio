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
        name: 'main.editarComercio',
        url: 'editarComercio',
        templateUrl: 'app/comercio/editarComercio/editarComercio.view.html',
        controller: 'EditarComercioController',
        controllerAs: 'vm'
      })   


    $urlRouterProvider.otherwise('login')
  }

})();
