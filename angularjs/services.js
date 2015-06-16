'use strict';

/* Services */


var surveyServices = angular.module('surveyServices', []);

surveyServices.service('Choices', function(){
  var options = [];

  return {
    getOption:function(){
      return options;
    },
    getOptionVal:function(i){
      return options[i];
    },
    setOptionVal:function(i,val){
      options[i]=val;
    }
  }
});