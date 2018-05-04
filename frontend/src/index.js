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
        this.userObj = null;
    }

    setUserObject = (user) => {
        console.log("this.userObj has been given: " + user);
        this.userObj = user;
    }

    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={() => (<LogInPage indexUserMethod={this.setUserObject} userObj={this.userObj}/>)}/>{/*Passes a potentially null user object to the login page to check if login is necessary*/}
                    <Route path="/login" component={() => (<LogInPage indexUserMethod={this.setUserObject} userObj={this.userObj}/>)}/>{/*Set the user object with this.props.indexUserMethod()*/}
                    <Route path="/feed" component={() => (<FeedPage userObj={this.userObj}/>)}/>{/*Access with this.props.userObj*/}
                    <Route path="/post/:postID" component={() => (<ViewPost userObj={this.userObj}/>)}/>
                    <Route path="/create" component={() => (<CreatePost userObj={this.userObj}/>)}/>
                    <Route path="/register" component={() => (<RegisterUser userObj={this.userObj}/>)}/>{/*Shouldn't be at this page if signed-in*/}
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));