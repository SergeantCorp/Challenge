angular.module('homeApp').controller('messageController',function($scope,Api,User,Post){
        
         $scope.sendPost = function(){
            var name = $scope.username
            var post = $scope.postBody;
            if(typeof name !== 'undefined' && typeof post !== 'undefined')
            {
                Api.getApi()
                 .then(function(api){
                     var userId = User.getUserIdByName(api,name);
                     Post.sendPost(api,userId,name,post)
                     .then(function(data){                      
                                                                   
                     })
                     $scope.allPosts.push({
                                'ownerId'  : userId,
                                'name'     : name,
                                'pbody'    : post,
                                'pcreated' : new Date()
                     })
                 })                               
                $scope.username = ''
                $scope.postBody = ''
            }else{
                console.log('Degerler bosgeldi');
                $scope.username = ''
                $scope.postBody = '' 
            }                               
        }
    });