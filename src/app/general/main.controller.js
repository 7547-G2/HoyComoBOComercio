(function () {
  'use strict';

  angular
    .module('hoyComo')
    .controller('MainController', MainController);

  function MainController($state, User, $location, $localStorage, $scope) {
    var vm = this;

    $scope.$storage = $localStorage;

    vm.logout = logout;

    function logout() {
      $state.go('login');
    }

  }

})();
