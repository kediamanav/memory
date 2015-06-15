'use strict';

/* Controllers */

var surveyControllers = angular.module('surveyControllers', []);

surveyControllers.controller('questionCtrl', ['$scope','$interval','$rootScope', '$http','Questions',
  function($scope, $interval, $rootScope, $http, Questions) {
    $scope.questions = Questions.query();
    
    $scope.onTimeout = function(){
    	$scope.countdown--;
    	if($scope.countdown==0){
            $scope.option[$scope.cur-1]=2;
    		$scope.stop();
            $scope.increaseCur();
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


surveyControllers.controller('instructionCtrl', ['$scope','$interval','$location',
  function($scope, $interval, $location) {
    
    $scope.onTimeout = function(){
    }

    var mytimeout = $interval($scope.onTimeout,5000,1);

    mytimeout.then(function(data){
        $scope.stop();
        location.href = '/questions.html';
    });

    $scope.stop = function(){
        $interval.cancel(mytimeout);
    }

}]);
