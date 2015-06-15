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
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'videoCtrl'
      }).
      when('/questions', {
        templateUrl: 'partials/questions.html',
        controller: 'questionCtrl'
      }).
      when('/instructions', {
        templateUrl: 'partials/instructions.html',
        controller: 'questionCtrl'
      }).
      when('/thankyou', {
        templateUrl: 'partials/thankyou.html',
        controller: 'thankCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
      $locationProvider.html5Mode(true);
}]);