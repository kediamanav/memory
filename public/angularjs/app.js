'use strict';

/* App Module */


var surveyApp = angular.module('surveyApp', [
  'ngRoute',
  'ngResource',
  'surveyControllers',
  'surveyServices'
]);

surveyApp.factory('Questions',function($resource){
    return $resource('./data/sequence:id.json', {}, {query: {method:'GET', params:{id:'08'}, isArray:true}, 'save':   {method:'POST'}});
});

surveyApp.factory('Videos',function($resource){
    return $resource('./data/videos.json', {}, {query: {method:'GET', isArray:true}, 'save':   {method:'POST'}});
});

surveyApp.factory('PostResponse',function($resource){
    return $resource('/response',{}, {query: {method:'GET',  isArray:true}, 'save':   {method:'POST'}});
});

surveyApp.factory('Sequence',function($resource){
    return $resource('/getSequence',{}, {query: {method:'GET',  isArray:true}, 'save':   {method:'POST'}});
});

surveyApp.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/partials/main.html',
        controller: 'mainCtrl'
      }).
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
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
}]);