'use strict';

/* App Module */


var surveyApp = angular.module('surveyApp', [
  'ngRoute',
  'ngResource',
  'surveyControllers'
]);

surveyApp.factory('Questions',function($resource){
    return $resource('./data/sequence08.json', {}, {query: {method:'GET', isArray:true}, 'save':   {method:'POST'}});
  });


/*
surveyApp.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
  }]);*/
