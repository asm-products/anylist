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
    this.getUser = function(name) {
      return $http.get('/api/v1/users/' + name)
    }
    this.signUpUser = function(user) {
      return $http.post('/api/v1/users/sign_up', { user: user });
    };
    this.signInUser = function(user) {
      return $http.post('/api/v1/users/sign_in', { user: user });
    };
    this.getCurrentUser = function() {
      return $http.get('/api/v1/users/current');
    };
    this.isUserAuthenticated = function() {
      return $window.sessionStorage.token ? true : false
    };
    this.updateUser = function(user) {
      return $http.post('/api/v1/users', { user: user });
    };
  }

  angular
    .module('anylistApp')
    .service('listsService', listsService)

  listsService.$inject = ['$http', '$window']

  function listsService($http, $window) {
    this.getLists = function(page, user_name) {
      page = page || 1;
      return $http.get('/api/v1/lists', { params: { page: page, user_name: user_name }})
    }
    this.getList = function(id) {
      return $http.get('/api/v1/lists/' + id)
    }
    this.createList = function(list) {
      return $http.post('/api/v1/lists', { list: list });
    }
    this.updateList = function(id, list) {
      return $http.put('/api/v1/lists/' + id, { list: list });
    }
  }
})()