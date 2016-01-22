
var User = require('../../../models/user');

var getAllPosts = function(req,res){
        User.findById(req.params.id , function(err,user){
            if(err) res.send(err);
            
            res.json(user.posts);
        })
}
var createPost = function(req,res){
        User.findById(req.params.id , function(err,user){
          if(err) res.send('Found no id err '+ err);
          console.log('Post message is : ' +req.body.body);
          console.log('id is : '  + req.params.id);
          console.log(user);
          
           user.posts.push({ body : req.body.body });
           user.save(function(err){
             if(err) res.send(err);
             res.json({message : 'Succes'});
          
          })
  
      })
}
var getPost = function(req,res){
        User.find({'posts._id' : req.params.postid },{"posts._id.$": true},function(err,user){
            if(err) res.send(err);
            res.json(user);
        })
}
var removePost = function(req,res){
        User.findOneAndUpdate({'_id' : req.params.id},
        {$pull : {posts : { '_id' : req.params.postid } } },function(err,user){
            if(err) res.send(err);
            user.save(function(err){
                if(err) res.send(err);
                res.json( {message: 'User post deleted!' });
            })
            
        })
}
var updatePost = function(req,res){
         User.findById(req.params.id , function(err,user){
            var post = user.posts.id(req.params.postid);
            console.log(post)
            post.body = req.body.body;
            user.save(function(err){
                if(err) res.send(err);
                res.json({message: 'User post updated! '});
            })
            
        })
}
module.exports = {
    'getAllPosts'   : getAllPosts,
    'createPost'    : createPost,
    'getPost'       : getPost,
    'updatePost'    : updatePost,
    'removePost'    : removePost
}