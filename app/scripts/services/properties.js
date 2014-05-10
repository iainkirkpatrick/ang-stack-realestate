'use strict';

angular.module('demoappApp')
  .factory('properties', function ($http) {
    // return promise objects so that chaining can be used in app
    return {
      get: function () {
        return $http.get('/api/propData');
      },
      getByBoundingBox: function (boundingBox) {
	      return $http.get('/api/propsBoundingBox', {
			    params: {
				    southwestLng: boundingBox[0][0],
						southwestLat: boundingBox[0][1],
						northeastLng: boundingBox[1][0],
						northeastLat: boundingBox[1][1]
					}
				});
			}
    };
  });
