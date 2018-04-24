(function () {
  'use strict';

  angular
      .module('hoyComo')
      .controller('EditarComercioController', EditarComercioController);

  function EditarComercioController($state, User, Comercio) {

    var vm = this;
    vm.updateComercio = updateComercio;
    
    vm.goBack = goBack;

    vm.types = [];

    vm.comercio = {
      id: null,
      email: null,
      nombre: null,
      razonSocial: null,
      tipo: "5",
      password: null,
      imagenLogo:null,
      estado:null,
      addressDto: {
        street: null,
        postalCode:null,
        floor: null,
        department: null
      }
    }

    activate();

    function activate() {
        /*Comercio.getComercioById(User.getLoggedUserId())
          .then(function (result) {
            vm.registerGymCredentials.name = result.data.name;
            vm.registerGymCredentials.address = result.data.address;
            vm.registerGymCredentials.id = $stateParams.id;
          })
          .catch(function (err) {
          })*/
          Comercio.getTipoComida(User.getLoggedUserId())
          .then(function (result) {
            if (result.data !== null) {
              result.data.forEach(function (value) {vm.types.push(value)});
            }
          })
          .catch(function (err) {
          })
    }

    function updateComercio() {
      /*Comercio.updateComercio(vm.comercio)
      .then(function (result) {
        nuevoPlato.id = result;
        vm.dishes.push(nuevoPlato);
        $state.go('main.comercio');
      })
      .catch(function (err) {
        vm.error = err;
      })*/
      console.log(vm.comercio.tipo);
      $state.go('main.comercio');
    }

      
    function goBack() {
      $state.go('main.comercio');
    }
  }
})();
