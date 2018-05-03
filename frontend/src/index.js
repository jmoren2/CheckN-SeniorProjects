import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';

import LogInPage from './LogInPage.js';
import FeedPage from './FeedPage.js';
import ViewPost from './ViewPost.js';
import CreatePost from './CreatePost.js';
import RegisterUser from './RegisterUser.js';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
        this.userData = null;
        console.log("index constructor");
    }

    //This function sets this.userData
    //Pass it as a parameter to any other page and call it with props.(whatever name you give it)
    setUserData = (user) => {
        console.log("getUserData is setting index's user to:");
        console.log(user);
        this.userData = user;
    }


    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={() => (<LogInPage indexUserMethod={this.setUserData}/>)}/>
                    <Route path="/login" component={() => (<LogInPage indexUserMethod={this.setUserData}/>)}/>
                    <Route path="/feed" component={props => (<FeedPage userData={this.userData} {...props}/>)}/>
                    <Route path="/post/:postID" component={props => (<ViewPost userData={this.userData} {...props}/>)}/>
                    <Route path="/create" component={() => (<CreatePost userData={this.userData}/>)}/>
                    <Route path="/register" component={() => (<RegisterUser/>)}/>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));