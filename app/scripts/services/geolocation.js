'use strict';

angular.module('demoappApp')
  .factory('geolocation', function ($q, $window) {

    return {
      getLocation: function () {
        //getLocation should return after promise completion

        //promise setup
        var deferred = $q.defer();
        var promise = deferred.promise;

        if (!$window.navigator.geolocation) {
          //browser does not support geolocation
          return {
            lat: -43.5131367,
            lng: 172.5990772,
            zoom: 12
          };
        } else {
          //use geolocation API, asks user for permission to use location
          $window.navigator.geolocation.getCurrentPosition(function(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;
            deferred.resolve({ lat: latitude, lng: longitude, zoom: 12 });
          }, function() {
            deferred.reject({ lat: -43.5131367, lng: 172.5990772, zoom: 12 });
          });
          return promise;
        }
      }
    };
  });
