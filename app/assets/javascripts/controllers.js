(function() {
  'use strict';

  angular
    .module('anylistApp')
    .controller('applicationController', applicationController);
    
  applicationController.$inject = ['$scope', '$http', 'usersService'];

  function applicationController($scope, $http, usersService) {
    $scope.$watch(usersService.isUserAuthenticated, function() {
      if(usersService.isUserAuthenticated()) {
        usersService.getCurrentUser().then(function(data){
          $scope.current_user = data.data;
        });
      } else {
        $scope.current_user = false;
      } 
    });
  }

  angular
    .module('anylistApp')
    .controller('navController', navController);
    
  navController.$inject = ['$scope', '$http', '$window', '$location', '$routeParams'];

  function navController($scope, $http, $window, $location, $routeParams) {
    $scope.signOutUser = function() {
      $window.sessionStorage.removeItem('token');
      $location.path('/');
    };
  }

  angular
    .module('anylistApp')
    .controller('headerController', headerController);
    
  headerController.$inject = ['$scope', '$http', '$window', '$location', '$routeParams'];

  function headerController($scope, $http, $window, $location, $routeParams) {
    $scope.$on('$routeChangeSuccess', function() {
      $scope.showHeader = ($location.$$path == '/')
    })
  }

  angular
    .module('anylistApp')
    .controller('createUpdateListController', createUpdateListController);
    
  createUpdateListController.$inject = ['$scope', '$http', 'listsService', '$location', '$routeParams'];

  function createUpdateListController($scope, $http, listsService, $location, $routeParams) {
    if($routeParams.id) {
      listsService.getList($routeParams.id).then(function(data){
        if(data && data.data.is_owner) {
          $scope.list = data.data;
        } else {
          $location.path('/');
        }
      });
    }

    $scope.list = {
      items_attributes: []
    };

    $scope.increaseListItemsCount = function() {
      $scope.list.items_attributes.push({ title: '' });
    };

    $scope.processList = function(list) {
      $routeParams.id ? $scope.updateList(list) : $scope.createList(list);
    };

    $scope.updateList = function(list) {
      listsService.updateList($scope.list.id, list).then(function(data){
        if(data) {
          $location.path('/');
        }
      });
    };

    $scope.createList = function(list) {
      listsService.createList(list).then(function(data){
        if(data) {
          $location.path('/');
        }
      });
    };

    $scope.deleteItem = function(index) {
      $scope.list.items_attributes[index]._destroy = true;
    };

    $scope.increaseListItemsCount();
  }

  angular
    .module('anylistApp')
    .controller('listsController', listsController);
    
  listsController.$inject = [];

  function listsController() {
  }

  angular
    .module('anylistApp')
    .controller('listController', listController);
    
  listController.$inject = ['$scope', '$http', 'listsService', '$location', '$routeParams'];

  function listController($scope, $http, listsService, $location, $routeParams) {
    if($routeParams.id) {
      listsService.getList($routeParams.id).then(function(data){
        if(data) {
          $scope.list = data.data;
        } else {
          $location.path('/');
        }
      });
    }
  }

  angular
    .module('anylistApp')
    .controller('usersController', usersController);
    
  usersController.$inject = ['$scope', '$http', 'usersService', '$window', '$location'];

  function usersController($scope, $http, usersService, $window, $location) {
    $scope.update_user = angular.copy($scope.current_user);

    $scope.signUpUser = function(user) {
      usersService.signUpUser(user).then(function(data){
        if(data) {
          $window.sessionStorage.token = data.data.token;
          $location.path('/');
        }
      });
    };

    $scope.signInUser = function(user) {
      usersService.signInUser(user).then(function(data){
        if(data) {
          $window.sessionStorage.token = data.data.token;
          $location.path('/');
        }
      });
    };

    $scope.updateUser = function(user) {
      usersService.updateUser(user).then(function(){
        $scope.current_user = user;
        $location.path('/');
      });
    };
  }

  angular
    .module('anylistApp')
    .controller('userController', userController);
    
  userController.$inject = ['$scope', '$http', 'usersService', '$routeParams'];

  function userController($scope, $http, usersService, $routeParams) {
    usersService.getUser($routeParams.name).then(function(data){
      $scope.user = data.data;
    });
  }
})();