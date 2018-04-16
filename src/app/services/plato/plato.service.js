(function () {
  'use strict'

  angular.module('hoyComo')
    .factory('Plato', Plato)

  function Plato($http, $q,  User) {

    return {
      create: function (params) {
        var def = $q.defer()
        $http.post('https://hoy-como-backend.herokuapp.com/api/backofficeComercio/'+ User.getLoggedUserId() +'/platos', {
          nombre: params.nombre,
          precio: params.precio,
          imagen: params.imagen
        })
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      update: function (params) {
        var def = $q.defer()
        $http.put('https://hoy-como-backend.herokuapp.com/api/backofficeComercio/'+ User.getLoggedUserId() +'/platos/' + params.id, {
          nombre: params.nombre,
          precio: params.precio,
          imagen: params.imagen
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
