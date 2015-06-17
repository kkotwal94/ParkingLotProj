var Vehicles = React.createClass({

loadVehiclesFromServer : function() {
	$.ajax({
		url:'/allVehicles',
		type: 'GET',
		dataType: 'json',
		success: function(data) {
		
		
			for (var i = 0; i< data.length; i++) {
				if (data[i].make === "Add Vehicle Make") {
				
				delete data[i];	
				
				
				}
			}
			
			
			this.setState({vehicles: data});
			
		

			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
},


getInitialState: function() {
    return {
	  vehicles: [],
	   ownless: []
	};
},

componentDidMount: function() {
        this.loadVehiclesFromServer();
		
    },

   render: function() {
            
            return(
                  
            <div>
			
			
            <hr/>
			<div className = "myvehicles">
			
			<Vehicle data = {this.state.vehicles}/>
            </div>
			
            <hr/>
			
            
            
            </div>
            )
          }
});


var Vehicle = React.createClass({
render: function() {

return(
<table className = "table table-bordered table-hover data-toggle table-striped" id = "Data">
<thead>
<tr>
<th>Vehicle Make</th><th>Vehicle Model</th><th>Vehicle Type</th> <th>Vehicle Color</th><th>Vehicle License</th><th>Vehicle Owner</th><th>Edit Individual Vehicles</th>
</tr>
</thead>
<tbody>
{
 this.props.data.map(function(veh){
 
  return (
  
   <tr key= {veh.id}>
   <td>{veh.make}</td><td>{veh.model}</td><td>{veh.type}</td><td>{veh.color}</td><td>{veh.license}</td><td><a href = {"/profile/" + veh.owner}>View Owner</a></td><td><a href = {"/vehicle/" + veh._id}>Edit</a></td>
   </tr>
  )})}
 </tbody>
 </table>
 );
 }
 });
 




React.render(<Vehicles  />,
document.getElementById('vehicles'));