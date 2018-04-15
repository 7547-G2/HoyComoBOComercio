(function () {
  'use strict'

  angular.module('hoyComo')
    .factory('Plato', Plato)

  function Plato($http, $q, $localStorage) {

    return {
      create: function (params) {
        var def = $q.defer()
        $http.post('https://hoy-como-backend.herokuapp.com/api/backofficeComercio/6/platos', {
          description: params.description,
          price: params.price,
          image: params.image
        })
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      delete: function (activityId) {
        var def = $q.defer()
        $http.delete('https://gym2go-server.herokuapp.com/api/gyms/'+Gym.getActiveGym()+'/activities' + activityId)
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
