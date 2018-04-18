import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class LogInPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <Link to="/feed">
                <button>Log In</button>
            </Link>
        );
    }
}

export default LogInPage;