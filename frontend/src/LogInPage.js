import React from 'react';
import {Link} from 'react-router-dom';
import logo from './images/checknlogo.png';
import clientLogo from './images/nikeCheck.jpg'
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
                            <img height="25%" width="25%" src={clientLogo} style={{objectFit:'contain'}} /><br />

                            <div className="row">

                                <div className="mx-auto">

                                    <div className="">
                                <h2 className=''  style={{color:'black'}}>CheckN</h2>
                                <img height="10%" width="10%" src={logo} style={{objectFit:'contain'}} />
                                </div>

                                    </div>


                            </div>

                            <form >
                                <div className='form-group'>
                            <input placeholder='Username' className=' form-control' /> <br />
                            <input placeholder='Password' className=' form-control' /> <br />
                            </div>
                            </form>

                            <div className=''>
                                <Link to="/feed">
                                <button className='btn btn-info' type='submit'>Login</button>
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