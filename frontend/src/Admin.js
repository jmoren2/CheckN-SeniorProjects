import React from 'react';
import {Link, Redirect, Route} from 'react-router-dom';
import { Dropdown, Button, Input, Container, Header, Form, TextArea } from 'semantic-ui-react';
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
            selectedUser: '',
            allDepartments: [],
            allRoles: [],
            selectedUserInfo: {}
        }
        
        this.searchQuery = "a";
        
        console.log("The user object passed in is: " + props.userObj);
    
    }

    
     options = [ { key: 'Users', value: 'Users', text: 'Users' },
                    { key: 'Departments', value: 'Departments', text: 'Departments' }  ]


                    

    

    handleReportType = (event, data) => {
        
        console.log(data)
        this.setState({
            report: data.value
            
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

    handleEditUser = (event) =>
    {
        this.getUserInfo();
        document.getElementById("editUserForm").hidden = false;
        
        console.log(this.state.selectedUser)
    }

    removeUser = (data) =>
    {
        fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/users/${data}`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'DELETE',
            })
            .then(res => {
                return JSON.stringify(res);
            })
            .then(data => {
                console.log(data)
                alert('User Deleted')
            })
    }


    handleRemoveUser = (event) =>
    {
        
        fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/users?email=${this.state.selectedUser}`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET',
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.removeUser(data.users[0].userId)
            })


    }

    heandlSearchUser = (event, data) =>
    {
        fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/users?namesearch=${data.value}`, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET',
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)

            if(data.statusCode === 500)
            {
                document.getElementById("editUser").hidden = true;
                document.getElementById("removeUser").hidden = true;
                this.setState({
                    AllUsers: []
                })
                console.log('No User')
            }
            else{
                var x = document.getElementById("allUsers")
                x.hidden = false;
                var length = null;
                if(data.users.length !== 0)
                {
                    length = data.users.length;
                }
                else
                {
                    length = 0;
                }
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
            }
            
             
        })
    }

    getAllDepartments = () =>
    {
        
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/departments`, {
            headers: {
                'content-type': 'application/json'
                 },
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(data =>
        {
            console.log('DATA' + JSON.stringify(data))
            var length = null;
                if(data.departments.length !== 0)
                {
                    length = data.departments.length;
                }
                else
                {
                    length = 0;
                }
                var dep = []
                for(var i=0; i < data.departments.length; ++i)
                {
    
                    dep.push({
                        key: data.departments[i],
                        value: data.departments[i],
                        text:  data.departments[i]
                    })
                }
            this.setState({
                allDepartments: dep
            })
        })

        
    }


    getAllRoles = () =>
    {
        
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/roles`, {
            headers: {
                'content-type': 'application/json'
                 },
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(data =>
        {
            console.log(data)
            var length = null;
                if(data.roles.length !== 0)
                {
                    length = data.roles.length;
                }
                else
                {
                    length = 0;
                }
                var roles = []
                for(var i=0; i < data.roles.length; ++i)
                {
    
                    roles.push({
                        key: data.roles[i].role,
                        value: data.roles[i].role,
                        text:  data.roles[i].role
                    })
                }
            this.setState({
                allRoles: roles
            })
        })

        
    }


    getUserInfo = () =>
    {
        fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/users?email=${this.state.selectedUser}`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET',
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({
                    selectedUserInfo: data.users[0]
                })

            })
    }


    submitUserEdit = (event, data) =>
    {
        console.log('hello!!!')
        console.log(data.children[3])
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

                            <Input id="searchUser" placeholder='Search...' onChange={this.heandlSearchUser} /> <br/>

                            <Dropdown id="allUsers" selection options={this.state.AllUsers} hidden onChange={this.handleUserChange}  />
                            
                            <br/>
                            <Button standard hidden id="editUser" onClick={this.handleEditUser}>Edit User</Button>
                            <Button standard hidden id="removeUser" onClick={this.handleRemoveUser}>Remove User</Button>

                        

                        <Form id="editUserForm" onSubmit={this.submitUserEdit} hidden>                           
                            <Form.Input id="formFirstName" fluid label='First name' placeholder='First name' value={this.state.selectedUserInfo.firstName}/>
                            <Form.Input id="formLastName" fluid label='Last name' placeholder='Last name' value={this.state.selectedUserInfo.lastName}/>
                            <Form.Input id="formEmail" fluid label='Email' placeholder='email' value={this.state.selectedUserInfo.email}/>
                            <Form.Dropdown id="formDepartment" fluid selection label='department' placeholder='Department'  onFocus={this.getAllDepartments} options={this.state.allDepartments}/>
                            <Form.Dropdown id="formRole" fluid selection label='role' placeholder='Role' onFocus={this.getAllRoles} options={this.state.allRoles} />
                            <Button>Submit</Button>
                        </Form>

                             </div>
                         </div>
                     </div>
                 </div>

             </div>
         );
     }
 }
 
 export default Admin;