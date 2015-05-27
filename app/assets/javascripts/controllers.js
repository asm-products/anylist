(function() {
  'use strict';

  angular
    .module('anylistApp')
    .controller('applicationController', applicationController)
    
  applicationController.$inject = ['$scope', '$http', 'usersService']

  function applicationController($scope, $http, usersService) {
    $scope.$watch(usersService.isUserAuthenticated, function() {
      if(usersService.isUserAuthenticated()) {
        usersService.getCurrentUser().then(function(data){
          $scope.current_user = data.data
        })
      } else {
        $scope.current_user = false
      } 
    })
  }

  angular
    .module('anylistApp')
    .controller('headerController', headerController)
    
  headerController.$inject = ['$scope', '$http', '$window', '$location']

  function headerController($scope, $http, $window, $location) {
    $scope.signOutUser = function() {
      $window.sessionStorage.removeItem('token')
      $location.path('/')
    }
  }

  angular
    .module('anylistApp')
    .controller('listsController', listsController)
    
  listsController.$inject = ['$scope', '$http', 'listsService', '$location', '$routeParams', '$filter']

  function listsController($scope, $http, listsService, $location, $routeParams, $filter) {
    listsService.getLists().then(function(data){
      $scope.lists = data.data
    })

    $scope.list = {
      items_attributes: []
    }

    if($routeParams.id) {
      listsService.getList($routeParams.id).then(function(data){
        if(data && data.data.is_owner) {
          $scope.list = data.data
        } else {
          $location.path('/')
        }
      });
    }

    $scope.increaseListItemsCount = function(list) {
      $scope.list.items_attributes.push({ title: '' })
    };

    $scope.processList = function(list) {
      $routeParams.id ? $scope.updateList(list) : $scope.createList(list)
    }

    $scope.updateList = function(list) {
      listsService.updateList($scope.list.id, list).then(function(data){
        if(data) {
          $location.path('/')
        }
      });
    };

    $scope.createList = function(list) {
      listsService.createList(list).then(function(data){
        if(data) {
          $location.path('/')
        }
      });
    };

    $scope.deleteItem = function(index) {
      $scope.list.items_attributes[index]._destroy = true
    }

    $scope.increaseListItemsCount()
  }

  angular
    .module('anylistApp')
    .controller('usersController', usersController)
    
  usersController.$inject = ['$scope', '$http', 'usersService', '$window', '$location']

  function usersController($scope, $http, usersService, $window, $location) {
    $scope.signUpUser = function(user) {
      usersService.signUpUser(user.email, user.password).then(function(data){
        if(data) {
          $window.sessionStorage.token = data.data.token;
          $location.path('/')
        }
      });
    };

    $scope.signInUser = function(user) {
      usersService.signInUser(user.email, user.password).then(function(data){
        if(data) {
          $window.sessionStorage.token = data.data.token;
          $location.path('/')
        }
      });
    };

    $scope.updateUser = function(user) {
      usersService.updateUser(user).then(function(data){
        $location.path('/')
      });
    };
  }
})();