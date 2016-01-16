var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PointSchema = new Schema({
    bravepoints :   { type : Number },
    funpoints :     { type : Number },
    intpoints :     { type : Number },
    sadpoints :     { type : Number }
});

module.exports = mongoose.model('Points', PointSchema);