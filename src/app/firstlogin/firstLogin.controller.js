(function () {
  'use strict';

  angular
    .module('hoyComo')
    .controller('firstLoginController', firstLoginController);

  function firstLoginController($state, User,$location) {
    var vm = this;

    vm.userCredentials = {
      email: null,
      password: null,
      confirm_password: null,
      hash:null
    }

    vm.error = '';

    vm.firstLogin = firstLogin;

    vm.userCredentials.email = $location.search().email;
    vm.userCredentials.hash = $location.search().hash;
    function firstLogin() {
    console.log("vm.userCredentials.email = " + vm.userCredentials.email);
    console.log("vm.userCredentials.hash = " + vm.userCredentials.hash);
      User.firstLogin(vm.userCredentials)
        .then(function (result) {
            User.setLoggedUserId(result.data.comercioId);
            $state.go('main.comercio')
          })
        .catch(function (err) {
          vm.error = err.data.errorMessage;
        })
    }
  }

})();
