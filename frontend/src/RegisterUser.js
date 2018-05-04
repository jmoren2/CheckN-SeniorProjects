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

        fetch('https://95sbuermt6.execute-api.us-west-2.amazonaws.com/dev/users/', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(result => {
            return result.json()
        })
        .then(response => {
            this.setState({returnedUser: response.user, handleSubmitDone: true});
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
                                        <label>email: </label>
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