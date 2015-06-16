'use strict';

/* Services */


var surveyServices = angular.module('surveyServices', []);

surveyServices.service('Choices', function(){
  var options = []; //[1,0,2,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,1,2];
  var num = []; //[1,4,102,103,104,105,101,106,107,108,109,110,111,112,113,114,115,116,2,3];

  return {
    getOption:function(){
      return options;
    },
    getOptionVal:function(i){
      return options[i];
    },
    setOptionVal:function(i,val){
      options[i]=val;
    },
    getNumber:function(){
      return num;
    },
    getNumberVal:function(i){
      return num[i];
    },
    setNumberVal:function(i,val){
      num[i]=val;
    },
  }
});