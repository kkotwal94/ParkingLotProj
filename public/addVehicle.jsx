
var AddVehicle = React.createClass({


handlePSubmit : function(data,callback) {
    
	$.ajax({
	    url: '/addVehicle',
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
            <VehicleForm onSubmit={this.handlePSubmit}/>
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
	
    if(!color || !type || !model || !make || !license) {
		return;
	}
	
	this.props.onSubmit({color : color, type : type, model: model, make: make, license: license});
		React.findDOMNode(this.refs.color).value = '';
		React.findDOMNode(this.refs.type).value = '';
		React.findDOMNode(this.refs.model).value = '';
		React.findDOMNode(this.refs.make).value = '';
		React.findDOMNode(this.refs.license).value = '';
	},

	render: function() {
	return(
		<form className="VehicleForm" onSubmit={this.handleSubmit}>
		<ul>
		<li><input type = "text" placeholder="Vehicle Color.." ref = "color"/></li>
		<li><input type = "text" placeholder="Vehicle Type.." ref = "type"/></li>
		<li><input type = "text" placeholder="Vehicle Make.." ref = "make"/></li>
		<li><input type = "text" placeholder="Vehicle Model.." ref = "model"/></li>
		<li><input type = "text" placeholder="Vehicle License.." ref = "license"/></li>
		<li><input type = "submit" value="Add Vehicle" /></li>
		</ul>
		</form>
);
}
});

React.render(<AddVehicle  />,
document.getElementById('vehicle'));