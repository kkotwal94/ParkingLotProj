
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

handleButtonSubmit :  function(data, callback)
{

console.log("first log : " + this.state.users);

 $.ajax({
	    url: '/lottery',
		dataType:'json',
		type: 'POST',
		data: {"Users:" : this.state.users.local},
		
		success: function() {
					 
					  
					  console.log("Success");
					
					},
		error: function(xhr, status, err) {
		console.log("failed");
		console.error(this.props.url, status, err.toString());
		
		}.bind(this)
	});

this.loadUsersFromServer();
},

tagSubmit :  function(data, callback)
{



 $.ajax({
	    url: '/generateTags',
		dataType:'json',
		type: 'POST',
		data: {"Users:" : this.state.users.local},
		
		success: function() {
					 
					  
					  console.log("Success");
					
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
/*componentWillMount: function () {
this.setState({items: this.state.users})
},*/

componentDidMount: function() {
        this.loadUsersFromServer();
		
		this.setState({items: this.state.users})
		
		//setInterval(this.loadUsersFromServer, 2000);
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
 
var LotteryButton = React.createClass({

handleSubmit :  function(e)
{
 this.props.onSubmit({});
},

handletagSubmit : function(e)
{
this.props.ontagSubmit({});
},


	render: function() {
	return(
	<div>
	<button onClick = {this.handleSubmit}>Hit Lottery!</button>
	<button onClick = {this.handletagSubmit}>Generate tags/hanging tags</button>
	</div>
	
	);
	
	}

});



React.render(<AllUsers  />,
document.getElementById('Users'));