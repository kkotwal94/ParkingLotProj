var link = window.location.href;
var array = link.split('/');
var sub = array[array.length-2]+"/"+array[array.length-1]+"/addViolations";
var dub = '/' + array[array.length-2]+"/"+array[array.length-1]+"/violations";
var mub = '/' + array[array.length-2]+"/"+array[array.length-1]+"/addViolations";
console.log("Link: " + dub);
var Violations = React.createClass({

loadUsersFromServer : function() {
	$.ajax({
		url: '/violations',
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			console.log("This is DATA: " + data);
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
        this.loadUsersFromServer();
		
    },

   render: function() {
            
            return(
                  
            <div>
			
			
            <hr/>
			<div className = "myviolations">
			
			<Violate data = {this.state.violations}/>
            </div>
			
            <hr/>
           
            
            
            </div>
            )
          }
});


var Violate = React.createClass({
render: function() {

return(
<table className = "table table-bordered table-hover data-toggle table-striped" id = "Data">
<thead>
<tr>
<th>Violation</th><th>Location</th><th>Date</th>
</tr>
</thead>
<tbody>
{
 this.props.data.map(function(offense){
 
  return (
  
   <tr key= {offense.id}>
   <td>{offense.cause}</td><td>{offense.location}</td><td>{offense.date}</td>
   </tr>
  )})}
 </tbody>
 </table>
 );
 }
 });
 




React.render(<Violations  />,
document.getElementById('violations'));