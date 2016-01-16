var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = mongoose.model('Users');
var configure = require('./config');

var userAuthentication = function(req,res){
      User.findOne({
			username: req.body.username
		},function(err,user){
			if(err) throw err;
			
			if(!user) {
				res.json({
					succes: false ,
					message: 'Cannot authenticate.User not found!'
				});
			}else if(user){
				if(user.username != req.body.username){
					res.json({
						succes: false,
						message: 'Cannot authenticate.User name is wrong.'
					});
				}else{
					var token= jwt.sign(user,configure.secret,{
						expiresIn : 86400 
					});
					res.json({
						succes : true,
						message : 'Succesfully authenticated. ',
						token: token
					});
				}
			}
			
		});
}
module.exports = userAuthentication;