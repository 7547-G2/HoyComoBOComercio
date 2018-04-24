(function () {
  'use strict';

  angular
    .module('hoyComo')
    .controller('PlatoController', PlatoController)

  function PlatoController($scope, $state, Comercio,Plato) {
    var vm = this;
    
    vm.dishes = [];
    
    $scope.viewby = 5;
    $scope.totalItems = 0;
    $scope.currentPage = 1;
    $scope.itemsPerPage = $scope.viewby;
    $scope.maxSize = 5; //Number of pager buttons to show
  
    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };
  
    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };
  
  $scope.setItemsPerPage = function(num) {
    $scope.itemsPerPage = num;
    $scope.currentPage = 1; //reset to first page
  }
    
    vm.new_plato = {
      description: null,
      image: null,
      price: null,
      platoState: null,
      id: null
    };
    vm.newDish = newDish;
    vm.deleteDish = deleteDish;
    vm.submitPlato = submitPlato;
    vm.editComercioInfo = editComercioInfo;
    vm.modal = modal;    
    activate();

    function activate() {
      $scope.status = true;
      Comercio.getDishes()
        .then(function (result) {
          if (result.data !== null) {
            result.data.forEach(function (value) {vm.dishes.push(value)});
            $scope.totalItems = vm.dishes.length;
          }
        })
        .catch(function (err) {
        })
        var fileSelect = document.getElementById("image");
        fileSelect.onchange = function() {
          if(this.files[0].size > 524288){
            alert("La imagen no debe pesar más de 512Kb");
            this.value = "";
            return;
          };
          var f = fileSelect.files.item(0), r = new FileReader();
          r.onload =function(e) { 
            var img = new Image();      
            img.src = e.target.result;
            var w = img.width;
            var h = img.height;
            if (h!=w){
              alert("La imagen debe ser cuadrada");
              fileSelect.value = "";
              return;
            }
          }
          r.onloadend = function(e) { 
            vm.new_plato.image = e.target.result;
          }
          r.readAsDataURL(f);
        };
    }

    $scope.changeStatus = function(plato){
      console.log("en change status");
      plato.platoState = (plato.platoState == 'ACTIVO') ? 'INACTIVO':'ACTIVO';
      Plato.update(plato)
      .then(function (result) {
        $state.go('main.comercio');
      })
    }
    
    function editComercioInfo() {
      $state.go('main.editarComercio');
     }

    function newDish() {
      $('#myModal').modal('show');
    }
    
    function modal(dish) {
        vm.new_plato.description = (dish == null) ? "":dish.nombre;
        vm.new_plato.price = (dish == null) ? "":dish.precio;
        vm.new_plato.id = (dish == null) ? 0:dish.id;
        vm.new_plato.image = (dish == null) ? "":dish.imagen;
        vm.new_plato.platoState = (dish == null) ? "":dish.platoState;
      $('#myModal').modal('show');
    }

    function submitPlato() {
      var nuevoPlato = {
        nombre: null,
        imagen: null,
        precio: null,
        platoState: null,
        id: null
      };
      nuevoPlato.precio = Number(vm.new_plato.price);
      nuevoPlato.nombre = vm.new_plato.description;
      nuevoPlato.imagen = vm.new_plato.image;
      nuevoPlato.id = vm.new_plato.id;
      if (vm.new_plato.id == 0) {
        Plato.create(nuevoPlato)
        .then(function (result) {
          nuevoPlato.id = result;
          vm.dishes.push(nuevoPlato);
          $state.go('main.comercio');
        })
        .catch(function (err) {
          vm.error = err;
        })
      } else {
        Plato.update(nuevoPlato)
        .then(function (result) {
          vm.dishes.splice(vm.dishes.findIndex(function(dish){
            return dish.id == nuevoPlato.id }),1,nuevoPlato);
          $state.go('main.comercio');
        })
      }
      vm.new_plato =  {
        description: null,
        image: null,
        price: null
      };
      $('#myModal').modal('hide');
    }


    function deleteDish(plato){
      if(confirm("¿Está seguro de eliminar "+ plato.nombre + "?")) {     
        plato.platoState = 'BORRADO';
        Plato.update(plato)
        .then(function (result) {
          vm.dishes.splice(vm.dishes.findIndex(function(dish){
          return dish.id == plato.id}),1);
          $state.go('main.comercio');
        })
    }
    }
  }
})();
