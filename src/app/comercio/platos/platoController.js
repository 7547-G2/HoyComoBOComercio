(function () {
  'use strict';

  angular
    .module('hoyComo')
    .controller('PlatoController', PlatoController)

  function PlatoController($scope, $state, Comercio) {
    var vm = this;
    
    vm.dishes = [];
    
    
    vm.newDish = newDish;
    activate();

    function activate() {
      Comercio.getDishes()
        .then(function (result) {
          if (result.data.dishes !== null) {
            result.data.dishes.forEach(function (value) {vm.dishes.push(value)});
          }
        })
        .catch(function (err) {
          console.log('ERROR LOADING GYMS...');
        })
    }
    
    function newDish() {
      console.log("pase por new");
      $state.go('main.nuevoPlato');
    }
  }
})();
