 module.exports = function(app, passport) {
     //homepage
     var mongoose = require('mongoose');
	 require('../Schema/user.js')
     require('../Schema/vehicles.js');
     require('../Schema/lots.js');
	 require('../Schema/violations.js');
     var async = require('async');
	 var User = mongoose.model('User');
     var Vehicles = mongoose.model('Vehicles');
     var ParkingLot = mongoose.model('ParkingLot');
	 var Violation = mongoose.model('Violation');
	 var PrimaryCarIndex = 0;
	 var aPrimaryCarIndex = 0;
	 var employees = [];
	 var veh = [];
	 var veh2 = [];
	 var veh3 = [];
	 var white = [];
	 var yellow = [];
	 var purple = [];
	 var allusers = [];
	
	 app.get('/', function(req, res) {
         res.render('index.ejs'); //load the index.ejs file
         });
		 
	app.get('/data', isAdmin, function(req, res) {
		res.render('datatable.ejs');
	});
	
	
	//Get and post request for login
	 app.get('/login', function(req, res) {
         //render the page and pass in any flash data if it exists
         res.render('login.ejs', { message: req.flash('loginMessage')});
     });
		
    //Post request for our login, on success and failure		
	app.post('/login', passport.authenticate('local-login',  {
		
		
         successRedirect : '/profile', //redirect to the secure profile section
         failureRedirect : '/login', //redirect back to the signup page
         failureFlash : true //allow flash messages
		
	 }) 
	 );
	 
	app.get('/dashboard', isAdmin, function(req, res) {
		res.render('dashboard.ejs'); 
	 });
		
	
	 //getting our signup page
	 app.get('/signup', function(req, res) {
     //render the page and pass inany flash data
     res.render('signup.ejs', { message: req.flash('signupMessage')});
   });
  
    //getting our lottery page(so far with search function and not functioning lottery function)
	app.get('/lottery',isAdmin, function(req, res) {
		res.render('lottery.ejs')
	});
	
	app.post('/generateTags', isAdmin, function(req, res) {
		allusers.forEach(function(employee) {
			User.findById(employee.id, function(err, res) {
				if (err!= null){
					
				} else {
					console.log("Response User : " + res);
					console.log("Employee: " + employee);
					employee.local.tag = (Math.random() + 1).toString(36).substring(7);
					employee.local.hangingtag = (Math.random() + 1).toString(36).substring(7);
					
					employee.save();
					
				}
			
			});
		});
	});
	
	app.post('/lottery', isAdmin, function(req, res) {
		yellow.length = 0;
		white.length = 0;
		purple.length = 0;
	
		
		
	for (var z = 0; z < allusers.length; z++) {
		if (allusers[z].local.lot === "White") {
		
			//console.log("White!");
			white.push(allusers[z]);
		
		}
		else if(allusers[z].local.lot === "Purple"){
			//console.log("Purple!");
			purple.push(allusers[z]);
		}
		
		else if(allusers[z].local.lot === "Yellow"){
			//console.log("Yellow");
			yellow.push(allusers[z]);
		}
		
	}
		
		console.log("Yellow: " + yellow); //corrected
		console.log("White: " + white); //corrected
		console.log("Purple: " + purple); //corrected 
		
		shuffle(yellow);
		shuffle(white);
		shuffle(purple);
		//console.log("White: " + white); //corrected
		var a = 0;
		function finalShuffle() {
		white.forEach(function(slot) {
			User.findById(slot.id, function(err, res) {
				if (err!= null){
					
				} else {
					//console.log(slot);
					slot.local.slot = a+1;
					console.log(slot.local.slot);
					console.log("A : " + a);
					slot.save();
					a++;
				}
			});
		});
		a = 0;
		}
		
		
		var b = 0;
		function finalShuffle_2() {
		yellow.forEach(function(slot) {
			User.findById(slot.id, function(err, res) {
				if (err!= null){
					
				} else {
					//console.log(slot);
					slot.local.slot = b+1;
					console.log(slot.local.slot);
					console.log("B :" + b);
					slot.save();
					b++;
				}
			});
		});
		b = 0;
		}
		
		var c = 0;
		function finalShuffle_3() {
		purple.forEach(function(slot) {
			User.findById(slot.id, function(err, res) {
				if (err!= null){
					
				} else {
					//console.log(slot);
					slot.local.slot = c+1;
					console.log(slot.local.slot);
					console.log("C : " + c);
					slot.save();
					c++;
				}
			});
		});
		c = 0;
		}
		
		finalShuffle();
		finalShuffle_2();
		finalShuffle_3();
	
		res.json(req.body);
		
	});
	
	//getting access to a user list, from the user perspective(not admin view)
	app.get('/userList', isLoggedIn, function(req, res) {
		res.render('ulottery.ejs')
	});
	
   //process the signup form
   //app.post('/signup', do all our passport stuff here')
   app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', //redirect to profile
        failureRedirect : '/signup' , //redirect back to the signup page
        failureFlash : true //allow flash messages
   }));
   
   //get request for all our users, only admin view allowing admin to make edits ats allUser.ejs
   app.get('/getUsers', isAdmin, function(req, res) {
	  res.render('allUsers.ejs', {
		    user: req.user,
		    
             });
   });
   //get All Users, however we are grabbing data from the database, might be redundant can possibly find another way to do this
   app.get('/allUsers', isLoggedIn, function(req, res)  {
	 
	 //var total = 10;
	 //number_processed = 0;
     

           User.count({},function(err, count) {
			  total = count;
			  console.log("Total count is: " + count);
		   });
           User.find({} , function(err, users) {
              if(!err){
				     allusers = users;
                    res.json(users);
              }
              /*number_processed  = number_processed  + 1;
              if(number_processed === total){

                 res.json(employees);
				 
              }*/
			  //console.log("Users: " + users);
              //console.log("GET Json: " + employees);
			  //res.json(employees);
            });
     
 employees.length = 0;
		
   });
   
   app.get('/profile/:id/user', isLoggedIn, function(req, res) {
	   var id = req.params.id;
	  User.findById(id, function(err, user) {
		  if(err) throw err;
		  res.json(user);
	  });
   });
   
    app.get('/user', isLoggedIn, function(req, res) {
	   
	  User.findById(req.user, function(err, user) {
		  if(err) throw err;
		  res.json(user);
	  });
   });
   
   app.get('/allVehicles', isAdmin, function(req, res) {
	    Vehicles.find({} , function(err, vehicle) {
              if(!err){
				   
                    res.json(vehicle);
              }
		});
	   
   });
   /****TO DO: FIND OUT WHY IF STATEMENT ISNT GETTIN HIT ASYNCH CALLBACK ****/
   app.get('/allVUsers', isAdmin, function(req, res) {
	   var list = [];
	   var count = 0;
	   var usertotal = 0;
	   var total = 0;
	   User.find({}, function (err, user) {
		   console.log("Users: " +  user.length);
		   usertotal = user.length;
	   });
	   Vehicles.find({} , function(err, vehicle) {
		   //console.log(vehicle);
		   total = vehicle.length;
		   console.log("Total Vehicles: " + total);
	   for(var i = 0; i < total; i++) {
		   if(vehicle[i].make != "Add Vehicle Make") {
			
		   User.findById(vehicle[i].owner, function(err, user) {
			   if(!err) {
			   list.push(user);
			   //console.log(list);
			   //console.log(user);
			   count = count + 1;
			   console.log("Count: " + count);
			   }
			   console.log(count);
			   console.log(total);
			   console.log(usertotal);
			   if(count === total - user) {
		   console.log("Count:" + count);
		   console.log("T: " + total - usertotal);
                    res.json(list); 
		}
		   });
		   }
		   
	   }
	   });
	   
              
	
   });
   
   /**************************************************************/
   
   app.get('/allViolations', isAdmin, function(req, res) {
	   var list = [];
   Violation.find({}, function(err, viol) {
	  list = viol; 
	  
	  res.json(list);
   });
   
   });
   
   app.get('/allViolation', isAdmin, function(req, res) {
	   res.render('allViolations.ejs')
	   
   });
   app.get('/vehicles', isAdmin, function(req, res){ 
      res.render('allVehicles.ejs');
	  
   });
   app.get('/veh/:vehicle', isLoggedIn, function(req, res) {
	   var id = req.params.vehicle;
	   Vehicles.findById(id, function(err, vehicle) {
		   if (err) throw err;
		   res.json(vehicle);
	   });
   });
   
   app.get('/vehicle/:vehicle', isLoggedIn, function(req, res) {
	   res.render('editVehicle.ejs');
   });
   
    app.get('/profile/:id/vehicles/:vehicle', isAdmin, function(req, res) {
	   res.render('editAdminVehicle.ejs');
   });
   //remove vehicle
   app.post('/profile/:vehicle/remove', isLoggedIn, function(req, res) {
	   var id = req.params.vehicle;
	   Vehicles.findByIdAndRemove(id, function(err, vehicle) {
		   if (err) throw err;
		   console.log("Vehicle deleted!");
		   res.json(vehicle);
		   var uid = req.user.id;
	   
	   });
	   
	   User.findById(uid, function(err, user) {
		   if (err) throw err;
		   user.local.currentIndex = 0;
		   user.save();
	   });
	   PrimaryCarIndex = 0;
	   aPrimaryCarIndex = 0;
   });
   
   
   app.post('/profile/:id/:vehicle/remove', isLoggedIn, function(req, res) {
	   var id = req.params.vehicle;
	   var uid = req.params.id;
	   Vehicles.findByIdAndRemove(id, function(err, vehicle) {
		   if (err) throw err;
		   console.log("Vehicle deleted!");
		   res.json(vehicle);
		   
	   
	   });
	   
	   User.findById(uid, function(err, user) {
		   if (err) throw err;
		   user.local.currentIndex = 0;
		   user.save();
	   });
	   PrimaryCarIndex = 0;
	   aPrimaryCarIndex = 0;
   });
	   
   
 app.post('/veh/:vehicle', isLoggedIn, function(req, res) {
	 var id = req.params.vehicle;
	 Vehicles.findById(id, function(err, vehicle) {
		 console.log(vehicle);
		 if (err) throw err;
		
		 if(req.body.model === "") {
			 req.body.model = vehicle.model;
		 }
		 if(req.body.make === "") {
			 req.body.make = vehicle.make;
		 }
		 if(req.body.type === "") {
			 req.body.type = vehicle.type;
		 }
		 if(req.body.color === "") {
			 req.body.color = vehicle.color;
		 }
		 if(req.body.license === "") {
			 req.body.license = vehicle.license;
		 }
		 vehicle.model = req.body.model;
		 vehicle.make = req.body.make;
		 vehicle.type = req.body.type;
		 vehicle.color = req.body.color;
		 vehicle.license = req.body.license;
		 vehicle.save();
		 res.json(vehicle);
	 });
	 
 });
 
 
   app.get('/about', isAdmin, function(req, res) {
	   res.render('about.ejs');
	   });
	   
	app.get('/help', isAdmin, function(req, res) {
		res.render('help.ejs');
	});
	
	app.get('/rules', isAdmin, function(req, res) {
		res.render('rules.ejs');
	});
   //when viewing every users profile, we view it from their profile id, id is equal to that users id, violations shows that users id
   app.get('/profile/:id/violations', isLoggedIn, function(req, res){
	   var id = req.params.id;
	    User.findById(id, function(err, user) {
			if (err) throw err;
			res.json(user);
		});
   });
   

	   app.get('/profile/:id/violation', isAdmin, function(req, res) {
	    var id = req.params.id;
		var uviolations = [];
		var numbersprocessed = 0;
		var viols = new Array();
	   	User.findById(id, function(err, user) {
			if (err) throw err;
			uviolations = user.local.violations;
			total = uviolations.length;
			
		uviolations.forEach(function(uviol) {
				
				Violation.findById(uviol, function(err, violation){ 

				if(!err) {
					//console.log(JSON.parse(violation));
					viols.push(violation);
					
					//console.log("Current array" + viols);
				    numbersprocessed = numbersprocessed + 1;	
					//console.log(numbersprocessed);
					
				}
				
				
				if (numbersprocessed === total) {
					
				res.json(viols);
				//viols.length = 0;
			}
			});
			});
			
			});
			
			 

			
		});
  
  
   //this gets our violations json, so we know what violations exist (@res.json(user))
   app.get('/violations', isLoggedIn, function(req, res) {
	  	    var id = req.user.local.id;
		var uviolations = [];
		var numbersprocessed = 0;
		var viols = new Array();
	   
			
			uviolations = req.user.local.violations;
			total = uviolations.length;
			
		uviolations.forEach(function(uviol) {
				
				Violation.findById(uviol, function(err, violation){ 

				if(!err) {
					//console.log(JSON.parse(violation));
					viols.push(violation);
					
					
				    numbersprocessed = numbersprocessed + 1;	
					console.log(numbersprocessed);
					
				}
				
				
				if (numbersprocessed === total) {
					
				res.json(viols);
				//viols.length = 0;
			}
			});
			});
			
			
			
			 

			
		});
   
   
   //this is us adding violations to each user when necessary, at their profile page, the POST request is sent here and the json is modified, and updated via the DOM
   app.post('/profile/:id/addViolations', isAdmin, function(req, res) {
	    var id = req.params.id;
		console.log(id);
		User.findById(id, function(err, user) {
			if (err) throw err;
			user.local.violation.push(req.body.violation);
			user.save();
			res.json(user);
		});
		
   });
   
   //adding new violation to database
    app.post('/profile/:id/addViolation', isAdmin, function(req, res) {
	    var id = req.params.id;
		console.log(id);
		var vio = new Violation(req.body);
		
		User.findById(id, function(err, user) {
			if (err) throw err;
			 vio.user = user;
             
			 if (err) throw err;
			 Vehicles.findById(user.local.vehicles[user.local.currentIndex], function(err, veh) {
				vio.vehicle = veh;
				veh.violation.push(vio);
				vio.save();
				veh.save();
			 });

		
			
		
			user.local.violations.push(vio);
			user.save();
			res.json(user);
		});
		
   });
   
    app.get('/profile/:id/addViolation', isAdmin, function(req, res) {
	   var id = req.params.id;
	   res.render('addViolation.ejs');
   });

   //This is grabbing our addViolations page, this is a templated file hence the .ejs, it can also only be viewed by the admin user
   app.get('/profile/:id/addViolations', isAdmin, function(req, res) {
	   var id = req.params.id;
	   res.render('addViolation.ejs');
   });

   
   //this is getting individual users vehicles and getting them from the admin view, so we can select their vehicle as a admin if necessary
   app.get('/profile/:id/vehicles', isAdmin, function(req, res) {
	  var id = req.params.id;
	  User.findById(id, function(err, user) {
		     console.log(id);
			if (err) throw err;
     number_processed = 1;
     total = user.local.vehicles.length;

     for (var i = 1; i < total; i++){
           Vehicles.findById(user.local.vehicles[i], function(err, vehicle) {
              if(!err){
                    veh2.push(vehicle);
              }
              number_processed  = number_processed  + 1;
              if(number_processed === total){

                 res.json(veh2);
				 
              }
              

            });
	 }
	 });
     
 veh2.length = 0;
});	  
   
 //this is the templated file to edit a profile from the admin 
   app.get('/profile/:id/editInfo',isAdmin, function(req, res) {
     res.render('adminprofileEdit.ejs');
   });
   
   app.get('/profile/:id/addAdminVehicle', isAdmin, function(req, res) {
		res.render('addAdminVehicle.ejs'); 
	 });
   
 //this is where we make our changes from our admin view, in this view parking slots and other things can be edited
  app.post('/profile/:id/editInfo',isAdmin, function(req, res) {
	  var id = req.params.id;
	  console.log(id);
	  User.findById(id, function(err, user) {
		  if (err) throw err;
		  if (req.body.firstName === '') {
				req.body.firstName = user.local.firstName;
			}
			if (req.body.lastName === '') {
				req.body.lastName = user.local.lastName;
			}
			if (req.body.age === '') {
				req.body.age = user.local.age;
			}
			if (req.body.department === '') {
				req.body.department = user.local.department;
			}
			if (req.body.lot === '') {
				req.body.lot = user.local.lot;
			}
			if (req.body.tag === '') {
				req.body.tag = user.local.tag;
			}
			if (req.body.slot === '') {
				req.body.slot = user.local.slot;
			}
		
			user.local.firstName = req.body.firstName;
			user.local.lastName = req.body.lastName;
			user.local.age = req.body.age;
			user.local.department = req.body.department;
			user.local.lot = req.body.lot;
			user.local.tag = req.body.tag;
			user.local.hangingtag = req.body.tag;
			user.local.slot = req.body.slot;
			user.save();
			res.json(user);
		});
	  });
  
  //this is adding cars from the admin view
  app.post('/profile/:id/addCars',isAdmin, function(req, res) {
	  var id = req.params.id;
	  var vehicle = new Vehicles(req.body);
	  User.findById(id, function(err, user) {
		   vehicle.owner = user;
           vehicle.save(function(err) {
			 if (err) throw err;
		 });
		 user.local.vehicles.push(vehicle);
			user.save();
			res.json(user);
	  });
  });
  
  
  
  app.get('/profile/:id/updateProf', isAdmin, function(req, res) {
	  var id = req.params.id;
	  
	  var number_processed = 1;
	  User.findById(id, function(err, user) {
		  
       total = user.local.vehicles.length;

     for (var i = 1; i < total; i++){
           Vehicles.findById(user.local.vehicles[i], function(err, vehicle) {
              if(!err){
                    veh3.push(vehicle);
              }
              number_processed  = number_processed  + 1;
              if(number_processed === total){

                 res.json(veh3);
				 
              }
              //console.log("GET Json: " + veh);

            });
     }
 veh3.length = 0;
	  });
  });
  
  //this is getting the profile at the id in the url
   app.get('/profile/:id', 	isAdmin, function(req, res) {
	   
	   var id = req.params.id;
	   
	   
	   
	   User.findById(id, function(err, user) {
			if (err) throw err;
			
		
	   
	   var total = user.local.vehicles.length;
	   //console.log("total is : " + total);
	   console.log(aPrimaryCarIndex);
	   if (total === 1) {
	    Vehicles.findById(user.local.vehicles[0], function(err, vehicle) {
			if (err) throw err;
            res.render('adminprofileview.ejs', {
		    user: user,
		    vh : vehicle
             });
			 user.local.currentIndex = 0;
			 user.save();
		});
	   }
	   else {
		   if (user.local.currentIndex  < total) {
		   Vehicles.findById(user.local.vehicles[user.local.currentIndex], function(err, vehicle) {
			if (err) throw err;
            res.render('adminprofileview.ejs', {
		    user: user,
		    vh : vehicle
             });
			user.local.mainvehicle = vehicle.make + " " + vehicle.model + " " + vehicle.color; 
			user.local.license = vehicle.license;
			user.save();
		});
		    
	   }
	    /*  else {
			  Vehicles.findById(user.local.vehicles[1], function(err, vehicle) {
			if (err) throw err;
            res.render('adminprofileview.ejs', {
		    user: user,
		    vh : vehicle
             });
			user.local.mainvehicle = vehicle.make + " " + vehicle.model + " " + vehicle.color; 
			user.local.license = vehicle.license;
			user.save();
		});
	   }
		  */
	   }   
	   
   });
   });
   //profile section
   app.get('/profile', isLadmin, function(req, res) {
	   	   //console.log(PrimaryCarIndex);
	
	   var user = req.user;
	   var total = req.user.local.vehicles.length;
	   var index = req.user.local.currentIndex;
	   console.log(req.user.local);
	   console.log("currentIndex: " + req.user.local.currentIndex);
	   if (total === 1) {
	    Vehicles.findById(req.user.local.vehicles[0], function(err, vehicle) {
			if (err) throw err;
            res.render('profile.ejs', {
		    user: req.user,
		    vh : vehicle
             });
		    user.local.mainvehicle = vehicle.make + " " + vehicle.model + " " + vehicle.color; 
			user.local.license = vehicle.license;
			user.save();
		});
	   }
	   else {
		   if (index  < total) {
		   Vehicles.findById(req.user.local.vehicles[index], function(err, vehicle) {
			if (err) throw err;
            res.render('profile.ejs', {
		    user: req.user,
		    vh : vehicle
             });
			user.local.mainvehicle = vehicle.make + " " + vehicle.model + " " + vehicle.color; 
			user.local.license = vehicle.license;
			user.save();
		});
	   }
	     /* else {
			  Vehicles.findById(req.user.local.vehicles[1], function(err, vehicle) {
			if (err) throw err;
            res.render('profile.ejs', {
		    user: req.user,
		    vh : vehicle
             });
			user.local.mainvehicle = vehicle.make + " " + vehicle.model + " " + vehicle.color; 
			user.local.license = vehicle.license;
			user.save();
		});
	   }*/
		  
	   
	   }
       
   });
  
   //Logout
   app.get('/logout', function(req, res) {
       req.logout();
       res.redirect('/');
   });
   
   //our template to a add a vehicle at this EJS
   	 app.get('/addVehicle', isLoggedIn, function(req, res)
	 {
		 user : req.user;
		 res.render('addVehicle.ejs');
	 });
	 
	 
	 //the change we make to our to vehicles, or the addition of them
	 app.post('/addVehicle', isLoggedIn, function(req, res) 
	 {
		 user : req.user;
		 //console.log(req.user.local)
		 var vehicle = new Vehicles(req.body);
		 //console.log(vehicle);
		 vehicle.owner = req.user;
         vehicle.save(function(err) {
			 if (err) throw err;
		 });
		 User.findById(req.user.id, function(err, user) {
			if (err) throw err;
			
			user.local.vehicles.push(vehicle);
			user.save();
			res.json(user);
		});
	 });
	 
	
	 //getting our updatedprofile form at this ejs
	 app.get('/updateProfile', isLoggedIn, function(req, res)
	 {
		 user : req.user;
		 res.render('updateProfile.ejs');
		 //console.log(req.user.local);
		 /*User.findById(req.user.id, function(err, user) {
			if (err) throw err;
			res.json(user);
			console.log(user.local);
	 });*/
	 });
	 
	 //Updating profile from user view, not admin
 app.get('/updateProf', isLoggedIn, function(req, res) {
 number_processed = 1;
 total = req.user.local.vehicles.length;

     for (var i = 1; i < total; i++){
           Vehicles.findById(req.user.local.vehicles[i], function(err, vehicle) {
              if(!err){
                    veh.push(vehicle);
              }
              number_processed  = number_processed  + 1;
              if(number_processed === total){

                 res.json(veh);
				 
              }
              //console.log("GET Json: " + veh);

            });
     }
 veh.length = 0;
});
	
	 
	 //committing our changes to our Database via the json we recieve from the POST request
	 app.post('/updateProfile', isLoggedIn, function(req, res)
	 {
		 console.log(req.user._id);
		 User.findById(req.user.id, function(err, user) {
			if (err) throw err;
			if (req.body.firstName === '') {
				req.body.firstName = user.local.firstName;
			}
			if (req.body.lastName === '') {
				req.body.lastName = user.local.lastName;
			}
			if (req.body.age === '') {
				req.body.age = user.local.age;
			}
			if (req.body.department === '') {
				req.body.department = user.local.department;
			}
			user.local.firstName = req.body.firstName;
			user.local.lastName = req.body.lastName;
			user.local.age = req.body.age;
			console.log(req.body.department);
			user.local.department = req.body.department;
			user.save();
			//console.log(user);
			res.json(user);
		});
	 });
	 

	 //setting our primary car via index, (PrimaryCarIndex), that way we know which is the one in use.
 app.post('/primary', isLoggedIn, function(req,res)
 {
	//var vehicle = new Vehicles(req.body);
	User.findById(req.user.id, function(err, user) {
	var vehicle = req.body;
	var id = Object.keys(vehicle)[0];
	var total = req.user.local.vehicles.length;
	
 for (var i = 0; i< total; i++) {
	 if(req.user.local.vehicles[i].equals(id)) {
		 PrimaryCarIndex = i; aPrimaryCarIndex = i; user.local.currentIndex = i; user.save();break;
	 }
 }
 console.log(user);
 console.log(user.local.currentIndex);
 console.log("Primary: " + PrimaryCarIndex);
console.log("Adminary: " +aPrimaryCarIndex);
});
 });

