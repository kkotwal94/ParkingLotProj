var mongoose = require('mongoose');

var VehiclesSchema = new mongoose.Schema({
	color : String, 
	type  : String,
	model : String,
	make  : String,
	license : String,
	violation: [{type: mongoose.Schema.Types.ObjectId, ref: 'Violation'}],
	inUse : Boolean,
	owner : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var Vehicles = mongoose.model('Vehicles', VehiclesSchema);

module.exports = Vehicles;