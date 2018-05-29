import React from 'react';
import {Link, Redirect, Route} from 'react-router-dom';
import { Dropdown, Button, Input, Container, Header, Form, TextArea, Modal, Image } from 'semantic-ui-react';
import Navbar from './Navbar.js'
import './App.css'


class Admin extends React.Component{
    constructor(props){
        super(props);

        if(this.props.userObj === null)
        {
            window.location.href = '/login';
            console.log('hello')
        }
        if(this.props.userObj.userPermissions[0].role !== "admin")
        {
            window.location.href = '/feed';
            console.log('goodbye') 
        }

        
        this.state = {
            report: '',
            runReport: false,
            createUser: false,
            AllUsers: [],
            selectedUser: '',
            allDepartments: [],
            allRoles: [],

            selectedUserInfo:{},
            firstName:'',
            lastName: '',
            email:'',
            department:'',
            role:'',
            cfirstName:'',
            clastName: '',
            cemail:'',
            cdepartment:'',
            crole:'',
            selectedDepartment:'',
            departmentToAdd: '',
            selectedRole: '',
            roleToAdd:''
        }
        
        this.searchQuery = "a";
        
        console.log("The user object passed in is: " + JSON.stringify(props.userObj));
    
    }

    
     options = [ { key: 'Users', value: 'Users', text: 'Users' },
                    { key: 'Departments', value: 'Departments', text: 'Departments' },
                    { key: 'Roles', value: 'Roles', text: 'Roles' }  ]


                    

    

    handleReportType = (event, data) => {
        
        console.log(data)
        this.setState({
            report: data.value
            
        },
    function()
{
    
    // if(this.state.report !== "Users")
    // {

    //             document.getElementById("editUser").hidden = true;
    //             document.getElementById("removeUser").hidden = true;
    //             document.getElementById("allUsers").hidden = true;
    // }
    // if(this.state.report !== "Departments")
    // {
        
    //     document.getElementById("addDepButton").hidden = true;
    //     document.getElementById("addDep").hidden = true;
    // }
    if(this.state.report === "Departments")
    {

        this.handleDepartments();
    }
    if(this.state.report === "Roles")
    {
        document.getElementById("addRole").hidden = true;
        this.handleRoles();

    }


    if(this.state.report === "Users")
    {
        
        document.getElementById("allDepartments").hidden = true;
        document.getElementById("addDepButton").hidden = true;
        document.getElementById("addDep").hidden = true;
        document.getElementById("deleteDepartment").hidden = true;
        document.getElementById("searchUser").hidden = false;
        document.getElementById("addDep").hidden = true;
        document.getElementById("addRole").hidden = true;
        document.getElementById("addRoleButton").hidden = true;
        document.getElementById("delRole").hidden = true;
        document.getElementById("delRoleButton").hidden = true;
        document.getElementById("modal").hidden = false; 
        
    }
})
    }


