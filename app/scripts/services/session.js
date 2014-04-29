'use strict';

angular.module('demoappApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
