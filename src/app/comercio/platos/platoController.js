(function () {
  'use strict';

  angular
    .module('hoyComo')
    .controller('PlatoController', PlatoController)

  function PlatoController($scope, $state, Comercio) {
    var vm = this;
    
    vm.dishes = [];
    
    
    vm.newDish = newDish;
    vm.deleteDish = deleteDish;
    vm.modal = modal;    
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
      $state.go('main.nuevoPlato');
    }
    
    function modal() {
      $('#myModal').modal('show');
    }

    function deleteDish(id){
          console.log('paseppor delete');
      vm.dishes.splice(vm.dishes.findIndex(function(dish){
            return dish.id == id}),1);
    }
  }
})();
