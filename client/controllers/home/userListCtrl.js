angular.module('homeApp').controller('userListController', function($scope,Api,User){
        
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
        
    });  