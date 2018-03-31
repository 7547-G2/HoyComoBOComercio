(function () {
  'use strict'

  angular.module('hoyComo')
    .factory('User', User)

  function User($http, $q, $localStorage) {

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
        $http.post('http://localhost:3000/account', {
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
      signup: function (params) {
        var def = $q.defer()
        $http.post('https://gym2go-server.herokuapp.com/api/admin-users', {
            email: params.email,
            password: params.password,
            type: params.type
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
        $localStorage.$reset()
        loggedUserId = null;
      },
      setLoggedUserId: function (id) {
        loggedUserId = id;
      },
      getLoggedUserId: function () {
        return loggedUserId;
      }
    }
  }
})();
