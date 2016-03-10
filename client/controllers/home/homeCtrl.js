  angular.module('homeApp', [])  
 
    .controller('userController',function($scope,$http,User){
        
       var self = this;
        
        User.getApi()
        .then(function(api)
        {   
                 self.data = api;
                 $scope.allNames = User.getAllUser(self.data);
                 $scope.allPosts = User.getAllPosts(self.data);
                 
                 
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
         $scope.deleteUser = function(index){
            var user = $scope.allNames[index]
            User.getApi()
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
                User.getApi()
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
         $scope.deleteUserPost = function(post,index){
            var postbody = post.pbody
            var username = post.name 
                     
           
            User.getApi()
            .then(function(api){                                            
                var postId = User.getSelectedPostId(api,postbody)                                
                var userId = User.getUserIdByName(api,username)
                User.DeleteUserPost(userId,postId)
                .then(function(data){                    
                     var index = getPostIndex(post,$scope.allPosts)
                     removeData(index,$scope.allPosts)
                                       
                }) 
            })                                                                       
        }
        
        $scope.sendPost = function(){
            var name = $scope.username
            var post = $scope.postBody;
            if(typeof name !== 'undefined' && typeof post !== 'undefined')
            {
                 User.getApi()
                 .then(function(api){
                     var userId = User.getUserIdByName(api,name);
                     User.sendPost(api,userId,name,post)
                     .then(function(data){                      
                         $scope.allPosts.push({
                                'ownerId'  : userId,
                                'name'     : name,
                                'pbody'    : post,
                                'pcreated' : new Date()
                          })
                                            
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
  
        /*
         * service conf need...
         *  
        var apiData = [], userPosts = [];     
        $scope.updatePostDialogModel = function(post){
            var selectedPost = post
            var userId = getUserId(selectedPost.name)
            console.log(selectedPost)
            $scope.postBody = selectedPost.pbody
            $scope.selectedPostUser = selectedPost.name
            $scope.updatePost = function(){
                var postIndex =userPosts.indexOf(post)
                var newPostBody = $scope.postBody
                var postId = 0
                var newPostObject = { 
                    'ownerId'  : post.ownerId,
                    'name'     : post.name,
                    'pbody'    : newPostBody,
                    'pcreated' : post.pcreated
                }
                for(var i=0; i<apiData.length;i++){
                    for(var j=0; j<apiData[i].posts.length;j++){
                        if(apiData[i].posts[j].body === selectedPost.pbody){                       
                             postId = apiData[i].posts[j]._id                       
                            }                       
                        }
                }           
                $http({
                    
                    method : 'PUT',
                    url    : '/api/user/' + userId + '/posts/' + postId,
                    data   : {'body' : newPostBody}
                    
                }).success(function(data,status,headers,config){
                    
                    console.log(data)
                    removeData(postIndex,userPosts)
                    updateData(postIndex,userPosts,newPostObject)
                    
                })   
            }
        }*/ 
             
    });   