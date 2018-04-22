import React from 'react';
import {Link} from 'react-router-dom';

class FeedPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            feed: <div>Feed Placeholder</div>
        }
    }

    componentDidMount(){//Queries the API for a post with specified ID
        this.retrieveFeed();
    }

    retrieveFeed(){
        fetch(`https://95sbuermt6.execute-api.us-west-2.amazonaws.com/dev/posts?search=a`, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET',
        })
        .then(feedResults => {
            return feedResults.json();
        })
        .then(feedData => {
            console.log('comments: ' + JSON.stringify(feedData));
            return(this.generateFeed(feedData.posts));
        })
        .then(Feed => {
            this.setState({feed: Feed});
        })
    }

    generateFeed(posts){
        var feed = posts.map((post) => {
            return(
                <Link to={`/post/${post.postId}`}>
                    <div key={post.postId}>
                        {post.content}
                    </div>
                </Link>
            )
        })
        return feed;
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
                {this.state.feed}
            </div>
        );
    }
}

export default FeedPage;