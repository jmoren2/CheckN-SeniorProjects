import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';

import LogInPage from './LogInPage.js';
import FeedPage from './FeedPage.js';
import ViewPost from './ViewPost.js';
import CreatePost from './CreatePost.js';
import About from './About.js';
import RegisterUser from './RegisterUser.js';
import EditPost from './EditPost.js';

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
                    <Route exact path="/" component={props => (<LogInPage indexUserMethod={this.setUserObject} userObj={this.userObj} {...props}/>)}/>{/*Passes a potentially null user object to the login page to check if login is necessary*/}
                    <Route path="/login" component={props => (<LogInPage indexUserMethod={this.setUserObject} userObj={this.userObj} {...props}/>)}/>{/*Set the user object with this.props.indexUserMethod()*/}
                    <Route path="/feed" component={props => (<FeedPage userObj={this.userObj} {...props}/>)}/>{/*Access with this.props.userObj*/}
                    <Route path="/post/:postID" component={props => (<ViewPost userObj={this.userObj} {...props}/>)}/>
                    <Route path="/create" component={props => (<CreatePost userObj={this.userObj} {...props}/>)}/>
                    <Route path="/register" component={props => (<RegisterUser userObj={this.userObj} {...props}/>)}/>{/*Shouldn't be at this page if signed-in*/}
                    <Route path="/about" component={About}/>
                    <Route path="/edit/:postID" component={props => (<EditPost userObj={this.userObj} {...props}/>)}/>
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));