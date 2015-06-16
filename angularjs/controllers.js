'use strict';

/* Controllers */

var surveyControllers = angular.module('surveyControllers', []);

surveyControllers.controller('videoCtrl', ['$scope','$interval','$rootScope', 'Videos','$routeParams','$location',
  function($scope, $interval,$rootScope, Videos, $routeParams, $location) {
    $scope.videosources = Videos.query(function(){
        var id=$routeParams.id;
        $scope.videosrc = $scope.videosources[id-1].name; 
    });
    $scope.gotoInstr = function(){
        $scope.$apply($location.path('/instructions/'+$routeParams.id));
        console.log("Redirected");
    }
    $scope.checker="ABC";
}]);


surveyControllers.controller('instructionCtrl', ['$scope','$interval','$rootScope','$routeParams','$location',
  function($scope, $interval, $rootScope,$routeParams,$location) {
    
    $scope.onTimeout = function(){
        $location.path('/questions/'+$routeParams.id);
    }

    var mytimeout = $interval($scope.onTimeout,5000,1);

    mytimeout.then(function(data){
        $scope.stop();
    });

    $scope.stop = function(){
        $interval.cancel(mytimeout);
    }

}]);


surveyControllers.controller('questionCtrl', ['$scope','$interval','$rootScope','Questions','$routeParams','$location','Choices',
  function($scope, $interval, $rootScope, Questions,$routeParams,$location, Choices) {
    $scope.questions = Questions.query({id: $routeParams.id});
    $scope.onTimeout = function(){
    	$scope.countdown--;
    	if($scope.countdown==0){
            //$scope.option[$scope.cur-1]=2;
    		$scope.stop();
            $scope.increaseCur(2);
    		//Enter code to reject the response here
    	}
    }
    var mytimeout;

    $scope.stop = function(){
    	$interval.cancel(mytimeout);
    }

    $scope.cur=0;
    $scope.countdown=10;

    $scope.increaseCur = function(value){
        if($scope.cur!=0){
            Choices.setOptionVal($scope.cur-1,value);
        }
    	$scope.cur++;
    	$scope.countdown=10;
    	$scope.stop();
        if($scope.cur==21){
            //console.log(Choices.getOption());
            $location.path('/thankyou/'+$routeParams.id);
        }
    	mytimeout = $interval($scope.onTimeout,1000,10);

		angular.element(".questiondiv").hide();
		angular.element(".questiondiv").slideDown();
    }

    $scope.increaseCur(0);
    //$scope.option = [];

}]);


surveyControllers.controller('thankCtrl', ['$scope','$interval','$location','$routeParams','Choices',
  function($scope, $interval, $location,$routeParams, Choices) {
    $scope.options = Choices.getOption();
}]);
