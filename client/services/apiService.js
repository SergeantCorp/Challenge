angular.module('homeApp')
 .factory('Api',function($http,$q){
     var factory = {};
     
     factory.getApi = function(){
         var deferred = $q.defer();
         $http({
               method: 'GET',
               url : '/api/user'
         })
         .success(function(data){
               deferred.resolve(data);                 
         })
         return deferred.promise;
     }
     
     return factory;
 })