app.post('/adminprimary/:id', isAdmin, function(req, res) 
{
	var id = req.params.id;
	var vehicle = req.body;
	console.log(req.body);
	var vid = Object.keys(vehicle)[0];
	console.log("id: " + id);
	console.log("VEhicle:" + vehicle);
	console.log("Vehicle id: " + vid);
	User.findById(id, function(err, user) {
			if (err) throw err;
	var total = user.local.vehicles.length;
	
 for (var i = 0; i< total; i++) {
	 if(user.local.vehicles[i].equals(vid)) {
		 aPrimaryCarIndex = i;PrimaryCarIndex=i;user.local.currentIndex = i;user.save();break;
		 
	 }
 }
 console.log("CurrentIndex: " + user.local.currentIndex);
 console.log("Primary: " + PrimaryCarIndex);
console.log("Adminary: " +aPrimaryCarIndex);
	res.json(vehicle);
});

});
//To finish/to do
app.post('/random', isAdmin, function(req, res)
{
	console.log(req.body);
	
	res.json(req.body);
});


app.get('/addviolation', isAdmin, function(req, res) {
	
	res.render('indieviolation.ejs');
	
});

app.post('/addviolation', isAdmin, function(req, res) {
	var violation = new Violation();
	var vehicle = new Vehicles();
	
	
	vehicle.make = req.body.make;
	vehicle.model = req.body.model;
	vehicle.type = req.body.type;
	vehicle.color = req.body.color;
	vehicle.license = req.body.license;
	vehicle.violation.push(violation);
	
	violation.cause = req.body.cause;
	violation.date = req.body.date;
	violation.location = req.body.location;
	violation.vehicle = vehicle;
	
	
	vehicle.save();
	violation.save();
	
	
	res.json(req.body);
});

 app.get('/singleViolation/:violation', isAdmin, function(req, res) {
	var violation = req.params.violation;
	Violation.findById(violation, function(err, viol) {
	if (err) throw err;
     res.json(viol);	
 });
	 
 });
 
 app.post('/remove/:violation', isAdmin, function(req, res) {
	var violation = req.params.violation;
		Violation.findById(violation, function(err, viol) {
			if(viol!= null){
			var uid = viol.user;
			if (uid != null) {
			
			User.findById(uid, function(err, user) {
				if(user != null) {
				for (var i = 0; i < user.local.violations.length; i++) {
			        if (user.local.violations[i] === viol._id) {
						delete user.local.violations[i];
					}
				}
				user.save();
				
				}	
			});
			}
			}
		});
		Violation.findByIdAndRemove(violation, function(err, viol) {
			if (err) throw err;
			res.json(req.body);
		});
 });


 app.post('/singleViolation/:violation', isAdmin, function(req, res) {
	 var violation = req.params.violation;
	var ve = new Vehicles();
	
	 Violation.findById(violation, function(err, viol){
		 if (err) throw err;
		 if (req.body.cause === '') {
				req.body.cause = viol.cause;
			}
			if (req.body.date === '') {
				req.body.date = viol.date;
			}
			if (req.body.location === '') {
				req.body.location = viol.location;
			}
			
			
			if(req.body.email === '') {
				req.body.email == viol.user;
			}
		
			if( req.body.email != '') {
				
				User.find({"local.email" : req.body.email}, function (err, user) {
					
					
					if (err) {
						req.body.email = viol.user;
					}
					
					if(viol.user != user[0]._id) {
						
						
						
						viol.user = user[0];
						viol.save();
					
						user[0].local.violations.push(viol);
						Vehicles.findById(viol.vehicle, function(err, veh) {
							ve.make = veh.make;
							ve.model = veh.model;
							ve.color = veh.color;
							ve.type = veh.type;
							ve.license = veh.license;
							user[0].local.vehicles.push(ve);
							ve.owner = user[0];
							ve.save();
							user[0].save();
						
						});
					
					}
				});
			}
	 
			viol.cause = req.body.cause;
			viol.date = req.body.date;
			viol.location = req.body.location;
			
			viol.save();
			
	 });
	 res.json(req.body);
 });
app.get('/editViolations/:violations', isAdmin, function(req, res) {
	res.render('editViolations.ejs');
});


//middleware to check if we are logged in 
   function isLoggedIn(req, res, next) {
   //if user is authenticated in the session, carry on
   if (req.isAuthenticated())
      return next(); //cuz we want to move on incase we're stuck here

   //if they arent redirect them to the home page
   res.redirect('/');
 }
 
 //middleware to check if we are loggedin as a admin
 function isAdmin(req, res, next) {
   //if user is authenticated in the session, carry on
   if (req.isAuthenticated() && req.user.local.email === "admin")
      return next(); //cuz we want to move on incase we're stuck here

   //if they arent redirect them to the home page
   res.redirect('/');
 }
 
function isLadmin(req, res, next) {
   //if user is authenticated in the session, carry on
   if (req.isAuthenticated() && req.user.local.email === "admin"){
	  
      res.redirect('/dashboard'); //cuz we want to move on incase we're stuck here
	   
   }
   else if (req.isAuthenticated()) {
   //if they arent redirect them to the home page
      
      return next();
	  
   }
   else{ 
	  res.redirect('/');
	  
   }
 }
 
 
 
 
}

// Fisher-Yates (aka Knuth) Shuffle/

    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
