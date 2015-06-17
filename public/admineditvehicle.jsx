var link = window.location.href;
var array = link.split('/');
var sub = '/' + array[array.length-2] + '/' + array[array.length-1];
var post = '/' + array[array.length-2] + '/' + array[array.length-1] + '/addCars';

console.log(post);
console.log('/' + array[array.length-2] + '/' + array[array.length-1] + '/addCars');
var AddVehicle = React.createClass({


handlePSubmit : function(data,callback) {
    
	$.ajax({
	    url: post,
		dataType:'json',
		type: 'POST',
		data: data,
		success: function() {
					callback;  
					window.location.href = sub;
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
		<form className="form-horizontal" onSubmit={this.handleSubmit}>
		<div class="form-group">
		  <label class="col-sm-0 control-label">Vehicle Color:</label>
		  <div class="col-sm-5">
		<input type = "text" placeholder="Vehicle Color.." ref = "color"/>
		</div>
		</div>
		<div class="form-group">
		  <label class="col-sm-0 control-label">Vehicle Type::</label>
		  <div class="col-sm-5">
		<input type = "text" placeholder="Vehicle Type.." ref = "type"/>
		</div>
		</div>
		<div class="form-group">
		  <label class="col-sm-0 control-label">Vehicle Make:</label>
		  <div class="col-sm-5">
		<input type = "text" placeholder="Vehicle Make.." ref = "make"/>
		</div>
		</div>
		<div class="form-group">
		  <label class="col-sm-0 control-label">Vehicle Model:</label>
		  <div class="col-sm-5">
		<input type = "text" placeholder="Vehicle Model.." ref = "model"/>
		</div>
		</div>
		<div class="form-group">
		  <label class="col-sm-0 control-label">Vehicle License:</label>
		  <div class="col-sm-5">
		<input type = "text" placeholder="Vehicle License.." ref = "license"/>
		</div>
		</div>
		<div class="form-group">
		  <label class="col-sm-0 control-label"></label>
		  <div class="col-sm-5">
		<input type = "submit" value="Add Vehicle" className ="btn btn-primary" />
		</div>
		</div>
		
		</form>
);
}
});

React.render(<AddVehicle  />,
document.getElementById('vehicles'));