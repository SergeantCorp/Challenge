var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AchievementSchema = new Schema({
    
    id :              Schema.ObjectId,
    body :            { type: String},
    
    
});

module.exports = mongoose.model('Achievements', AchievementSchema);