var Datatable = React.createClass({


filterList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.firstName.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

lastNameList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.lastName.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

vehicleList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.mainvehicle.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

departmentList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.department.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

tagList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.tag.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

hangingtagList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.hangingtag.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

lotList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.lot.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},


slotList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.slot.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},


licenseList : function(event){
var updatedList = this.state.users;
updatedList = updatedList.filter(function(item){
  return item.local.license.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
this.setState({items: updatedList});
console.log(updatedList);
},

sortList : function(event) {
var updatedList = this.state.items;
console.log(updatedList[0].local.firstName);
updatedList = updatedList.sort(alphaCompare);
this.setState({items:updatedList});
console.log(updatedList[0].local.firstName);

},

s_lastList : function(event) {
var updatedList = this.state.items;
console.log(updatedList[0].local.firstName);
updatedList = updatedList.sort(lastCompare);
this.setState({items:updatedList});
console.log(updatedList[0].local.firstName);

},

s_vehicleList : function(event) {
var updatedList = this.state.items;
console.log(updatedList[0].local.firstName);
updatedList = updatedList.sort(vehicleCompare);
this.setState({items:updatedList});
console.log(updatedList[0].local.firstName);

},

s_ageList : function(event) {
var updatedList = this.state.items;
console.log(updatedList[0].local.firstName);
updatedList = updatedList.sort(ageCompare);
this.setState({items:updatedList});
console.log(updatedList[0].local.firstName);

},

s_lotList : function(event) {
var updatedList = this.state.items;
console.log(updatedList[0].local.firstName);
updatedList = updatedList.sort(lotCompare);
this.setState({items:updatedList});
console.log(updatedList[0].local.firstName);

},

s_slotList : function(event) {
var updatedList = this.state.items;
console.log(updatedList[0].local.firstName);
updatedList = updatedList.sort(slotCompare);
this.setState({items:updatedList});
console.log(updatedList[0].local.firstName);

},

s_departmentList : function(event) {
var updatedList = this.state.items;
console.log(updatedList[0].local.firstName);
updatedList = updatedList.sort(departmentCompare);
this.setState({items:updatedList});
console.log(updatedList[0].local.firstName);

},

s_tagList : function(event) {
var updatedList = this.state.items;
console.log(updatedList[0].local.firstName);
updatedList = updatedList.sort(tagCompare);
this.setState({items:updatedList});
console.log(updatedList[0].local.firstName);

},

s_hangingtagList : function(event) {
var updatedList = this.state.items;
console.log(updatedList[0].local.firstName);
updatedList = updatedList.sort(hangingtagCompare);
this.setState({items:updatedList});
console.log(updatedList[0].local.firstName);

},

s_licenseList : function(event) {
var updatedList = this.state.items;
console.log(updatedList[0].local.firstName);
updatedList = updatedList.sort(licenseCompare);
this.setState({items:updatedList});
console.log(updatedList[0].local.firstName);

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

getInitialState: function() {
    return {
	  users: [],
	  items: []
	};
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

this.loadUsersFromServer();
},


componentDidMount: function() {
        this.loadUsersFromServer();
		this.setState({items: this.state.users})
    },

   render: function() {
            
            return(
                  
            <div>
			
			<div className="form-group">
				<button for="collapseOne" className="btn btn-default" data-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">Search By +</button>
					<div id="collapseOne" className="collapse">
					
						<input type="text" placeholder="Search by firstName" onChange={this.filterList} />
					
						<input type="text" placeholder="Search by lastName" onChange={this.lastNameList} />
						<input type="text" placeholder="Search by vehicle" onChange={this.vehicleList} />
						<input type="text" placeholder="Search by license" onChange={this.licenseList} />
						<input type="text" placeholder="Search by slot #" onChange={this.slotList} />
						<input type="text" placeholder="Search by parking lot" onChange={this.lotList} />
						<input type="text" placeholder="Search by parking tag" onChange={this.tagList} />
						<input type="text" placeholder="Search by hanging tag" onChange={this.hangingtagList} />
						<input type="text" placeholder="Search by department" onChange={this.departmentList} />		
					</div>
				
		
<div className="btn-group">
  <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
    Sort By <span className="caret"></span>
  </button>
  <ul className="dropdown-menu" role="menu">
    <li><a onClick ={this.sortList}>Sort by FirstName </a></li>
						<li><a onClick ={this.s_lastList}>Sort by Last Name </a></li>
						<li><a onClick ={this.s_ageList}>Sort by Age </a></li>
						<li><a onClick ={this.s_vehicleList}>Sort by Vehicles </a></li>
						<li><a onClick ={this.s_licenseList}>Sort by License </a></li>
						<li><a onClick ={this.s_slotList}>Sort by Parking Slot </a></li>
						<li><a onClick ={this.s_lotList}>Sort by Parking Lot Color </a></li>
						<li><a onClick ={this.s_tagList}>Sort by Parking Lot Tag </a></li>
						<li><a onClick ={this.s_departmentList}>Sort by Department </a></li>
						<li><a onClick ={this.s_hangingtagList}>Sort by Hanging Tag </a></li>
  </ul>
  
  
  
</div>
			</div>
			
	
            <hr/>
			
			<div className = "datatable">
			
			
			
			
		    
			
			<User users = {this.state.items}/>
            </div>
			
            <hr/>
              <LotteryButton onSubmit = {this.handleButtonSubmit} ontagSubmit = {this.tagSubmit} />
            
            </div>
            )
          }
});


var User = React.createClass({
render: function() {

return(
<table className = "table table-bordered table-hover data-toggle table-striped" id = "Data">
<thead>
<tr>
<th>First Name</th> <th>Last Name</th> <th>Age</th> <th> Vehicles</th> <th>License</th>  <th> Parking Slot</th> <th> Parking Lot Color</th> <th> Parking Lot Tag</th> <th> Department </th> <th> Hanging Tag</th> <th>Profile</th>
</tr>
</thead>
<tbody>
{
 this.props.users.map(function(user){

  return (
   <tr>
   <td>{user.local.firstName}</td>   <td>{user.local.lastName}</td> <td>{user.local.age}</td> <td>{user.local.mainvehicle}</td> <td>{user.local.license}</td>   <td>{user.local.slot}</td>   <td>{user.local.lot}</td> <td>{user.local.tag}</td><td>{user.local.department}</td> <td>{user.local.hangingtag}</td> <td><a href = {'/profile/' + user._id}>View {user.firstName} </a></td>
    </tr>
	
	
  )})}
</tbody>
 </table>
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
	<button className="btn btn-default" onClick = {this.handleSubmit}>Hit Lottery!</button>
	<button className="btn btn-default" onClick = {this.handletagSubmit}>Generate tags/hanging tags</button>
	</div>
	
	);
	
	}

});



React.render(<Datatable  />,
document.getElementById('Users'));

function alphaCompare(a, b) {
if( a.local.firstName  < b.local.firstName) return -1;
if (a.local.firstName > b.local.firstName) return 1;
return 0;
}

function lastCompare(a, b) {
if( a.local.lastName  < b.local.lastName) return -1;
if (a.local.lastName > b.local.lastName) return 1;
return 0;
}

function ageCompare(a,b) {
if( a.local.age  < b.local.age) return -1;
if (a.local.age> b.local.age) return 1;
return 0;
}
function vehicleCompare(a,b) {
if( a.local.mainvehicle  < b.local.mainvehicle) return -1;
if (a.local.mainvehicle > b.local.mainvehicle) return 1;
return 0;
}

function licenseCompare(a,b) {
if( a.local.license  < b.local.license) return -1;
if (a.local.license > b.local.license) return 1;
return 0;
}
function lotCompare(a,b) {
if( a.local.lot  < b.local.lot) return -1;
if (a.local.lot > b.local.lot) return 1;
return 0;
}
function departmentCompare(a,b) {
if( a.local.department  < b.local.department) return -1;
if (a.local.department > b.local.department) return 1;
return 0;
}

function tagCompare(a,b) {
if( a.local.tag  < b.local.tag) return -1;
if (a.local.tag > b.local.tag) return 1;
return 0;
}

function hangingtagCompare(a,b) {
if( a.local.hangingtag  < b.local.hangingtag) return -1;
if (a.local.hangingtag > b.local.hangingtag) return 1;
return 0;
}

function slotCompare(a,b) {
return a.local.slot - b.local.slot;
}