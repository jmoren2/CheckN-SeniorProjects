import React from 'react';
import {Link} from 'react-router-dom';
import logo from './images/checknlogo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class LogInPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(

            

            <div id="LoginPageContainer" className="h-100 w-50">
                <div className="container">
                {/* <Navbar /> */}
                <div className='card card-1 text-md-center'>
                        <div className='card-body text-center'>
                            <img height="25%" width="25%" src={logo} style={{objectFit:'contain'}} /><br />
                            <h2 className='text-center'  style={{color:'black'}}>CheckN</h2>
                            {/*console.log(this.props.location.user.userId)/*This should display the user ID from the given user object*/}

                            <form >
                                <div className='form-group'>
                            <input placeholder='Username' className=' form-control' /> <br />
                            <input placeholder='Password' className=' form-control' /> <br />
                            </div>
                            </form>

                            <div className=''>
                                <Link to={{pathname: '/feed', user: this.props.location.user}}>
                                <button className='btn btn-info' type='submit'>Login</button>
                                </Link>
                                <Link to="/register">
                                <button className='btn btn-info' type='submit'>Register</button>
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