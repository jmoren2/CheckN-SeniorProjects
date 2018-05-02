import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from './Navbar.js'
import 'bootstrap/dist/css/bootstrap.css';
import App from './index.js';

class RegisterUser extends Component{
    constructor(props){
        super(props);
        this.state = {
                    firstName: '', 
                    lastName: '',
                    email: '',
                    returnedId: null, 
                    handleSubmitDone: false};
        this.handleChangeFirst = this.handleChangeFirst.bind(this);
        this.handleChangeLast = this.handleChangeLast.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    passUser = (passThrough) => {//Sends the created user ID back up to the App props in index.js
        passThrough = this.state.returnedId;
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('state.firstName: ' + this.state.firstName);
        console.log('state.lastName: ' + this.state.lastName);
        console.log('state.email: ' + this.state.email);
        //What is being sent to the API
        const data = {
            firstName: this.state.firstName, 
            lastName: this.state.lastName,
            email: this.state.email
        };
        console.log('data: ' + JSON.stringify(data));

        fetch('https://95sbuermt6.execute-api.us-west-2.amazonaws.com/dev/users/', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(result => {
            console.log('result: ' + JSON.stringify(result));
            return result.json()
        })
        .then(response => {
            console.log('response: ' + JSON.stringify(response));
            this.setState({returnedId: response.user.userId, handleSubmitDone: true});
            console.log(response.user);
            console.log(response.user.userId);
            <App userID={this.passUser}/>//Sending userID back up to index for sharing between pages
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
        if (this.state.handleSubmitDone === true){
            return <Redirect to={`/login`}/>//go to the login page with our user ID
        }
        return(
            <div>

            <Navbar />

            <div className="container">
            
            <div className=''>
                <div className='card card-1  text-md-center'>
                    <div className='card-body text-center'>
                    <h2 className='text-center' style={{color:'black'}}>Register New User</h2>

            <form onSubmit={this.handleSubmit}>
                                <div className='form-group'>
                                    <label>firstName: </label>
                                    <input value={this.state.firstName} onChange={this.handleChangeFirst} placeholder='First Name' className='form-control' /> <br />
                                </div>

                                <div className='form-group'>
                                    <label>lastName: </label>
                                    <input value={this.state.lastName} onChange={this.handleChangeLast}  placeholder='Last Name' className='form-control' /> <br />
                                </div>

                                <div className='form-group'>
                                    <label>lastName: </label>
                                    <input value={this.state.email} onChange={this.handleChangeEmail}  placeholder='Email' className='form-control' /> <br />
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