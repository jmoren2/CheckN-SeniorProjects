import React from 'react';
import {Link} from 'react-router-dom';

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
                <Link to="/create">
                    <button>Create Post</button>
                </Link>
                <Link to="/post/de70345f-d7ef-4baa-b97f-c5c0391d6dd1">
                    <button>View Post</button>
                </Link>
            </div>
        );
    }
}

export default FeedPage;