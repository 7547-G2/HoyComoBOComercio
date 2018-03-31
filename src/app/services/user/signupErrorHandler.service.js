(function () {
  'use strict'

  angular.module('hoyComo')
    .factory('SignupErrorHandler', SignupErrorHandler)

  function SignupErrorHandler() {
    return {
      handleError: function(err) {
        if (err.data.errors[0].hasOwnProperty("username") && err.data.errors[0].username == "username must be unique") {
          return "USERNAME_EXISTS"
        }

        if (err.data.errors[0].hasOwnProperty("email") && err.data.errors[0].email == "email must be unique") {
          return "EMAIL_EXISTS"
        }
      }
    }
  }
})();
