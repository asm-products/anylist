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
    this.getLists = function(page) {
      page = page || 1;
      return $http.get('/api/v1/lists', { params: { page: page }})
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