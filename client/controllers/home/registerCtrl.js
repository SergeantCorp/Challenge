angular.module('homeApp').controller('registerController',function($scope,User){
     
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
    });