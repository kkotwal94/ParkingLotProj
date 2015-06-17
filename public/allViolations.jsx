var Violations= React.createClass({

loadViolationsFromServer : function() {
	$.ajax({
		url:'/allViolations',
		type: 'GET',
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
			console.log(data);
			this.setState({violations: data});
			
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
},


getInitialState: function() {
    return {
	  violations: []
	};
},

componentDidMount: function() {
        this.loadViolationsFromServer();
		
    },

   render: function() {
            
            return(
                  
            <div>
			
			
            <hr/>
			<div className = "myvehicles">
			
			<Viol data = {this.state.violations}/>
            </div>
			
            <hr/>
			
            
            
            </div>
            )
          }
});


var Viol = React.createClass({
render: function() {

return(
<table className = "table table-bordered table-hover data-toggle table-striped" id = "Data">
<thead>
<tr>
<th>Violation Cause</th><th>Violation Location</th><th>Violation Date</th><th>User</th><th>Modify Violation</th>
</tr>
</thead>
<tbody>
{
 this.props.data.map(function(vi){
  var id = vi._id;
  return (
  
   <tr key= {vi._id}>
   <td>{vi.cause}</td><td>{vi.location}</td><td>{vi.date}</td><td><a href = {"/profile/" + vi.user}> View Violater </a></td><td><a href = {"/editViolations/" + vi._id}> Edit Violation/Assign User </a><p
   onClick = 
   {function(event){
   
   $.ajax({
            url:'/remove/' + id,
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
   
   > Delete Violation </p></td>
   </tr>
  )})}
 </tbody>
 </table>
 );
 }
 });
 




React.render(<Violations  />,
document.getElementById('allviolations'));