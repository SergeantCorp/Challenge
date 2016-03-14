angular.module('homeApp').controller('messageListController',function($scope,Api,User,Post){
        
        $scope.deleteUserPost = function(post,index){
            var postbody = post.pbody
            var username = post.name 
                     
           
            Api.getApi()
            .then(function(api){                                            
                var postId = Post.getSelectedPostId(api,postbody)                                
                var userId = User.getUserIdByName(api,username)
                Post.DeleteUserPost(userId,postId)
                .then(function(data){                    
                     var index = getPostIndex(post,$scope.allPosts)
                     removeData(index,$scope.allPosts)
                                       
                }) 
            })                                                                       
        }             
        $scope.updatePostDialogModel = function(post){
            var selectedPost = post
            
            console.log(selectedPost)
            $scope.postBody = selectedPost.pbody
            $scope.selectedPostUser = selectedPost.name
            $scope.updatePost = function(){
                var postIndex = getPostIndex(post,$scope.allPosts)
                console.log(postIndex)
                var newPostBody = $scope.postBody               
                var newPostObject = { 
                    'ownerId'  : post.ownerId,
                    'name'     : post.name,
                    'pbody'    : newPostBody,
                    'pcreated' : post.pcreated
                }
                Api.getApi()
                .then(function(api){
                    var postId = Post.getSelectedPostId(api,post.pbody)
                    var userId = User.getUserIdByName(api,post.name)
                    Post.UpdatePost(userId,postId,newPostBody)
                    .then(function(data){
                          
                    })                   
                })
                 removeData(postIndex,$scope.allPosts)
                 updateData(postIndex,$scope.allPosts,newPostObject)                           
            }
        }
    });