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
    }

    render(){
        return(
            <Router>
                <div>
                    <Route exact path="/" render={() => <LogInPage userID={this.props.userID}/>}/>
                    <Route path="/login" render={() => <LogInPage userID={this.props.userID}/>}/>
                    <Route path="/feed" render={() => <FeedPage userID={this.props.userID}/>}/>
                    <Route path="/post/:postID" render={() => <ViewPost userID={this.props.userID}/>}/>
                    <Route path="/create" render={() => <CreatePost userID={this.props.userID}/>}/>
                    <Route path="/register" component={RegisterUser}/>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));