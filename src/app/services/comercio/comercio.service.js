(function () {
  'use strict'

  angular.module('hoyComo')
    .factory('Comercio', Comercio)

  function Comercio($http, $q, $localStorage) {

    return {
      getDishes: function () {
        var def = $q.defer()
        $http.get('http://localhost:3000/dishes')//'https://hoy-como-backend.herokuapp.com/api/backofficeComercio/6/platos')
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      }
    }
  }
})();
