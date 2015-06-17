var link = window.location.href;
var array = link.split('/');
var sub = '/' + array[array.length-3]+"/"+array[array.length-2]+"/addViolations";
var mub = '/' + array[array.length-3]+"/"+array[array.length-2];
console.log("Our post link! : " + sub);
var pub = '/' + array[array.length-2]+"/"+array[array.length-1]+"/addViolation";
console.log("Return to here: " + pub);


var AddViolation = React.createClass({


handlePSubmit : function(data,callback) {
    
	$.ajax({
	    url: '/addviolation',
		dataType:'json',
		type: 'POST',
		data: data,
		
		success: function() {
					
					callback;  
					window.location.href = link ;
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
            <ViolationForm onSubmit={this.handlePSubmit}/>
            <hr/>
            
            
            
            </div>
            )
          }
});




var ViolationForm = React.createClass({
    handleSubmit : function(e) {
	  e.preventDefault();
	var cause          = React.findDOMNode(this.refs.cause).value.trim();
	var date           = React.findDOMNode(this.refs.date).value.trim();
	var location       = React.findDOMNode(this.refs.location).value.trim();
	
	var type           = React.findDOMNode(this.refs.type).value.trim();
	var model          = React.findDOMNode(this.refs.model).value.trim();
	var make           = React.findDOMNode(this.refs.make).value.trim();
	var color          = React.findDOMNode(this.refs.color).value.trim();
	var license        = React.findDOMNode(this.refs.license).value.trim();
	
   
	this.props.onSubmit({cause : cause, date : date, location : location, type:type, model:model, make:make, color:color, license:license});
		React.findDOMNode(this.refs.cause).value = '';
		React.findDOMNode(this.refs.date).value = '';
		React.findDOMNode(this.refs.location).value = '';
		React.findDOMNode(this.refs.type).value = '';
		React.findDOMNode(this.refs.model).value = '';
		React.findDOMNode(this.refs.make).value = '';
		React.findDOMNode(this.refs.color).value = '';
		React.findDOMNode(this.refs.license).value = '';
		
	},

	render: function() {
	return(
		
		<form className="form-horizontal" onSubmit={this.handleSubmit}>
		 <h2>Violation</h2>
		 <div class="form-group">
		  <label class="col-sm-0 control-label">Violation:</label>
		  <div class="col-sm-5">
		<input type = "text" placeholder="Violation.." ref = "cause"/>
		</div>
		 </div>
		 <div class="form-group">
		 <label class="col-sm-0 control-label">Date:</label>
		 <div class="col-sm-5">
		<input type = "text" placeholder="Date...." ref = "date"/>
		  </div>
		  </div>
		 <div class="form-group">
		 <label class="col-sm-0 control-label">Location:</label>
		 <div class="col-sm-5">
		<input type = "text" placeholder="Location...." ref = "location"/>
		 </div>
		 </div>
		 
		 <h2> Vehicle </h2>
		 <div class="form-group">
		 <label class="col-sm-0 control-label">Color:</label>
		 <div class="col-sm-5">
		<input type = "text" placeholder="Color...." ref = "color"/>
		 </div>
		 </div>
		 
		 <div class="form-group">
		 <label class="col-sm-0 control-label">Type:</label>
		 <div class="col-sm-5">
		<input type = "text" placeholder="Type...." ref = "type"/>
		 </div>
		 </div>
		 
		 <div class="form-group">
		 <label class="col-sm-0 control-label">Make:</label>
		 <div class="col-sm-5">
		<input type = "text" placeholder="Make...." ref = "make"/>
		 </div>
		 </div>
		 
		 <div class="form-group">
		 <label class="col-sm-0 control-label">Model:</label>
		 <div class="col-sm-5">
		<input type = "text" placeholder="Model...." ref = "model"/>
		 </div>
		 </div>
		 
		 <div class="form-group">
		 <label class="col-sm-0 control-label">License:</label>
		 <div class="col-sm-5">
		<input type = "text" placeholder="License...." ref = "license"/>
		 </div>
		 </div>
		 
		 
		<div class="form-group">
		<label className="col-sm-0 control-label"></label>
			<div class="col-sm-5">
			
		<input type = "submit" value="Submit" className ="btn btn-primary" />
		</div>
		</div>
		
		
		</form>
);
}
});

React.render(<AddViolation  />,
document.getElementById('violations'));