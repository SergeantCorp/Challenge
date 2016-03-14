  angular.module('homeApp', [])  
 
    .controller('mainController',function($scope,User,Post,Api){

        Api.getApi()
        .then(function(api)
        {   
              $scope.allNames = User.getAllUser(api);
              $scope.allPosts = Post.getAllPosts(api);                             
        });
        
        $scope.showUser = true;
        $scope.showPost = true;
        $scope.showUserForm = true;
        $scope.showPostForm = true;
        $scope.toggleUser = function() {                                 
             $scope.showUser = !$scope.showUser         
        };
        $scope.togglePost = function() {                                 
             $scope.showPost = !$scope.showPost        
        };
        $scope.toggleUserForm = function(){
             $scope.showUserForm = !$scope.showUserForm
        }
        $scope.togglePostForm = function(){
             $scope.showPostForm = !$scope.showPostForm
        }                                   
    });    
      var removeData = function(index,array){
           if(index > -1){
                array.splice(index,1);
                console.log('new array is : ')
                console.log(array)
            }else{
                console.log('index is < -1,so failed remove!')
            }
       }
       var updateData = function(index,array,value){
           if(index > -1){
               array.splice(index,0,value)
               console.log('new array is : ')
               console.log(array)              
           }else{
               console.log('index is <-1 , so failed update!')
           }
       }
       var getPostIndex = function(post,array){
           var index = array.indexOf(post);
           return index
       }   