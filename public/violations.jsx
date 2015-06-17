var link = window.location.href;
var array = link.split('/');
var sub = array[array.length-2]+"/"+array[array.length-1]+"/addViolations";
var dub = '/' + array[array.length-2]+"/"+array[array.length-1]+"/violations";
var mub = '/' + array[array.length-2]+"/"+array[array.length-1]+"/violation";
console.log("Link: " + mub);
var Violations = React.createClass({

loadUsersFromServer : function() {
	$.ajax({
		url: mub,
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
			//console.log("This is DATA: " + data);
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
			<div className="form-group">
           <button  href="#collapseOne" className = "btn btn-default" for="collapseOne" data-toggle="collapse" aria-expanded="true" aria-controls="collapseOne">Add Violation </button>
				<div id="collapseOne" className="collapse">
				<div id = "contents"> </div>
				</div>
				</div>
            
            
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
<th>Violation</th><th>Location</th><th>Date</th><th>Modify</th>
</tr>
</thead>
<tbody>
{
 this.props.data.map(function(offense){
 var id = offense._id;
  return (
  
   <tr key= {offense.id}>
   <td>{offense.cause}</td><td>{offense.location}</td><td>{offense.date}</td><td><a href = {"/editViolations/" + offense._id}>Modify</a> <p
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
document.getElementById('violations'));