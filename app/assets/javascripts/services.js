(function() {
  'use strict';

  angular
    .module('anylistApp')
    .service('usersService', usersService)

  usersService.$inject = ['$http', '$window']

  function usersService($http, $window) {
    this.getUsers = function() {
      return $http.get('/api/v1/users')
    }
    this.signUpUser = function(email, password) {
      return $http.post('/api/v1/users/sign_up', { email: email, password: password });
    };
    this.signInUser = function(email, password) {
      return $http.post('/api/v1/users/sign_in', { email: email, password: password });
    };
    this.getCurrentUser = function() {
      return $http.get('/api/v1/users/current');
    };
    this.isUserAuthenticated = function() {
      return $window.sessionStorage.token ? true : false
    };
    this.updateUser = function(user) {
      return $http.post('/api/v1/users/update', { email: user.email, password: user.password });
    };
  }

  angular
    .module('anylistApp')
    .service('listsService', listsService)

  listsService.$inject = ['$http', '$window']

  function listsService($http, $window) {
    this.getLists = function() {
      return $http.get('/api/v1/lists')
    }
    this.createList = function(newList) {
      return $http.post('/api/v1/lists', { list: newList });
    };
  }
})()