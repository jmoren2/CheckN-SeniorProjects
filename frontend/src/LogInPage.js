import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import logo from './images/checknlogo.png';
import './App.css';

class LogInPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <div id="LoginPageContainer">
                <img src={logo} /><br />
                <Link to="/feed">
                    <button>Log In</button>
                </Link>
            </div>
        );
    }
}

export default LogInPage;