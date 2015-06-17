var link = window.location.href;
var array = link.split('/');

sub = array[array.length-1];
var uid = array[array.length-3];
console.log(sub);
var AddVehicle = React.createClass({


handlePSubmit : function(data,callback) {
    
	$.ajax({
	    url: '/veh/' + sub,
		dataType:'json',
		type: 'POST',
		data: data,
		success: function() {
					callback;  
					window.location.href =document.referrer;
					},
		error: function(xhr, status, err) {
		console.log("failed");
		console.error(this.props.url, status, err.toString());
		
		}.bind(this)
	});
   },
   
   loadVehicleFromServer : function() {
	$.ajax({
		url: '/veh/' + sub,
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			this.setState({vehicles: data});
			console.log(data);
			
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
        this.loadVehicleFromServer();
		
    },
   render: function() {
            
            return(
                  
            <div>
            <hr/>
            <VehicleForm onSubmit={this.handlePSubmit} vehicle = {this.state.vehicles}/>
            <hr/>
            
            
            
            </div>
            )
          }
});




var VehicleForm = React.createClass({
    handleSubmit : function(e) {
	e.preventDefault();
	var color   = React.findDOMNode(this.refs.color).value.trim();
	var type  = React.findDOMNode(this.refs.type).value.trim();
	var model  = React.findDOMNode(this.refs.model).value.trim();
	var make  = React.findDOMNode(this.refs.make).value.trim();
	var license  = React.findDOMNode(this.refs.license).value.trim();
	
    
	
	this.props.onSubmit({color : color, type : type, model: model, make: make, license: license});
		React.findDOMNode(this.refs.color).value = '';
		React.findDOMNode(this.refs.type).value = '';
		React.findDOMNode(this.refs.model).value = '';
		React.findDOMNode(this.refs.make).value = '';
		React.findDOMNode(this.refs.license).value = '';
	},

	render: function() {
	console.log("Stuff: " + this.props.vehicle);
	return(
		<form className="VehicleForm" onSubmit={this.handleSubmit}>
		<ul>
		<li><input type = "text" placeholder={this.props.vehicle.color} ref = "color"/></li>
		<li><input type = "text" placeholder={this.props.vehicle.type} ref = "type"/></li>
		<li><input type = "text" placeholder={this.props.vehicle.make} ref = "make"/></li>
		<li><input type = "text" placeholder= {this.props.vehicle.model} ref = "model"/></li>
		<li><input type = "text" placeholder={this.props.vehicle.license} ref = "license"/></li>
		<li><input type = "submit" value="Edit Vehicle" /></li>
		</ul>
		</form>
);
}
});

React.render(<AddVehicle  />,
document.getElementById('content'));
