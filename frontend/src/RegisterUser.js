import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from './Navbar.js'
import 'bootstrap/dist/css/bootstrap.css';
import App from './index.js';
import {Dropdown} from 'semantic-ui-react';

import {createUser} from './assets/okta-api-handler'


class RegisterUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '', 
            lastName: '',
            email: '',
            selectedDepartment: '',
            allDepartments: [],
            returnedUser: null, 
            handleSubmitDone: false
        };
        this.allFields = [0, 0, 0, 0];
        this.delete_cookie("user")
        this.getAllDepartments = this.getAllDepartments.bind(this);
        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeLast = this.handleChangeLast.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleDepChange = this.handleDepChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.getAllDepartments();
    }

    delete_cookie = function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    handleSubmit(event){
        event.preventDefault();
        for(var i = 0; i < 4; ++i){
            if(this.allFields[i] === 0)
                return("Not all fields have been filled out");
        }
        //What is being sent to the API
        const data = {
            firstName: this.state.firstName, 
            lastName: this.state.lastName,
            email: this.state.email,
            userPermissions: [{department: this.state.selectedDepartment, role: 'standard'}],
            posts: [],
            comments: [],
            votes: []
        };

        var data2 = {
            firstName: this.state.firstName, 
            lastName: this.state.lastName,
            email: this.state.email,
            login: this.state.email
        };

        //** Test ONLY dont merge to master **//
        createUser(data2)
        .then(result => {
        })
        // ********************************* //

        fetch('https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/users/', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(result => {
            return result.json()
        })
        .then(response => {
            this.setState({handleSubmitDone: true});
        });
    }

    handleChangeFirst(event) {
        this.setState({firstName: event.target.value});//Updates the firstName field as typing occurs
        this.allFields[0] = 1;
    }

    handleChangeLast(event) {
        this.setState({lastName: event.target.value});//Updates the lastName field as typing occurs
        this.allFields[1] = 1;
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});//Updates the email field as typing occurs
        this.allFields[2] = 1;
    }

    handleDepChange = (event, data) => {
        this.setState({
            selectedDepartment: data.value
        })
        this.allFields[3] = 1;
    }

    getAllDepartments = () => {
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/departments`, {
            headers: {
                'content-type': 'application/json'
                 },
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(list => {
            var dropdown = document.getElementById("allDepartments");
            var departments = [];
            for(var i = 0; i < list.departments.length; ++i){
                departments.push({
                    key: list.departments[i],
                    value: list.departments[i],
                    text: list.departments[i]
                });
            }
            this.setState({allDepartments: departments});

            dropdown.hidden = false;
        });
    }

    render(){
        if (this.state.handleSubmitDone === true || this.props.userObj != null){
            return(<Redirect to='/login'/>);//go to the login page to actually log in with the newly-created account
        }
        return(
            <div>

                <link href="https://fonts.googleapis.com/css?family=Bowlby+One+SC|Lato|Lobster" rel="stylesheet" />
                <div className="container">
                
                    <div className=''>
                        <div className='card card-1  text-md-center'>
                            <div className='card-body text-center'>
                                <h2 className='text-center' style={{color:'black'}}>Register New User</h2>

                                <form onSubmit={this.handleSubmit}>

                                    <div className='form-group'>
                                        <label>First Name: </label>
                                        <input value={this.state.firstName} onChange={this.handleChangeFirst} placeholder='First Name' className='form-control' required /> <br />
                                    </div>

                                    <div className='form-group'>
                                        <label>Last Name: </label>
                                        <input value={this.state.lastName} onChange={this.handleChangeLast}  placeholder='Last Name' className='form-control' required/> <br />
                                    </div>

                                    <div className='form-group'>
                                        <label>Email: </label>
                                        <input value={this.state.email} onChange={this.handleChangeEmail}  placeholder='Email' className='form-control' required/> <br />
                                    </div>

                                    <Dropdown id="allDepartments" placeholder='Select Department' onChange={this.handleDepChange} hidden selection options={this.state.allDepartments} /> <br />

                                    <button className='btn btn-info' type='submit'>Submit</button>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterUser;