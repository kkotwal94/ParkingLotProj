
var AllUsers = React.createClass({

loadUsersFromServer : function() {
	$.ajax({
		url: '/allUsers',
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			console.log(data);
			this.setState({users: data});
			
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
},

getInitialState: function() {
    return {
	  users: []
	};
},

componentDidMount: function() {
        this.loadUsersFromServer();
		
    },

   render: function() {
            
            return(
                  
            <div>
			
			
            <hr/>
			<div className = "employees">
			
			<User users = {this.state.users}/>
            </div>
			
            <hr/>
             
            
            </div>
            )
          }
});


var User = React.createClass({
render: function() {

return(
<ul>
{
 this.props.users.map(function(user){
 
  return (
  
   <li key= {user.id}>
   <p>{user.local.email + " : " + user.local.firstName + " " +  user.local.lastName + " Lot # :" + user.local.slot + " Parking Tag Color : " + user.local.lot}  <a href = {'/profile/' + user._id}> View Profile </a></p>
    
   </li>
  )})}
 </ul>
 );
 }
 });
 




React.render(<AllUsers  />,
document.getElementById('Users'));