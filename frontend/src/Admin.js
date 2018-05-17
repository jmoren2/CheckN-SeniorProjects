import React from 'react';
import {Link, Redirect, Route} from 'react-router-dom';
import { Dropdown, Button, Input, Container, Header } from 'semantic-ui-react';
import Navbar from './Navbar.js'



class Admin extends React.Component{
    constructor(props){
        super(props);

        if(this.props.userObj === null)
        {
            window.location.href = '/login';
            console.log('hello')
        }
        this.state = {
            report: '',
            runReport: false,
            AllUsers: [],
            selectedUser: ''
        }
        
        this.searchQuery = "a";
        
        console.log("The user object passed in is: " + props.userObj);
    
    }

    
     options = [ { key: 'Users', value: 'Users', text: 'Users' },
                    { key: 'Departments', value: 'Departments', text: 'Departments' }  ]


                    


     getAllUsers = () =>
     {

         fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/users?email=${this.searchQuery}`, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET',
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data.users[0].email)
            var x = document.getElementById("allUsers")
            x.hidden = false;
            var emails = []
            var users = []
            for(var i=0; i < data.users.length; ++i)
            {

                users.push({
                    key: data.users[i].email,
                    value: data.users[i].email,
                    text:  data.users[i].firstName + " " + data.users[i].lastName
                })
            }
            this.setState({
                AllUsers: users
            })
        })

        document.getElementById("allUsers").hidden = false;
         
     }
     getAllDepartments = () =>
     {
         
        document.getElementById("editUser").hidden = true;
        document.getElementById("removeUser").hidden = true;
        document.getElementById("allUsers").hidden = true;

        //  fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/users?email=${this.searchQuery}`, {
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         method: 'GET',
        // })
        // .then(res => {
        //     return res.json();
        // })
        // .then(data => {
        //     console.log(data.users[0].email)
        //     var x = document.getElementById("allUsers")
        //     x.hidden = false;
        //     var emails = []
        //     for(var i=0; i < data.users.length; ++i)
        //     {

        //         emails.push(data.users[i].firstName + " " + data.users[i].lastName)
        //     }
        //     x.innerHTML = emails.sort()
        // })

         
     }

    handleReportType = (event, data) => {
        
        console.log(data)
        this.setState({
            report: data.value
            
        },
        function () {
            if(this.state.report === "Users")
                this.getAllUsers()
            if(this.state.report === "Departments")
                this.getAllDepartments()
    }
)
    }

   


    handleRunReport= (event) =>
    {
        console.log(this.state.report)
        this.setState({
            runReport: true
        })
        
    }

    handleUserChange = (event, data) =>
    {
            document.getElementById("editUser").hidden = false;
            document.getElementById("removeUser").hidden = false;
            this.setState({
                selectedUser: data.value
            })
    }

    handleEditUser = (event, data) =>
    {
        console.log(this.state.selectedUser)
    }


    handleRemoveUser = (event, data) =>
    {
        console.log(this.state.selectedUser)
    }





    render(){ 
        if (this.state.runReport === true){
            return(<Redirect to={`/admin/${this.state.report}`}/>);//go to the new post's page
            }

         return(
             <div>
             
                 <Navbar searchMethod={this.handleSearch}/>
                 <div className="container">
                 
                     <div className=''>
                         <div className='card card-1  text-md-center'>
                             <div className='card-body text-center'>
                                 <h2 style={{color: 'black'}}>Admin Page</h2>


                            <Dropdown placeholder='Select Type' onChange={this.handleReportType} selection options={this.options}/>

                            <Button standard onClick={this.handleRunReport}>Reports</Button> <br/><br/><br/>

                            <Dropdown id="allUsers" placeholder='Select User' onChange={this.handleUserChange} hidden selection options={this.state.AllUsers}/> 
                            
                            <br/>
                            <Button standard hidden id="editUser" onClick={this.handleEditUser}>Edit User</Button>
                            <Button standard hidden id="removeUser" onClick={this.handleRemoveUser}>Remove User</Button>
                             </div>
                         </div>
                     </div>
                 </div>

             </div>
         );
     }
 }
 
 export default Admin;