'use strict';

/* Controllers */



var surveyControllers = angular.module('surveyControllers', []);

surveyControllers.controller('questionCtrl', ['$scope','Questions',
  function($scope, Questions) {
    $scope.checker="ABC";
    $scope.questions = Questions.query();
    
    /*$scope.firstName = "manav";
    $scope.lastName = "Doe";
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    }*/
    
}]);  
