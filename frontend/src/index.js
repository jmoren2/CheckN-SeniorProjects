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
                    <Route exact path="/" component={props => (<LogInPage {...props} />)}/>{/*Passes a userID to the page*/}
                    <Route path="/login" component={props => (<LogInPage {...props} />)}/>
                    <Route path="/feed" component={props => (<FeedPage {...props} />)}/>
                    <Route path="/post/:postID" component={props => (<ViewPost {...props} />)}/>
                    <Route path="/create" component={props => (<CreatePost {...props} />)}/>
                    <Route path="/register" component={props => (<RegisterUser {...props} />)}/>
                </div>
            </Router>
        );
    }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));