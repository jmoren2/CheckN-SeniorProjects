import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar.js'
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';
import Neutral from 'react-icons/lib/fa/arrows-h';
import Moment from 'react-moment';

class FeedPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            feed: <div>Loading...</div>,
        }
        this.searchQuery = "search=a";
        console.log("The user object passed in is: " + props.userObj);
    }

    //This is a default method of a React.Component that gets called when the component is first created
    componentDidMount(){
        this.retrieveFeed();
    }

    //Handles fetching a list of posts based on a searchQuery and updates the State so the feed is rendered
    retrieveFeed(){
        fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/posts?${this.searchQuery}`, {
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

     voteUp() {
        console.log("voted up!")
    }
    neutralVote() {
        console.log("neutral vote!")
    }
    voteDown() {
        console.log("down vote!")
    }

    generateFeed(posts){
        
        var feed = posts.map((post) => {
            var pVoters = post.positiveVoters;
            var nVoters = post.neutralVoters;
            var negVoters = post.negativeVoters;

            if(pVoters)
            {
                var positiveCount = pVoters.length;
            }
            else
            {
                positiveCount = 0;
            }
            if(nVoters)
            {
                var neutralCount = nVoters.length;
            }
            else
            {
                 neutralCount = 0;
            }
            if(negVoters)
            {
                var negCount = negVoters.length;
            }
            else
            {
                 negCount = 0;
            }
            
            return(
            //individual feed item
            <div className="container">
                <div className="row">
                    <span className="col-sm" >
                        <button class="btn btn-primary btn-sm" type="submit" onClick={this.voteUp}>
                            <ThumbsUp /> {positiveCount}
                        </button>
                    <br />
                        <button class="btn btn-default btn-sm" type="submit" onClick={this.neutralVote}>
                            <Neutral /> {neutralCount}
                        </button>
                    <br />
                        <button class="btn btn-danger btn-sm" type="submit" onClick={this.voteDown}>
                            <ThumbsDown /> {negCount}
                        </button>
                    </span>
                    <div className="col-sm-11">
                        <div className="card bg-light h-100">
                                <Link style={{margin: '10px'}} to={`/post/${post.postId}`}>
                                    <div key={post.postId} >
                                        <div class="card-block">
                                            <div>
                                            </div>
                                            {post.title} <br />
                                        </div>
                                    </div>
                                </Link>
                            <br/>
                            <div className="row">

                                <div className="col-sm-4">
                                <Moment format="YYYY/MM/DD HH:mm">
                                {post.timestamp}
                                </Moment>
                                </div>

                                <div className="col-sm-8">
                                {post.visibilityLevel}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <br/>
            </div>
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
                            
                        {this.state.feed}

                        
                        </div>
                    </div>
                </div>
            </div>

            <Link to='/post/de70345f-d7ef-4baa-b97f-c5c0391d6dd1'>
                <button className='btn btn-info' type='submit'>View Test Post</button>
                </Link>
            </div>
        );
    }
}

export default FeedPage;