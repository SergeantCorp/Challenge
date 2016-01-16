var express = require('express');
var web = express.Router();
//home router

//Home GET request route       
web.route('/')       
    .get(function(req,res) {
     //res.json({  message: 'JSON Home Route response.'});
     res.render('homejade');
    });
    
 module.exports = web;
