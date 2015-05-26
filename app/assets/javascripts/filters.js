(function() {
  'use strict';

  angular
    .module('anylistApp')
    .filter('range', range)

  function range() {
    return function(input, total) {
      total = parseInt(total);
      for(var i = 0; i < total; i++)
        input.push(i);
      return input;
    }
  }
})()