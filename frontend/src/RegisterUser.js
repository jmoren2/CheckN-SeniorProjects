import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from './Navbar.js'
import 'bootstrap/dist/css/bootstrap.css';
import App from './index.js';

import {createUser} from './assets/okta-api-handler'


class RegisterUser extends Component{
    constructor(props){
        super(props);
        this.state = {
                    firstName: '', 
                    lastName: '',
                    email: '',
                    returnedUser: null, 
                    handleSubmitDone: false};
        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeLast = this.handleChangeLast.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log("The user object passed in is: " + props.userObj);
    }

    handleSubmit(event){
        event.preventDefault();
        //What is being sent to the API
        const data = {
            firstName: this.state.firstName, 
            lastName: this.state.lastName,
            email: this.state.email
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
            console.log(result.json())
        })
        // ********************************* //

        fetch('https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/users/', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(result => {
            return result.json()
        })
        .then(response => {
            console.log("response.user object: " + response.user);
            this.setState({handleSubmitDone: true});
        });
    }

    handleChangeFirst(event) {
        this.setState({firstName: event.target.value});//Updates the firstName field as typing occurs
    }

    handleChangeLast(event) {
        this.setState({lastName: event.target.value});//Updates the lastName field as typing occurs
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value});//Updates the email field as typing occurs
    }

    render(){
        if (this.state.handleSubmitDone === true || this.props.userObj != null){
        return(<Redirect to='/login'/>);//go to the login page to actually log in with the newly-created account
        }
        return(
            <div>

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