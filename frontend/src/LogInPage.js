import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import logo from './images/checknlogo.svg';
import clientLogo from './images/nikeCheck.jpg'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {loginUser, getUser, deleteUser} from './assets/okta-api-handler'
import './images/NikeWHQ_Campus_Aerial_5075_original.jpg'



class LogInPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            returnedUser: null,
            handleSubmitDone: false
        }
        this.delete_cookie("user")
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        //This is how I delete the cookie, please don't touch
        if (props.loggedOut === true)
        {
            props.indexUserMethod(null);
        }
    }

    delete_cookie = function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    handleChangeEmail(event) {
        this.setState({email: event.target.value});//Updates the firstName field as typing occurs
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});//Updates the lastName field as typing occurs
    }

    handleSubmit(event){
        event.preventDefault();

        //** Test ONLY dont merge to master **//
        
        // loginUser(this.state.email, this.state.password)
        // .then(result => {
        //     return result.json()
        // })
        // .then(data => {
        //     console.log("Logined : ", data)
        // })

        // deleteUser("test@test1.com")
        // .then(response => {
        //     console.log(response);
        // })

        // ********************************* //

        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/users?email=${this.state.email}`, {
        //fetch(`https://mvea1vrrvc.execute-api.us-west-2.amazonaws.com/prod/users?email=${this.state.email}`, {
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
            
            return(response.users[0]);
        })
        .then(validUser => {
            if(validUser)
            {
                this.props.indexUserMethod(validUser);//Sends the user object up to index for distributing across all pages. indexUserMethod is setUserObject in index.js
                this.setState({handleSubmitDone: true});

            }
            else
            {
                alert('Login Failed.')
                
                window.location.reload();
            }
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
                <link href="https://fonts.googleapis.com/css?family=Bowlby+One+SC|Lato|Lobster|Lora" rel="stylesheet" />
                <div className="container">
                    <div className='card card-1 text-md-center'>
                        <div className='card-body text-center'>
                            <img height="50%" width="50%" src={clientLogo} style={{objectFit:'contain'}} /><br />

                            <div className="row">

                                <div className="mx-auto">

                                    <div className="">
                                        <h2 className=''  style={{color:'black'}} id='loginTitle'>CheckN</h2>
                                    </div>
                                    
                                </div>

                            </div>

                            <form onSubmit={this.handleSubmit}>
                                <div className='form-group'>
                                    <input value={this.state.email} onChange={this.handleChangeEmail} placeholder='Email' className='form-control' required /> <br />
                                    <input value={this.state.password} onChange={this.handleChangePassword}  placeholder='Password' className='form-control' type='password' required />
                                </div>
                                <button className='btn btn-info' type='submit'>Login</button> <br/>
                            </form>

                            <div className=''>
                            <br/>
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