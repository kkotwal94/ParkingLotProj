var mongoose = require('mongoose');

var ViolationSchema = new mongoose.Schema({

date    : String,
location: String,
cause   : String,
vehicle : {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle'},
user    : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}


});

var Violation = mongoose.model('Violation', ViolationSchema);

module.exports = Violation;