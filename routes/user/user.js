var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()
var User = require('../../models/user')
var userController = require('../../server/controllers/usercontroller/userCtrl.js')
var postController = require('../../server/controllers/usercontroller/postCtrl.js')

/*
    User Route
    - Contains user and its own posts,
    - with some CRUD (create,read,update,delete) operations
    - exports as "router" module. 
*/ 
router.route('/user')

    .get(userController.getAllUsers)
	.post(userController.createUser);
			
router.route('/user/:id')

	.get(userController.getUser)
	.put(userController.updateUser)		
	.delete(userController.removeUser);
        
router.route('/user/:id/posts')

    .get(postController.getAllPosts)  
    .post(postController.createPost);
    
router.route('/user/:id/posts/:postid')

    .get(postController.getPost)
    .put(postController.updatePost)   
    .delete(postController.removePost);   
     
module.exports = router;