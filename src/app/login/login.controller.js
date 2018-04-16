(function () {
  'use strict';

  angular
    .module('hoyComo')
    .controller('LoginController', LoginController);

  function LoginController($state, User, $localStorage) {
    var vm = this;

    vm.userCredentials = {
      email: null,
      password: null
    }

    vm.error = '';

    vm.login = login;
    vm.logout = logout;

    function login() {
      User.login(vm.userCredentials)
        .then(function (result) {
            User.setLoggedUserId(result.data.comercioId);
            $state.go('main.comercio')
          })
        .catch(function (err) {
          vm.error = err.data.errorMessage;
        })
    }
    function logout() {
      User.logout()
    }

  }

})();
