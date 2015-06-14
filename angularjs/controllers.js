'use strict';

/* Controllers */

var surveyControllers = angular.module('surveyControllers', []);

surveyControllers.controller('questionCtrl', ['$scope','$interval','$rootScope', '$http','Questions',
  function($scope, $interval, $rootScope, $http, Questions) {
    $scope.questions = Questions.query();
    
    $scope.onTimeout = function(){
    	$scope.countdown--;
    	if($scope.countdown==0){
	    	alert("You failed to answer the question in the stipulated time!");
    		$scope.stop();
    		//Enter code to reject the response here
    	}
    }
    var mytimeout;

    $scope.stop = function(){
    	$interval.cancel(mytimeout);
    }

    $scope.cur=0;
    $scope.countdown=10;

    $scope.increaseCur = function(){
    	$scope.cur++;
    	$scope.countdown=10;
    	$scope.stop();
    	mytimeout = $interval($scope.onTimeout,1000,10);

		angular.element(".questiondiv").hide();
		angular.element(".questiondiv").slideDown();
    }

    $scope.increaseCur();
    $scope.option = [];

}]);
