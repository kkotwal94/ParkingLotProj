var express = require('express');
var app = express();
var port = process.env.PORT || 8080; // use server port or 8080
var mongoose = require('mongoose'); // require mongo package
var passport = require('passport'); //for authentication
var flash = require('connect-flash');

var morgan = require('morgan'); //morgan npm http request logger
var cookieParser = require('cookie-parser');//remembering cookies for idpass
var bodyParser = require('body-parser');//body parsing middleware
var session = require('express-session');//remembering our session/session logging
var DB = require('./Config/database.js'); //our database information, in config folder

//routing configuration
//=====================

mongoose.connect(DB.url);
require('./Passport/passport')(passport); //pass passport for config
app.use(morgan('dev')); //log every request
app.use(cookieParser()); //reading our cookies
app.use(bodyParser()); //getting body info from html GET
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs');

//required for passport
app.use(session({secret: 'karan'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



require('./Routes/routes.js')(app, passport); //pass in app and passport to our routes

app.listen(port);
console.log('Listening to magic in the clouds at' + port);