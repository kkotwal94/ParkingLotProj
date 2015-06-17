var link = window.location.href;
var array = link.split('/');
var prof = array[array.length-1];
prof = '/profile/' + prof;
var sub = array[array.length-2]+"/"+array[array.length-1]+"/updateProf";
var mub = array[array.length-2]+"/"+array[array.length-1]+"/editInfo";
var dub = '/adminprimary/' + array[array.length-2];
var cub = '/' + array[array.length-2]+"/"+array[array.length-1]+"/user";
console.log(dub);

var UpdateProfile = React.createClass({

loadVehiclesFromServer : function() {
	$.ajax({
		url: "/" + sub ,
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
		
		
		console.log(data);
		var count = 0;
		for (var z = 0; z < data.length; z++) {
		if(data[z] === null) {
		count++;
		}
		}
		for(var x = 0; x< count; x++){
		for( var i = 0; i < data.length; i++) {
			 if (data[i] === null) {
			  data.remove(i);
			 }
			}
			}
			this.setState({vehicles: data});
			console.log(data);
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
},

loadUserFromServer : function() {
	$.ajax({
		url: cub,
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			console.log(data);
			this.setState({users: data.local});
			
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
},

getInitialState: function() {
    return {
	  vehicles: [],
	  users : []
	};
},

componentDidMount: function() {
        this.loadVehiclesFromServer();
		this.loadUserFromServer();
		//console.log(this.state.vehicles);
        //setInterval(this.loadVehiclesFromServer, 2000);
    },
handlePSubmit : function(data,callback) {
    
	$.ajax({
	    url: "/"+ mub,
		dataType:'json',
		type: 'POST',
		data: data,
		success: function() {
					callback;  
					window.location.href =prof;
					},
		error: function(xhr, status, err) {
		console.log("failed");
		console.error(this.props.url, status, err.toString());
		
		}.bind(this)
	});
   },
   render: function() {
            
            return(
                  
            <div>
			
			
            <hr/>
			<div className = "Cars">
			<h2>Update Profile</h2>
			
            </div>
			<UpdateForm onSubmit={this.handlePSubmit} user = {this.state.users}/>
            <hr/>
            
            
            
            </div>
            )
          }
});


/*var Vehicles = React.createClass({
render: function() {
<Vehicles vehicles = {this.state.vehicles}/>
return(
<ul>
{
 this.props.vehicles.map(function(vehicle){
 
  return (
  
   <li key= {vehicle._id}>
   <button onClick = {function(event){
    //console.log(vehicle._id);
 $.ajax({
            url: dub,
            dataType: 'json',
            type: 'POST',
			data: vehicle._id,
            success: function() {
              console.log(data);
              console.log("id sent");
            }.bind(this),
        error: function(xhr, status, err) {
               console.error(this.props.url,status, err.toString());
            }.bind(this)
        });

}
}
   
   >{vehicle.type }</button>
   </li>
  )})}
 </ul>
 );
 }
 });
 */


var UpdateForm = React.createClass({

    handleSubmit : function(e) {
	  e.preventDefault();
	var firstName   = React.findDOMNode(this.refs.firstName).value.trim();
	var lastName  = React.findDOMNode(this.refs.lastName).value.trim();
	var age  = React.findDOMNode(this.refs.age).value.trim();
    var department  = React.findDOMNode(this.refs.department).value.trim();	
	var lot  = React.findDOMNode(this.refs.lot).value.trim();
    var tag  = React.findDOMNode(this.refs.tag).value.trim();		
	var hangingtag  = React.findDOMNode(this.refs.hangingtag).value.trim();	
	var slot = React.findDOMNode(this.refs.slot).value.trim();
    /*if(!firstName || !lastName || !age || !department || !lot || !tag || !hangingtag || !slot) {
		return;
	}*/
	
	lot = capitalise(lot);
	
	
	
	this.props.onSubmit({firstName : firstName, lastName : lastName, age: age, department:department, lot : lot, tag : tag, hangingtag: hangingtag, slot: slot});
		React.findDOMNode(this.refs.firstName).value = '';
		React.findDOMNode(this.refs.lastName).value = '';
		React.findDOMNode(this.refs.age).value = '';
		React.findDOMNode(this.refs.department).value = '';
		React.findDOMNode(this.refs.lot).value = '';
		React.findDOMNode(this.refs.tag).value = '';
		React.findDOMNode(this.refs.hangingtag).value = '';
		React.findDOMNode(this.refs.slot).value = '';
	},

	render: function() {
	return(
		<form className="form-horizontal" onSubmit={this.handleSubmit}>
		<div class="form-group">
		<label className="col-sm-0 control-label">First Name:</label>
		<div class="col-sm-5">
		<input type = "text" placeholder={this.props.user.firstName} ref = "firstName"/>
		</div>
		</div>
		<div class="form-group">
		<label className="col-sm-0 control-label">Last Name:</label>
		<div class="col-sm-5">
		<input type = "text" placeholder={this.props.user.lastName} ref = "lastName"/>
		</div>
		</div>
		<div class="form-group">
		<label className="col-sm-0 control-label">Age:</label>
		<div class="col-sm-5">
		<input type = "text" placeholder={this.props.user.age} ref = "age"/>
		</div>
		</div>
		<div class="form-group">
		<label className="col-sm-0 control-label">Department:</label>
		<div class="col-sm-5">
		<input type = "text" placeholder={this.props.user.department} ref = "department"/>
		</div>
		</div>
		<div class="form-group">
		<label className="col-sm-0 control-label">Lot Color:</label>
		<div class="col-sm-5">
		<input type = "text" placeholder={this.props.user.lot} ref = "lot"/>
		</div>
		</div>
		<div class="form-group">
		<label className="col-sm-0 control-label">Tag:</label>
		<div class="col-sm-5">
		<input type = "text" placeholder={this.props.user.tag} ref = "tag"/>
		</div>
		</div>
		<div class="form-group">
		<label className="col-sm-0 control-label">Hanging Tag:</label>
		<div class="col-sm-5">
		<input type = "text" placeholder={this.props.user.hangingtag} ref = "hangingtag"/>
		</div>
		</div>
		<div class="form-group">
		<label className="col-sm-0 control-label">Lot #:</label>
		<div class="col-sm-5">
		<input type = "text" placeholder={this.props.user.slot} ref = "slot"/>
		</div>
		</div>
		<div class="form-group">
		<label className="col-sm-0 control-label"></label>
		<div class="col-sm-5">
		<input type = "submit" value="Save Changes" className = "btn btn-primary" />
		</div>
		</div>
		</form>
);
}
});

React.render(<UpdateProfile  />,
document.getElementById('content'));

function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
