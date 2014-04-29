'use strict';

angular.module('demoappApp')
    .controller('MapCtrl', function ($scope) {
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
                lat: -43.3744881,
                lng: 172.4662705,
                zoom: 5
            },
            tiles: tilesDict.mapbox,
            defaults: {
                scrollWheelZoom: false
            }
        });
    });
