
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var friend = require('./friend').schema;
var post = require('./post').schema;
var challenge = require('./challenge').schema;
var useroption = require('./option').schema;
var achievement = require('./achievement').schema;
var point = require('./point').schema;

var UserSchema = new Schema({
    
  id :          { type : Schema.ObjectId },
  username :    { type : String },
  password:     { type : String },
  email :       { type : String },
  created :     { type : Date, default: Date.now },
  modified :    { type : Date, default: Date.now },
  posts:        [post],
  useroptions:  [useroption],
  challenges :  [challenge],
  friends :     [friend],
  points:       [point],
  achievements: [achievement]
  
 });
 
 module.exports = mongoose.model('Users', UserSchema);