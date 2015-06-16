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
            var num = $scope.questions[$scope.cur-1].number;
            Choices.setOptionVal($scope.cur-1,value);
            Choices.setNumberVal($scope.cur-1,num);
        }
    	$scope.cur++;
    	$scope.countdown=10;
    	$scope.stop();
        mytimeout = $interval($scope.onTimeout,1000,10);
        if($scope.cur==21){
            //console.log(Choices.getOption());
            $scope.stop();
            $location.path('/thankyou/'+$routeParams.id);
        }

		angular.element(".questiondiv").hide();
		angular.element(".questiondiv").slideDown();
    }

    $scope.increaseCur(0);
    //$scope.option = [];
}]);


surveyControllers.controller('thankCtrl', ['$scope','$interval','$location','$routeParams','Choices','PostResponse',
  function($scope, $interval, $location,$routeParams, Choices, PostResponse) {
    $scope.data = {};
    $scope.data.options = Choices.getOption();
    $scope.data.number = Choices.getNumber();
    $scope.data.id = $routeParams.id;
    $scope.result = PostResponse.save($scope.data,function(response,header){
        console.log("Successful");
        if(response.result=="Passed"){
            $scope.res = "Congratulations! You have received extra 20 cents for your brilliant answers."
        }
        else{
            $scope.res = "Unfortunately, your answers do not allow us to pay you extra."
        }
        console.log(response.result);
    },function(response,header){
        console.log("Failed");
    });
}]);
