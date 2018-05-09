import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import logo from './images/checknlogo.png';
import clientLogo from './images/nikeCheck.jpg'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class LogInPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            returnedUser: null,
            handleSubmitDone: false
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log("The user object passed in is: " + props.userObj);
    }

    handleChangeEmail(event) {
        //DOESN'T WORK IF YOU COPY/PASTE AN EMAIL
        this.setState({email: event.target.value});//Updates the firstName field as typing occurs
    }

    handleChangePassword(event) {
        //DOESN'T WORK IF YOU COPY/PASTE A PASSWORD
        this.setState({password: event.target.value});//Updates the lastName field as typing occurs
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/users?email=${this.state.email}`, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET',
        })
        .then(result => {
            return result.json();
        })
        .then(response => {
            //NEEDS A CASE FOR IF NO USER IS FOUND
            return(JSON.stringify(response.users[0]));
        })
        .then(validUser => {
            this.props.indexUserMethod(validUser);//Sends the user object up to index for distributing across all pages. indexUserMethod is setUserObject in index.js
            this.setState({handleSubmitDone: true});
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        if (this.state.handleSubmitDone === true || this.props.userObj != null){
            return(<Redirect to='/feed'/>);//go to the feed page with our user object
        }
        return(
            <div id="LoginPageContainer" className="h-100 w-50">
                <div className="container">
                    <div className='card card-1 text-md-center'>
                        <div className='card-body text-center'>
                            <img height="25%" width="25%" src={clientLogo} style={{objectFit:'contain'}} /><br />

                            <div className="row">

                                <div className="mx-auto">

                                    <div className="">
                                <h2 className=''  style={{color:'black'}}>CheckN</h2>
                                <img height="15%" width="15%" src={logo} style={{objectFit:'contain'}} />
                                </div>

                                    </div>


                            </div>

                            <form onSubmit={this.handleSubmit}>
                                <div className='form-group'>
                                    <input value={this.state.email} onChange={this.handleChangeEmail} placeholder='Email' className='form-control' /> <br />
                                    <input value={this.state.password} onChange={this.handleChangePassword}  placeholder='Password' className='form-control' />
                                </div>
                                <button className='btn btn-info' type='submit'>Login</button>
                            </form>

                            <div className=''>
                                <Link to="/register">
                                <button className='btn btn-info'>Register</button>
                                </Link>
                            </div>
                         </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default LogInPage;