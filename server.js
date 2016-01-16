
/// <reference path="typings/tsd.d.ts" />
/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/express/express.d.ts" />

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');
var jade = require('jade');
var path = require('path');
var app = express();
var router = express.Router();
var web = express.Router();
var configure = require('./config/config.js');
var verifyContent = require('./config/verifyContent');

var user_route = require('./routes/user/user');
var user_auth = require('./routes/authenticate');
var home_route = require('./routes/home/home');
//Port
var port = process.env.PORT || 1337; 

//view engine

app.set('views', path.join(__dirname + '/client/views'));
app.set('view engine', 'jade')
//Middleware confs

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); */
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/client')));
app.use('/api',router);
app.use('/',web);
//Db Connections
mongoose.connect(configure.database);
app.set('soSecret',configure.secret);


// Routes

// Authentication
//router.post('/authenticate',user_auth);
// Verification
//router.use(verifyContent);

// Web Routes
web.get('/',home_route);
// API Routes
// - /users
router.get('/user',user_route);
router.post('/user',user_route);
// - /users/:userid
router.get('/user/:id',user_route);
router.delete('/user/:id',user_route);
router.put('/user/:id',user_route);

// - /user/:id/posts
router.get('/user/:id/posts' , user_route);
router.post('/user/:id/posts' , user_route);

// - /user/:id/posts/:postid
router.get('/user/:id/posts/:postid' , user_route);
router.put('/user/:id/posts/:postid' , user_route);
router.delete('/user/:id/posts/:postid' , user_route);


//Server Start
app.listen(port);
console.log('Server started at port ' + port);