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
    
  headerController.$inject = ['$scope', '$http']

  function headerController($scope, $http) {
  }

  angular
    .module('anylistApp')
    .controller('listsController', listsController)
    
  listsController.$inject = ['$scope', '$http']

  function listsController($scope, $http) {
  }
})();