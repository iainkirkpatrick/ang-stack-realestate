'use strict';

angular.module('demoappApp')
    .controller('MapCtrl', function ($scope, $http, properties) {

        //get properties and add to map as markers
        $scope.markers = {};
        properties.get()
            .success(function(props) {
                console.log(props);
                angular.forEach(props, function(prop) {
                    $scope.markers[prop._id] = {
                        lat: prop.location.lat,
                        lng: prop.location.lon,
                        message: '<h4>' + prop.title + '<br>' + '<small>' + prop.price + '</small>' + '</h4>' + '<img width="250" height="250" src="' + prop.pic + '"/>'
                      };
                  });
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
      });
