import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './index.css';

import LogInPage from './LogInPage.js';
import FeedPage from './FeedPage.js';
import PostEditor from './ViewPost.js';

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
                    <Route exact path="/" component={LogInPage}/>
                    <Route path="/login" component={LogInPage}/>
                    <Route path="/feed" component={FeedPage}/>
                    <Route path="/post" component={PostEditor}/>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));