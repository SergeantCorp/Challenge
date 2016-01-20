 var homeApp = angular.module('homeApp', [])    
 
    .controller('userController',function($scope,$http){
        var apiData = [], userNames = [] , userPosts = [];                
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
            var dataObject = {
                'username' : $scope.username,
                'password' : $scope.password,
                'email'    : $scope.email,
            }
            $http({
                method: 'POST',
                url : '/api/user',
                data : dataObject
            })
            .success(function(data,status,headers,config){
                console.log(data)
                $scope.allNames.push(dataObject.username)
            })
        }
        $scope.deleteUser = function(index){
            var user = userNames[index]
            var userId = 0;
            
            for(var i =0; i < apiData.length; i++){
                if(apiData[i].username === user){
                    userId = apiData[i]._id
                    console.log(userId + ' is the id of ' + user)
                }
            }      
            $http({
                method: 'DELETE',
                url:    '/api/user/' + userId
            })
            .success(function(data,status,headers,config){
                    console.log(data)
                    removeData(index,userNames)
            })  
            
        }
        $scope.sendPost = function(){
            var postOwner = $scope.username
            var post = $scope.postBody
            var postObject  = { 'body' : post}
            var ownerId = 0;
            for(var i =0; i<apiData.length;i++){
                if(apiData[i].username === postOwner){
                    ownerId = apiData[i]._id;
                    console.log(ownerId + "--" + postOwner + "-- " +post)
                    $http({
                        method :'POST',
                        url    :'/api/user'+'/'+ownerId +'/posts',
                        data   : postObject                       
                    })
                    .success(function(data,status,headers,config){
                        console.log(data)
                        userPosts.push({
                            'name'     : postOwner,
                            'pbody'    : post,
                            'pcreated' : new Date()
                        })
                    })
                }else{
                    console.log("user yok amk nereye yolluyon")
                }
            }
        }
        
        var getValues = function(apiData){
                     
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
       var removeData = function(index,array){
           if(index > -1){
                array.splice(index,1);
                console.log('new array is : ' + array)
            }else{
                console.log('index is < -1,so failed!')
            }
       }   
    });   