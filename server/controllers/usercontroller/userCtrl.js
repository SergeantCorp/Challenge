var express = require('express');
var mongoose = require('mongoose');
var User = require('../../../models/user');

var getAllUsers = function(req,res){
        User.find(function(err,user){
	    if(err) res.send(err);			
    	res.json(user);
		});
}
var createUser = function(req,res){
        var user = new User();
		user.username  = req.body.username;
		user.password = req.body.password;
        user.email = req.body.email;
        
		console.log('name: ' + user.username + ' password: ' + user.password
        + ' email: ' + user.email + ' created: ' + user.created);
		
		user.save(function(err){
			if(err) res.send(err);
			
			res.json({ message : 'Added a new user'});
			})
}
var getUser = function(req,res){
         User.findById(req.params.id , function(err,user){
			if(err) res.send(err);
			
			res.json(user);			
		});
}
var updateUser = function(req,res){
        User.findById(req.params.id, function(err,user){
			if(err)  res.send(err);
			
			user.username = req.body.username;
			user.save(function(err){
				if(err) res.send(err);
				
				res.json({message : 'User updated!'});
				console.log(user.username);
			});					
		});
}
var removeUser = function(req,res){
         User.remove({ _id: req.params.id }, function(err,user){
			if(err) res.send(err);
				
			res.json({ message: 'Succesfully deleted user.'});
			
			});
}
module.exports = {
    'getAllUsers' : getAllUsers,
    'createUser' : createUser,
    'getUser' : getUser,
    'updateUser' : updateUser,
    'removeUser' : removeUser
}
