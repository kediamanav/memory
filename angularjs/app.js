'use strict';

/* App Module */


var surveyApp = angular.module('surveyApp', [
  'ngRoute',
  'ngResource',
  'surveyControllers'
]);

surveyApp.factory('Questions',function($resource){
    return $resource('./data/sequence:id.json', {}, {query: {method:'GET', params:{id:'08'}, isArray:true}, 'save':   {method:'POST'}});
});

surveyApp.factory('Videos',function($resource){
    return $resource('./data/videos.json', {}, {query: {method:'GET', isArray:true}, 'save':   {method:'POST'}});
});

surveyApp.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    $routeProvider.
      when('/home/:id', {
        templateUrl: '/partials/home.html',
        controller: 'videoCtrl'
      }).
      when('/instructions/:id', {
        templateUrl: '/partials/instructions.html',
        controller: 'instructionCtrl'
      }).
      when('/questions/:id', {
        templateUrl: '/partials/questions.html',
        controller: 'questionCtrl'
      }).
      when('/thankyou/:id', {
        templateUrl: '/partials/thankyou.html',
        controller: 'thankCtrl'
      }).
      otherwise({
        redirectTo: '/questions/1'
      });
      $locationProvider.html5Mode(true);
}]);