 angular.module('homeApp')
  .factory('User', function($http,$q){
      
     var factory = {};
        
     factory.getAllUser = function(api){
         var user = [];
         for(var i = 0; i<api.length;i++)
         {
             user[i] = api[i].username;
         }
         return user;
     }
     factory.getUserIdByName = function(api,name){
         var userId = 0;
         for(var i = 0 ; i < api.length; i++)
         {
             if(api[i].username == name)
             {
                 userId = api[i]._id;
             }
         }
         return userId;
     }
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
     factory.RegisterUser = function(postData){
         var deferred = $q.defer();
         
         $http({
             method: 'POST',
             url: '/api/user',
             data: postData
         })
         .success(function(data){
             deferred.resolve(data);
         })
         return deferred.promise;
     }
     factory.UpdateUser = function(userId,newUserName,updatedObject){
         var deferred = $q.defer();        
         $http({
                    method : 'PUT',
                    url    : '/api/user/' + userId,
                    data   : updatedObject
         })
         .success(function(data){
             deferred.resolve(data);
         })
         return deferred.promise;
     }
     factory.DeleteUser = function(api,user){
          var userId = 0;
          var deferred = $q.defer();
          for(var i =0; i < api.length; i++)
          {
                if(api[i].username === user){
                    userId = api[i]._id
                    console.log(userId + ' is the id of ' + user)
                }
            }      
            $http({
                method: 'DELETE',
                url:    '/api/user/' + userId
            })
            .success(function(data){
                    deferred.resolve(data);                                                   
            }) 
         
         return deferred.promise;
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
  });