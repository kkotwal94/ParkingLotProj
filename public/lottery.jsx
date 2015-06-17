
var AllUsers = React.createClass({

filterList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.firstName.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},
loadUsersFromServer : function() {
	$.ajax({
		url: '/allUsers',
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			//console.log(data);
			this.setState({users: data});
			this.setState({items : data});
			
			
		}.bind(this),
		error: function(xhr, status, err) {
		 console.error(this.props.url, status, err.toString());
		}.bind(this)
	});
},

handleRandomSubmit : function() {
    $.ajax({
	    url: sub,
		dataType:'json',
		type: 'POST',
		data: data,
		
		success: function() {
					
					callback;  
					window.location.href = mub;
					},
		error: function(xhr, status, err) {
		console.log("failed");
		console.error(this.props.url, status, err.toString());
		
		}.bind(this)
	});
   },

getInitialState: function() {
    return {
	  users: [],
	  items: []
	};
},
componentWillMount: function () {
this.setState({items: this.state.users})
},

componentDidMount: function() {
        this.loadUsersFromServer();
		this.setState({items: this.state.users})
    },

   render: function() {
            
            return(
                  
            <div>
			
			
            <hr/>
			<div className = "employees">
			<input type="text" placeholder="Search" onChange={this.filterList} />
			<User users = {this.state.items}/>
			 
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

//TO DO : Make a post submit class form, for a button, that randomally sorts 140 people into the array, their index is their lot number, this will be a array of max size 140