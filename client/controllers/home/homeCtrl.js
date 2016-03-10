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
    })
    .controller('registerController',function($scope,User){
     
     $scope.registerUser = function(){
            var postData = {
                'username' : $scope.username,
                'password' : $scope.password,
                'email'    : $scope.email,
            }
           User.RegisterUser(postData)
            .then(function(data){
                console.log(data)
                $scope.allNames.push(postData.username)
            })
            $scope.username = ''
            $scope.password = ''
            $scope.email    = ''                    
        }   
    })
    .controller('userListController', function($scope,Api,User){
        
        $scope.deleteUser = function(index){
            var user = $scope.allNames[index]
            Api.getApi()
            .then(function(api){
                User.DeleteUser(api,user) 
                .then(function(data){
                    removeData(index,$scope.allNames) 
                })
                                           
            });
           
        }
        
        $scope.openUserDialogModal = function(index){
            var user = $scope.allNames[index]        
            console.log(user)
            $scope.selectedUser = user;
            $scope.updateUser = function(){
                var newUserName = $scope.newName               
                var updatedObject = {'username' : newUserName}  
                Api.getApi()
                .then(function(api){
                    var userId = User.getUserIdByName(api,user)
                    User.UpdateUser(userId,newUserName,updatedObject)
                    .then(function(data){
                        console.log(data)
                        console.log(user + ' is updated to ' + newUserName)
                        removeData(index,$scope.allNames)
                        updateData(index,$scope.allNames,newUserName)              
                    })
                })            
    
            }
            $scope.newName = ''
            
                    
        }
        
    })
    .controller('messageController',function($scope,Api,User,Post){
        
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
    })
    .controller('messageListController',function($scope,Api,User,Post){
        
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