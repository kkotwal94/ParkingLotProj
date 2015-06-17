
var UpdateProfile = React.createClass({

loadVehiclesFromServer : function() {
	$.ajax({
		url: '/updateProf',
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
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
		url: '/user',
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
	  users: []
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
	    url: '/updateProfile',
		dataType:'json',
		type: 'POST',
		data: data,
		success: function() {
					callback;  
					window.location.href ="/profile";
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
            url: '/primary',
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
	
    /*if(!firstName || !lastName || !age || !department) {
		return;
	}*/
	
	this.props.onSubmit({firstName : firstName, lastName : lastName, age: age, department: department});
	
		React.findDOMNode(this.refs.firstName).value = '';
		React.findDOMNode(this.refs.lastName).value = '';
		React.findDOMNode(this.refs.age).value = '';
		React.findDOMNode(this.refs.department).value = '';
	},
    
	render: function() {

	return(
		<form className="UpdateForm" onSubmit={this.handleSubmit}>
		<ul>
		
		<li><label>First Name:</label><input type = "text" placeholder={this.props.user.firstName} ref = "firstName"/></li>
		<li><label>Last Name:</label><input type = "text" placeholder={this.props.user.lastName} ref = "lastName"/></li>
		<li><label>Age:</label><input type = "text" placeholder={this.props.user.age} ref = "age"/></li>
		<li><label>Department:</label><input type = "text" placeholder={this.props.user.department} ref = "department"/></li>
		<li><label></label><input type = "submit" value="Save Changes" /></li>
		</ul>
		</form>
);
}
});

React.render(<UpdateProfile  />,
document.getElementById('contents'));

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};