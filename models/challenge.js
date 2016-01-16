var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var ChallengeSchema = new Schema({
    
    id :   { type: Schema.ObjectId},
    body :          { type: String},
    created :       { type: Date, default: Date.now },
    active :        { type: Boolean },
    
});

module.exports = mongoose.model('Challenges', ChallengeSchema);