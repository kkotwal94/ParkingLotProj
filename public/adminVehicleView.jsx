var link = window.location.href;
var array = link.split('/');
var sub = array[array.length-1] + '/vehicles';
var uid = array[array.length-1];
var pub = '/adminprimary/' + array[array.length-1];
var jub = 'http://localhost:8080/adminprimary/' + array[array.length-1];
console.log("Pub is: " + pub);

var AdminVehiclesView = React.createClass({

loadVehiclesFromServer : function() {
	$.ajax({
		url: sub ,
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

getInitialState: function() {
    return {
	  vehicles: []
	};
},

componentDidMount: function() {
        this.loadVehiclesFromServer();
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
			
			
            
			<div className = "Cars">
			
			<Vehicles vehicles = {this.state.vehicles}/>
            </div>
			
            
            
            
            
            </div>
            )
          }
});


var Vehicles = React.createClass({
render: function() {

return(
<table className = "table table-bordered table-hover data-toggle table-striped" id = "Data">
<thead>
<tr>
<th>Vehicle Make</th><th>Vehicle Model</th><th>Vehicle Type</th><th>Vehicle Color</th><th>Vehicle License</th><th>Edit</th><th>Delete</th>
</tr>
</thead>
<tbody>
{
 this.props.vehicles.map(function(vehicle){
 var id = vehicle._id;
 
  return (
  
   <tr>
   <td>{vehicle.make}</td>   <td>{vehicle.model}</td> <td>{vehicle.type}</td> <td>{vehicle.color}</td> <td>{vehicle.license}</td> <td><button className = "btn btn-default"><a href = {'/profile/' + uid + '/vehicles/'+vehicle._id}>Edit Vehicle </a></button>    <a href = {""}onClick = 
   {function(event) {
    $.ajax({
            url: jub,
            dataType: 'json',
            type: 'POST',
			data: vehicle._id,
			
            success: function() {
            
              console.log("id sent");
            }.bind(this),
        error: function(xhr, status, err) {
               console.error(this.props.url,status, err.toString());
            }.bind(this)
        });

}
}
   
   ><button className = "btn btn-default">Set Primary</button></a></td><td><p onClick = 
   {function(event){$.ajax({
            url:'/profile/' +uid + '/' + id + '/remove' ,
            dataType: 'json',
            type: 'POST',
            success: function(data) {
              console.log(data);
              console.log("removing..");
            }.bind(this),
        error: function(xhr, status, err) {
               console.error(this.props.url,status, err.toString());
            }.bind(this)
        });


}}
   
   >Remove</p></td>
    </tr>
  )})}
 </tbody>
 </table>
 );
 }
 });

console.log(sub);

React.render(<AdminVehiclesView  />,
document.getElementById('cars'));

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
