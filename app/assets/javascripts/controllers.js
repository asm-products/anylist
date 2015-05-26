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
    
  listsController.$inject = ['$scope', '$http', 'listsService', '$location']

  function listsController($scope, $http, listsService, $location) {
    listsService.getLists().then(function(data){
      $scope.lists = data.data
    })

    $scope.createList = function(newList) {
      listsService.createList(newList).then(function(data){
        if(data) {
          $location.path('/')
        }
      });
    };
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