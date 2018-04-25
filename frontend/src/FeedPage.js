import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar.js'

class FeedPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            feed: <div>Loading...</div>,
        }
        this.searchQuery = "search=a";
    }

    //This is a default method of a React.Component that gets called when the component is first created
    componentDidMount(){
        this.retrieveFeed();
    }

    //Handles fetching a list of posts based on a searchQuery and updates the State so the feed is rendered
    retrieveFeed(){
        fetch(`https://95sbuermt6.execute-api.us-west-2.amazonaws.com/dev/posts?${this.searchQuery}`, {
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
                <br />
                    <div key={post.postId} className="card bg-light">
                    <div class="card-block">
                        {post.content}
                        </div>
                    </div>
                </Link>
            )
        })
        return feed;
    }

    //This method recieves searchParams (from the Navbar that this method gets passed to)
    //It then calls the method to turn those params into a usable query and calls retrieveFeed
    handleSearch = (searchParams) => {
        var newQuery = this.generateSearchQuery(searchParams);
        this.searchQuery = newQuery;
        this.retrieveFeed();
    }

    //The search query will be constructed here, later allowing for multi-word searches and user searches
    generateSearchQuery(searchParams){
        var query = "search=";
        query += searchParams.words;
        return query;
    }

    //Temporary link to self
    render(){
        return(
            <div>

                <Navbar searchMethod={this.handleSearch}/>
            <div className="container">
            
                <div className=''>
                    <div className='card card-1  text-md-center'>
                        <div className='card-body text-center'>
                            <h2 style={{color: 'black'}}>Your Feed</h2>
                            {/* <Link to="/create">
                            <button className='btn btn-info' type='submit'>Create Post</button> <br />
                </Link> */}
                {/* <Link to="/post/de70345f-d7ef-4baa-b97f-c5c0391d6dd1">
                <button className='btn btn-info' type='submit'>View Post</button>
                </Link> */}
                        
                        {this.state.feed}
                        
                            
                        
                        
                        </div>
                    </div>
                </div>
            </div>
            </div>
            


            // <div>
            //     <Link to="/create">
            //         <button>Create Post</button>
            //     </Link>
            //     <Link to="/post/de70345f-d7ef-4baa-b97f-c5c0391d6dd1">
            //         <button>View Post</button>
            //     </Link>
            //     {this.state.feed}
            // </div>
        );
    }
}

export default FeedPage;