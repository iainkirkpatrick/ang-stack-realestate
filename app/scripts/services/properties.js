'use strict';

angular.module('demoappApp')
  .factory('properties', function ($http) {
    // return promise objects so that chaining can be used in app
    return {
      get: function () {
        return $http.get('/api/propData');
      }
    };
  });
