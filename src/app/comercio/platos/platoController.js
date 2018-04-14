(function () {
  'use strict';

  angular
    .module('hoyComo')
    .controller('PlatoController', PlatoController)

  function PlatoController($scope, $state, Comercio,Plato) {
    var vm = this;
    
    vm.dishes = [];
    
    
    vm.new_plato = {
      description: null,
      image: null,
      price: null,
      id: null
    };
    vm.newDish = newDish;
    vm.deleteDish = deleteDish;
    vm.submitPlato = submitPlato;
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
        })
        var fileSelect = document.getElementById("image");
        fileSelect.onchange = function() {
          var valida = false;
          if(this.files[0].size > 524288){
            alert("La imagen no debe pesar más de 512Kb");
            this.value = "";
            return;
          };
          var f = fileSelect.files[0], r = new FileReader();
          r.onload = function(e){
            var img = new Image();      
            img.src = e.target.result;
            img.onload = function () {
              var w = this.width;
              var h = this.height;
              if (h!=w){
                return;
              }
              valida = true;
            } 
          }
          if (!valida){
            alert("La imagen debe ser cuadrada");
            this.value = "";
            return;
          }
          r.onloadend = function(e) { 
            vm.new_plato.image = e.target.result;
          }
  
          r.readAsDataURL(f);
        };
    }
    
    function newDish() {
      $('#myModal').modal('show');
    }
    
    function modal(dish) {
      /*var dishToEdit = vm.dishes.findIndex(function(dish){
        return dish.id == id});
        vm.new_plato.description = vm.dishes[dishToEdit].description;
        vm.new_plato.price = vm.dishes[dishToEdit].price;*/
        vm.new_plato.description = (dish == null) ? "":dish.description;
        vm.new_plato.price = (dish == null) ? "":dish.price;
        vm.new_plato.id  = (dish == null) ? 0:dish.id;
      $('#myModal').modal('show');
    }

    function submitPlato() {
      var nuevoPlato = {
        description: null,
        image: null,
        price: null,
        id: null
      };
      nuevoPlato.price = Number(vm.new_plato.price);
      nuevoPlato.description = vm.new_plato.description;
      nuevoPlato.image = vm.new_plato.image;
      nuevoPlato.id = vm.new_plato.id;
      if (vm.new_plato.id == 0) {
        vm.dishes.push(nuevoPlato);
      } else {
      vm.dishes.splice(vm.dishes.findIndex(function(dish){
        return dish.id == vm.new_plato.id }),1,nuevoPlato);
      }
      vm.new_plato =  {
        description: null,
        image: null,
        price: null
      };
      Plato.create(nuevoPlato)
        .then(function (result) {
          $state.go('main.comercio');
        })
        .catch(function (err) {
          vm.error = err;
        })
        $('#myModal').modal('hide');
    }


    function deleteDish(id){
          console.log('paseppor delete');
      vm.dishes.splice(vm.dishes.findIndex(function(dish){
            return dish.id == id}),1);
    }
  }
})();
