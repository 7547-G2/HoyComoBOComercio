(function () {
  'use strict'

  angular.module('hoyComo')
    .factory('Comercio', Comercio)

  function Comercio($http, $q, $localStorage,User) {

    return {
      getDishes: function () {
        var def = $q.defer()
        $http.get('https://hoy-como-backend.herokuapp.com/api/backofficeComercio/'+User.getLoggedUserId()+'/platos')
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
