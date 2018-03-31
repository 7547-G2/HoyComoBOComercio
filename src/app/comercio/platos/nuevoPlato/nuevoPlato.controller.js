(function () {
  'use strict';

  angular
    .module('hoyComo')
    .controller('NuevoPlatoController', NuevoPlatoController);

  function NuevoPlatoController($state, Plato, $stateParams) {
    var vm = this;

    vm.goBack = goBack;
    vm.new_plato = {
      description: null,
      image: null,
      price: null
    };

    vm.error = null;

    vm.submitPlato = submitPlato;
    
    
    activate();

    function activate() {
      var fileSelect = document.getElementById("image");
      fileSelect.onchange = function() {
        var f = fileSelect.files[0], r = new FileReader();

        r.onloadend = function(e) { 
          vm.new_plato.image = e.target.result;
        }

        r.readAsDataURL(f);
      };
    }

    function submitPlato() {
      vm.new_plato.price = Number(vm.new_plato.price);
      console.log(vm.new_plato);
      Plato.create(vm.new_plato)
        .then(function (result) {
          $state.go('main.comercio');
        })
        .catch(function (err) {
          vm.error = err;
        })

    }

    function goBack() {
      $state.go('main.comercio');
    }
  }
})();
