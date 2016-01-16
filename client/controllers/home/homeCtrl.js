 var homeApp = angular.module('homeApp', [])    
 
    .controller('listController',function($scope,$http){
        var apiData = [];                
        $http({
            method :'GET',
            url : '/api/user'
        })
        .success(function(data,status,headers,config){
            apiData = data
          getValues(apiData);       
        }) 
        $scope.showUser = true;
        $scope.showPost = true;
        $scope.toggleUser = function() {                                 
              $scope.showUser = !$scope.showUser         
        };
        $scope.togglePost = function() {                                 
              $scope.showPost = !$scope.showPost        
        };
        
        var getValues = function(apiData){
            var userNames = [] , userPosts = [];
          
          for(var i=0; i< apiData.length;i++){
              userNames[i] = apiData[i].username
              for(var j=0;j<apiData[i].posts.length;j++){                
                  userPosts.push({
                      'name'     : apiData[i].username,
                      'pbody'    : apiData[i].posts[j].body,
                      'pcreated' : apiData[i].posts[j].created
                  })
              }
          }
          
          $scope.allNames = userNames;
          $scope.allPosts = userPosts;
            console.log(userNames)
            console.log(userPosts)
        } 
               
             
        
        
 });