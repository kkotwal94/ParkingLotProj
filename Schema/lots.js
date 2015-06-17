var mongoose = require('mongoose');

var ParkingLotSchema = new mongoose.Schema({
	totalspots      : Number, 
	availablespots  : Number,
	location        : String,
});

var ParkingLot = mongoose.model('ParkingLot', ParkingLotSchema);

module.exports = ParkingLot;