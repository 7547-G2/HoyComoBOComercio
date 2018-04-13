(function () {
  'use strict';

  angular
    .module('hoyComo', ['ui.bootstrap'])
    .controller('PlatoController', ['$uibModal',PlatoController]);

  //PlatoController.$inject = ['$uibModal'];
  
  function PlatoController($uibModal,$scope,$state, $stateProvider,Comercio) {
    var vm = this
    
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
    


    function DeleteModalCtrl($uibModalInstance, dishes, id) {
      var vm = this;

      vm.dishes = dishes;
      vm.deletePerson = deletePerson;

      function deletePerson(id) {
        //dishes.splice(dishes.indexOf(person), 1);
        $uibModalInstance.close();
      }
    }
    
    function modal(id) {
      $uibModal.open({
            templateUrl: 'modal.html',
            controller: ['$uibModalInstance', 'dishes', 'id', DeleteModalCtrl],
            controllerAs: 'vm',
            resolve: {
              dishes: function () { return vm.dishes },
              id: function() { return id; }
            }
          });
      //$('#myModal').modal('show');
    }

    function deleteDish(id){
      vm.dishes.splice(vm.dishes.findIndex(function(dish){
            return dish.id == id}),1);
    }
  }
})();
