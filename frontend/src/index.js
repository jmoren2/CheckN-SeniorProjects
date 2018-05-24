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
import Admin from './Admin.js'
import Report from './Report.js'
import DepartmentReport from './DepartmentReport.js'
import Survey from './Survey.js';
import SurveyResponse from './SurveyResponses.js';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.userObj = this.retrieveUserObjFromCookie();
    }

    setUserObject = (user) => {
        console.log("this.userObj has been given: " + user);
        this.userObj = user;
        this.constructCookie(user);
    }

    //Creates the cookie.  This will be created when setUserObject ^ is called from the login page (so when logging in for the first time)
    constructCookie(user){
        if (user === null)
        {
            document.cookie = ('user= ');
        } 
        else
        {
            document.cookie = ('user=' + JSON.stringify(user));
        }
        document.cookie = 'path=/';
    }

    retrieveUserObjFromCookie(){
        try {
            console.log(document.cookie);
        //First get the cookie and split it on user=, this way I can have a string that at least starts as the object
        var user = document.cookie.split('user=')[1];
        
        //Now split on the } to get rid of any extra just in case and put the } back on
        user = ((user.split('};')[0]));
     
        //Now what I have left is the stringified JSON object that can be parsed
        user = JSON.parse(user);
        
        
        
        return (user);
        }
        catch(err){
            console.log('aasdfasdf')
            //If anything at all went wrong then send a null user and they should be sent to login screen
            console.log(err);
            return null;
        }
    }

    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" component={props => (<LogInPage indexUserMethod={this.setUserObject} userObj={this.userObj} loggedOut={true} {...props}/>)}/>{/*Passes a potentially null user object to the login page to check if login is necessary*/}
                    <Route path="/login" component={props => (<LogInPage  indexUserMethod={this.setUserObject} loggedOut={true}{...props}/>)}/>{/*Set the user object with this.props.indexUserMethod()*/}
                    <Route path="/logout" component={props => (<LogInPage indexUserMethod={this.setUserObject}  loggedOut={true}{...props}/>)}/>
                    <Route path="/feed" component={props => (<FeedPage userObj={this.userObj} {...props}/>)}/>{/*Access with this.props.userObj*/}
                    <Route path="/post/:postID" component={props => (<ViewPost userObj={this.userObj} {...props}/>)}/>
                    <Route path="/create" component={props => (<CreatePost userObj={this.userObj} {...props}/>)}/>
                    <Route path="/register" component={props => (<RegisterUser userObj={null} {...props}/>)}/>{/*Shouldn't be at this page if signed-in*/}
                    <Route path="/about" component={About}/>
                    <Route path="/edit/:postID" component={props => (<EditPost userObj={this.userObj} {...props}/>)}/>
                    <Route path="/admin" component={props => (<Admin userObj={this.userObj} {...props}/>)}/>
                    <Route path="/Users/report" component={props => (<Report userObj={this.userObj} {...props}/>)}/>
                    <Route path="/Departments/report" component={props => (<DepartmentReport userObj={this.userObj} {...props}/>)}/>
                    <Route path="/survey/:surveyId/:fromPostId" component={props => (<Survey userObj={this.userObj} {...props}/>)}/>
                    <Route path="/surveyResponses/:surveyId/:fromPostId" component={props => (<SurveyResponse userObj={this.userObj} {...props}/>)}/>
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));