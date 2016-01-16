var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var friend = require('./friend').schema;


var PostSchema = new Schema({
    
    id :    { type : Schema.ObjectId },
    body :      { type : String },
    created:    { type : Date , default : Date.now },
    modified:   { type : Date , default : Date.now },
    
    
});

module.exports = mongoose.model('Posts', PostSchema);