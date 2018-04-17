import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class FeedPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    //Temporary link to self
    render(){
        return(
            <div>
                <Link to="/feed">
                    <button>Create Post</button>
                </Link>
                <Link to="/post">
                    <button>View Post</button>
                </Link>
            </div>
        );
    }
}

export default FeedPage;