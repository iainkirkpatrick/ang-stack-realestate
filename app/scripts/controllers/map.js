'use strict';

angular.module('demoappApp')
    .controller('MapCtrl', function ($scope, $http, properties, geolocation, leafletData) {

        // //get all properties and add to map as markers
        // $scope.markers = {};
        // properties.get()
        //     .success(function(props) {
        //         angular.forEach(props, function(prop) {
        //             $scope.markers[prop._id] = {
        //                 // lat: prop.location.lat,
        //                 // lng: prop.location.lon,
        //                 lat: prop.location.coordinates[1],
        //                 lng: prop.location.coordinates[0],
        //                 message: '<h4>' + prop.title + '<br>' + '<small>' + prop.price + '</small>' + '</h4>' + '<img width="250" height="250" src="' + prop.pic + '"/>'
        //               };
        //           });
        //       });
        $scope.markers = {};

        geolocation.getLocation()
          .then(function(result){
            $scope.center = result;
            console.log("geolocation successful");
          }, function(reason){
            $scope.center = reason;
            console.log("geolocation unsuccessful");
          })
          .then(function(){
            return leafletData.getMap();
          })
          .then(function(map){
            //setTimeout delay to ensure map.getBounds gets the bounds of the new view for prop loading
            setTimeout(function(){
              var bounds = [[map.getBounds()._southWest.lng, map.getBounds()._southWest.lat],[map.getBounds()._northEast.lng, map.getBounds()._northEast.lat]];
              // var southwest = [map.getBounds()._southWest.lng, map.getBounds()._southWest.lat];
              // var northeast = [map.getBounds()._northEast.lng, map.getBounds()._northEast.lat];
              properties.getByBoundingBox(bounds)
                  .success(function(props) {
                    angular.forEach(props, function(prop) {
                        $scope.markers[prop._id] = {
                            // lat: prop.location.lat,
                            // lng: prop.location.lon,
                            lat: prop.location.coordinates[1],
                            lng: prop.location.coordinates[0],
                            message: '<h4>' + prop.title + '<br>' + '<small>' + prop.price + '</small>' + '</h4>' + '<img width="250" height="250" src="' + prop.pic + '"/>'
                          };
                      });
                  });
            }, 2000);
          });

        var tilesDict = {
            mapbox: {
                url: 'http://{s}.tiles.mapbox.com/v3/envintage.map-29de0vu0/{z}/{x}/{y}.png',
                options: {
                    attribution: '&copy; <a href="http://mapbox.com/about/maps" target="_blank">Terms & Feedback</a>'
                  }
                }
              };

        angular.extend($scope, {
            center: {
                lat: -41.1,
                lng: 172.5,
                zoom: 6
              },
              tiles: tilesDict.mapbox,
              defaults: {
                scrollWheelZoom: false
              }
            });

        // //testing access to the Leaflet object methods
        // leafletData.getMap()
        //   .then(function(map) {
        //     console.log(map.getBounds());
        //   });

      });
