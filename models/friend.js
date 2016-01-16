var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var post = require('./post').schema;
var challenge = require('./challenge').schema;
var point = require('./point').schema;
var achievement = require('./achievement').schema;

var FriendSchema = new Schema({
    id : { type : Schema.ObjectId},
    username : { type : String},
    posts : [post],
    challenges : [challenge],
    points : [point],
    achievements : [achievement]
});

module.exports = mongoose.model('Friends',FriendSchema);