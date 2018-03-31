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

    vm.error = null;

    vm.login = login;
    vm.logout = logout;

    function login() {
      User.login(vm.userCredentials)
        .then(function (result) {
            $state.go('main.comercio')
          })
        .catch(function (err) {
          console.log('something was wrong');
          vm.error = err
        })
    }
    function logout() {
      User.logout()
    }

  }

})();