    handleRoles = () =>
    {
        document.getElementById("addDepButton").hidden = true;
        document.getElementById("addDep").hidden = true;
        document.getElementById("allDepartments").hidden = true;
        document.getElementById("deleteDepartment").hidden = true;
        document.getElementById("editUserForm").hidden = true;
        document.getElementById("allUsers").hidden = true;
        document.getElementById("editUser").hidden = true;
        document.getElementById("removeUser").hidden = true;
        document.getElementById("searchUser").hidden = true;
        document.getElementById("modal").hidden = true;

        document.getElementById("addRole").hidden = false;
        document.getElementById("addRoleButton").hidden = false;
        document.getElementById("delRole").hidden = false;
        document.getElementById("delRoleButton").hidden = false;

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

            if(data.statusCode === 500)
            {
                this.setState({
                    allRoles: []
                })
                console.log('No Roles')
            }
            else{
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
                        key: data.roles[i],
                        value: data.roles[i],
                        text:  data.roles[i]
                    })
                }
                this.setState({
                    allRoles: roles
                })
            }
        //document.getElementById("deleteDepartment").hidden = false;
        })
    }

    handleDepartments = () =>
    {
        document.getElementById("addDepButton").hidden = false;
        document.getElementById("addDep").hidden = false;
        document.getElementById("searchUser").hidden = true;
        document.getElementById("allDepartments").hidden = false;
        document.getElementById("editUserForm").hidden = false;


        document.getElementById("addRole").hidden = true;
        document.getElementById("addRoleButton").hidden = true;
        document.getElementById("delRole").hidden = true;
        document.getElementById("delRoleButton").hidden = true;
        
        document.getElementById("editUserForm").hidden = true;
        document.getElementById("allUsers").hidden = true;
        document.getElementById("editUser").hidden = true;
        document.getElementById("removeUser").hidden = true;
        document.getElementById("modal").hidden = true;
        

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
            console.log(data)

            if(data.statusCode === 500)
            {
                this.setState({
                    allDepartments: []
                })
                console.log('No Departments')
            }
            else{
                var length = null;
                if(data.departments.length !== 0)
                {
                    length = data.departments.length;
                }
                else
                {
                    length = 0;
                }
                var departments = []
                for(var i=0; i < data.departments.length; ++i)
                {
    
                    departments.push({
                        key: data.departments[i],
                        value: data.departments[i],
                        text:  data.departments[i]
                    })
                }
                this.setState({
                    allDepartments: departments
                })
                
        document.getElementById("deleteDepartment").hidden = false;
            }
        })
    }

   


    handleRunReport= (event) =>
    {
        console.log(this.state.report)
        this.setState({
            runReport: true
        })
        
    }

    handleCreateUser = (event) =>
    {
        this.setState({
            createUser: true
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

        fetch(`https://mvea1vrrvc.execute-api.us-west-2.amazonaws.com/prod/users/${data}`, {
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
                alert('User Deleted');
                window.location.reload();
            })
    }


    handleRemoveUser = (event) =>
    {
        
        fetch(`https://mvea1vrrvc.execute-api.us-west-2.amazonaws.com/prod/users?email=${this.state.selectedUser}`, {
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
        if(this.state.report === "Users")
        {
        fetch(`https://mvea1vrrvc.execute-api.us-west-2.amazonaws.com/prod/users?namesearch=${data.value}`, {
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
                        key: data.roles[i],
                        value: data.roles[i],
                        text:  data.roles[i]
                    })
                }
            this.setState({
                allRoles: roles
            })
        })

        
    }


    getUserInfo = () =>
    {
        fetch(`https://mvea1vrrvc.execute-api.us-west-2.amazonaws.com/prod/users?email=${this.state.selectedUser}`, {
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
                    selectedUserInfo: data.users[0],
                    firstName: data.users[0].firstName,
                    lastName: data.users[0].lastName,
                    email:data.users[0].email,
                    department:data.users[0].userPermissions[0].department,
                    role:data.users[0].userPermissions[0].role   
                })

            })
    }


    submitUserEdit = (event, data) =>
    {
        var data = {};


        var data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            userId:this.state.selectedUserInfo.userId,
            userPermissions: [{department: this.state.department, role: this.state.role}],
            posts: this.state.selectedUserInfo.posts,
            comments: this.state.selectedUserInfo.comments,
            votes: this.state.selectedUserInfo.votes
            
        }

        console.log(data)

        fetch(`https://mvea1vrrvc.execute-api.us-west-2.amazonaws.com/prod/users/${this.state.selectedUserInfo.userId}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log('user edited');
            window.location.reload();
        })
            
    }


    submitCreateUser = (event, data) =>
    {
        var data = {};


        var data = {
            firstName: this.state.cfirstName,
            lastName: this.state.clastName,
            email: this.state.cemail,
            userPermissions: [{department: this.state.cdepartment, role: this.state.crole}],
            posts: [],
            comments: [],
            votes: []
            
        }

        console.log(data)

        fetch(`https://mvea1vrrvc.execute-api.us-west-2.amazonaws.com/prod/users`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log('user created');
            window.location.reload();
        })
            
    }

    deleteDepartment= (event, data) =>
    {
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/departments/${this.state.selectedDepartment}`, {
            headers: {
                'content-type': 'application/json'
                 },
            method: 'DELETE',
        })
        .then(results =>
        {
            return JSON.stringify(results);
        })
        .then(response => {
            console.log(response);
            console.log('deleted');
            alert('Department Deleted.');
            window.location.reload();
        })
    }

    deleteRole= (event, data) =>
    {
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/roles/${this.state.selectedRole}`, {
            headers: {
                'content-type': 'application/json'
                 },
            method: 'DELETE',
        })
        .then(results =>
        {
            return JSON.stringify(results);
        })
        .then(response => {
            console.log(response);
            console.log('deleted');
            alert('Role Deleted.');
            window.location.reload();
        })
    }


    submitDepartment = (event) =>
    {
        //console.log(this.state.departmentToAdd)

        var data = {
            department: this.state.departmentToAdd
        }

        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/departments/`, {
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then(response => {
                return response.json();
            })
            .then(result => {
                console.log(result);
                alert('Department Added.');
                window.location.reload();
            })
    }

    submitRole = (event) =>
    {
        var data = {
            role: this.state.roleToAdd
        }

        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/roles/`, {
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then(response => {
                return response.json();
            })
            .then(result => {
                console.log(result);
                alert('Role Added.');
                window.location.reload();
            })
    }

    

    handleChange = (e, { name, value }) => this.setState({ [name]: value })


    render(){ 
        if (this.state.runReport === true){
            if(this.state.report === "")
            {
                
                window.location.reload();
            }
            else
            {

                return(<Redirect to={`/${this.state.report}/report`}/>);//go to the new post's page
            }
            }
        

        

         return(
             <div>
                <link href="https://fonts.googleapis.com/css?family=Bowlby+One+SC|Lato|Lobster" rel="stylesheet" />
                <Navbar searchMethod={this.handleSearch}/>
                 <div className="container">
                 
                     <div className=''>
                         <div className='card card-1  text-md-center'>
                             <div className='card-body text-center'>
                                 <h2 style={{color: 'black'}} id="pageTitle">Admin Page</h2>


                            <Dropdown placeholder='Select Type' onChange={this.handleReportType} selection options={this.options}/>


                            <Button standard onClick={this.handleRunReport}>Reports</Button> 

                            {/* USERS */}


                            {/* <Button standard  in="makeUser" onClick={this.handleCreateUser}>Create User</Button> */}
                            <br/><br/><br/>

                            <div hidden id="modal">
                            <Modal trigger={<Button>Create User</Button>}>
                                <Modal.Header>Admin - Create User</Modal.Header>                             
                                <Modal.Description>
                                <Form id="ceditUserForm" onSubmit={this.submitCreateUser} >                           
                            <Form.Input name='cfirstName' id="cformFirstName" fluid label='First name' placeholder="First Name" onChange={this.handleChange}/>
                            <Form.Input name="clastName" id="cformLastName" fluid label='Last name' placeholder="Last Name" onChange={this.handleChange} />
                            <Form.Input name="cemail" id="cformEmail" fluid label='Email' placeholder="Email" onChange={this.handleChange} />
                            <Form.Dropdown name="cdepartment" id="cformDepartment" fluid selection label='department' onFocus={this.getAllDepartments} onChange={this.handleChange} options={this.state.allDepartments} placeholder='Department'/>
                            <Form.Dropdown name="crole" id="cformRole" fluid selection label='role'  onFocus={this.getAllRoles} onChange={this.handleChange} options={this.state.allRoles} placeholder='Role' />
                            <Button>Submit</Button>
                        </Form>
                                </Modal.Description>
                            </Modal>
                            </div> <br/>


                            <Input id="searchUser"  placeholder='Search User...' onChange={this.heandlSearchUser} /> <br/>

                            <Dropdown id="allUsers" selection options={this.state.AllUsers} hidden onChange={this.handleUserChange}  />
                            <br/>
                            <Button standard hidden id="editUser" onClick={this.handleEditUser}>Edit User</Button>
                            <Button standard hidden id="removeUser" onClick={this.handleRemoveUser}>Remove User</Button>


                            {/* DEPARTMENT */}

                            <Input id="addDep"  placeholder='Department Name...' name="departmentToAdd" onChange={this.handleChange} />
                            <Button standard hidden id="addDepButton" onClick={this.submitDepartment}>Add Department</Button> <br />
                            <Dropdown id="allDepartments" name="selectedDepartment" label="All Departments" selection options={this.state.allDepartments} onChange={this.handleChange} hidden  />
                            <Button standard hidden id="deleteDepartment" onClick={this.deleteDepartment}>Delete Department</Button>
                            
                            

                            {/* ROLES */}
                            <Input id="addRole"  placeholder='Role Name...' name="roleToAdd" onChange={this.handleChange} />
                            <Button standard hidden id="addRoleButton" onClick={this.submitRole}>Add Role</Button> <br />
                            <Dropdown id="delRole" selection   placeholder='Roles...' name="selectedRole" onChange={this.handleChange} options={this.state.allRoles} hidden/>
                            <Button standard hidden id="delRoleButton" onClick={this.deleteRole}>Delete Role</Button> <br />

                        

                        {/* EDIT USER FORM */}

                        <Form id="editUserForm" onSubmit={this.submitUserEdit} hidden>                           
                            <Form.Input name='firstName' id="formFirstName" fluid label='First name' placeholder={this.state.selectedUserInfo.firstName} onChange={this.handleChange}/>
                            <Form.Input name="lastName" id="formLastName" fluid label='Last name' placeholder={this.state.selectedUserInfo.lastName} onChange={this.handleChange} />
                            <Form.Input name="email" id="formEmail" fluid label='Email' placeholder={this.state.selectedUserInfo.email} onChange={this.handleChange} />
                            <Form.Dropdown name="department" id="formDepartment" fluid selection label='department' onFocus={this.getAllDepartments} onChange={this.handleChange} options={this.state.allDepartments} placeholder='Department'/>
                            <Form.Dropdown name="role" id="formRole" fluid selection label='role'  onFocus={this.getAllRoles} onChange={this.handleChange} options={this.state.allRoles} placeholder='Role' />
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