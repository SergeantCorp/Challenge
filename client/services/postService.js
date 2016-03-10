angular.module('homeApp')
 .factory('Post', function($http,$q){
     var factory = {};
     
     factory.getSelectedPostId = function(api,postbody){
         var postId = 0;
         
         for(var i=0; i<api.length;i++)
            {
                for(var j=0; j<api[i].posts.length;j++)
                {
                    if(api[i].posts[j].body === postbody){
                        
                        postId = api[i].posts[j]._id
                        console.log('postid from service -->' + postId)                      
                    }                      
                }
            }       
         return postId;
     }
     
     factory.getAllPosts = function(api){
         
         var userNames = [], userPosts = []           
          for(var i=0; i< api.length;i++)
          {
              userNames[i] = api[i]
              for(var j=0;j<api[i].posts.length;j++)
              {                
                  userPosts.push({
                      'ownerId'  : api[i]._id,
                      'name'     : api[i].username,
                      'pbody'    : api[i].posts[j].body,
                      'pcreated' : api[i].posts[j].created
                  })
              }
          }
       return userPosts;      
     }
     
     factory.sendPost = function(api,userId,name,post){
         var deferred = $q.defer();
         var postObject  = { 'body' : post };
                       
          console.log(userId + "--" + name + "-- " +post)
          $http({
                method :'POST',
                url    :'/api/user'+'/'+ userId +'/posts',
                data   : postObject                       
          })
          .success(function(data){
                deferred.resolve(data);
                console.log(data);                   
          })
                     
         return deferred.promise;
     }
     
     factory.DeleteUserPost = function(userId,postId){
         var deferred = $q.defer();
         
         $http({
                method : 'DELETE',
                url    : '/api/user/' + userId + '/posts/' + postId 
            })
            .success(function(data,status,headers,config){               
                deferred.resolve(data)             
            }) 
         
         return deferred.promise;
     }
     
     factory.UpdatePost = function(userId,postId,newPostBody){
         var deferred = $q.defer();
         
          $http({               
                method : 'PUT',
                url    : '/api/user/' + userId + '/posts/' + postId,
                data   : {'body' : newPostBody}                   
          })
          .success(function(data,status,headers,config){                  
                deferred.resolve(data);                                 
          })  
         
         return deferred.promise;
     }
     
     
     return factory;
 })