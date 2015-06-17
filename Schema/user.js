var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


//define the schema for our users

var userSchema = mongoose.Schema({

   local            : {
       email        : String,
       password     : String,
	   firstName    : String, 
	   lastName     : String,
	   age          : String,
	   vehicles     : [{type: mongoose.Schema.Types.ObjectId, ref: 'Vehicles'}],
	   mainvehicle  : String,
	   violation    : [String],
	   violations   : [{type: mongoose.Schema.Types.ObjectId, ref: 'Violation'}],
	   currentIndex : {type: Number, default:0},
	   random       : {type: Number, default:0},
	   slot         : String,
	   lot          : String,
	   license      : String,
       tag          : String,
	   department   : String,
       hangingtag   : String	   
   },

   facebook         : {
       id           : String,
       token        : String,
       email        : String,
       name         : String
   },
   twitter          : {
       id           : String,
       token        : String,
       displayName  : String,
       username     : String
   },
   google           : {
       id           : String,
       token        : String,
       email        : String,
       name         : String
   }
});

//methods
//generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


//make it modular and pass it to server.js
module.exports = mongoose.model('User', userSchema);