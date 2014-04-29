'use strict';

angular.module('demoappApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.router',
  'leaflet-directive'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider){
    //base angular routing
    // $routeProvider
    //   .when('/', {
    //     templateUrl: 'partials/main',
    //     controller: 'MainCtrl'
    //   })
    //   .when('/login', {
    //     templateUrl: 'partials/login',
    //     controller: 'LoginCtrl'
    //   })
    //   .when('/signup', {
    //     templateUrl: 'partials/signup',
    //     controller: 'SignupCtrl'
    //   })
    //   .when('/settings', {
    //     templateUrl: 'partials/settings',
    //     controller: 'SettingsCtrl',
    //     authenticate: true
    //   })
    //   .otherwise({
    //     redirectTo: '/'
    //   });

    //angular-ui routing
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('main', {
        url: '/',
        views: {
          'map': {
            templateUrl: 'partials/map',
            controller: 'MapCtrl'
          },
          'main': {
            templateUrl: 'partials/main',
            controller: 'MainCtrl'
          }
        }
      })
      .state('main.login', {
        url: 'login',
        views: {
          'main@': {
            templateUrl: 'partials/login',
            controller: 'LoginCtrl'
          }
        }
      })
      .state('main.signup', {
        url: 'signup',
        views: {
          'main@': {
            templateUrl: 'partials/signup',
            controller: 'SignupCtrl'
          }
        }
      })
      .state('main.settings', {
        url: 'settings',
        views: {
          'main@': {
            templateUrl: 'partials/settings',
            controller: 'SettingsCtrl'
          },
        authenticate: true
        }
      });
      
    $locationProvider.html5Mode(true);
      
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth, $state) {

  ////CURRENTLY NOT WORKING

  //base angular authentication checking and redirection
  //   // Redirect to login if route requires auth and you're not logged in
  //   $rootScope.$on('$routeChangeStart', function (event, next) {
      
  //     if (next.authenticate && !Auth.isLoggedIn()) {
  //       $location.path('/login');
  //     }
  //   });
  // });

  //angular-ui authentication checking and redirection, uses stateChangeStart instead
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      console.log(toState);
      if (toState.authenticate && !Auth.isLoggedIn()) {
        // $location.path('/login');
        $state.go('main.login');
      }
    });
  });