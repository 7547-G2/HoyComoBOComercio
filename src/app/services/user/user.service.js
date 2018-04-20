(function () {
  'use strict'

  angular.module('hoyComo')
    .factory('User', User)

  function User($http, $q, $localStorage, $sessionStorage) {

    var loggedUserId = null;

    var updateApiTokenHeader = function (token) {
      if (token) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + token
      } else {
        $http.defaults.headers.common.Authorization = undefined
      }
    }

    return {
      login: function (params) {
        var def = $q.defer()
        //$http.post('http://localhost:3000/account',{
        $http.post('https://hoy-como-backend.herokuapp.com/api/backofficeComercio/session', {
          email: params.email,
          password: params.password
        })
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      firstLogin: function (params) {
        var def = $q.defer()
        $http.post('http://localhost:3000/account',{
        //$http.post('https://hoy-como-backend.herokuapp.com/api/backofficeComercio/session', {
          email: params.email,
          password: params.password,
          hash: params.hash
        })
          .then(function (res) {
            def.resolve(res)
          })
          .catch(function (err) {
            def.reject(err)
          })

        return def.promise
      },
      isLogged: function () {
        var token = $localStorage.api_token
        updateApiTokenHeader(token)
        return !(!$localStorage.api_token)
      },
      logout: function () {
        $localStorage.$reset();
        $sessionStorage.$reset();
        loggedUserId = null;
      },
      setLoggedUserId: function (id) {
        $sessionStorage.idComercio = id;
      },
      getLoggedUserId: function () {
        return $sessionStorage.idComercio;
      }
    }
  }
})();
