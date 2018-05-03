import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import logo from './images/checknlogo.png';
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
        console.log("I'M HERE");
        console.log(this.state.email);
        event.preventDefault();
        fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/users?email=${this.state.email}`, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET',
        })
        .then(result => {
            console.log(JSON.stringify(result));
            return result.json();
        })
        .then(response => {
            console.log('user objects: ' + JSON.stringify(response.users));
            console.log('ARRAY SELECTION' + JSON.stringify(response.users[0]));
            return(JSON.stringify(response.users[0]));
        })
        .then(validUser => {
            console.log('SUBMIT HANDLED');
            this.props.indexUserMethod(validUser);
            this.setState({handleSubmitDone: true});
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        if (this.state.handleSubmitDone === true){
            console.log("GOT INTO THE END STATE BEFORE REDIRECTING");
        return <Redirect to={`/feed`}/>;//go to the feed page with our user ID
        }
        return(
            <div id="LoginPageContainer" className="h-100 w-50">
                <div className="container">
                {/* <Navbar /> */}
                <div className='card card-1 text-md-center'>
                        <div className='card-body text-center'>
                            <img height="25%" width="25%" src={logo} style={{objectFit:'contain'}} /><br />
                            <h2 className='text-center'  style={{color:'black'}}>CheckN</h2>
                            {/*console.log(this.props.location.user.userId)/*This should display the user ID from the given user object*/}

                            <form onSubmit={this.handleSubmit}>
                                <div className='form-group'>
                                <input value={this.state.email} onChange={this.handleChangeEmail} placeholder='Email' className='form-control' /> <br />
                                <input value={this.state.password} onChange={this.handleChangePassword}  placeholder='Password' className='form-control' />
                            </div>
                                {/* <Link to={{pathname: '/feed', user: this.props.location.user}}> */}
                                <button className='btn btn-info' type='submit'>Login</button>
                                {/* </Link> */}
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
               
            /* // </div>
            // <div id="LoginPageContainer">
            //     <img src={logo} /><br />
            //     <Link to="/feed">
            //         <button>Log In</button>
            //     </Link>
            // </div> */
        );
    }
}

export default LogInPage;