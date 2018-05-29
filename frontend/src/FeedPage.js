import React from 'react';
import {Link, Redirect, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar.js'
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';
import Neutral from 'react-icons/lib/fa/arrows-h';
import Moment from 'react-moment';
import TimeAgo from 'react-timeago'
class FeedPage extends React.Component{
    constructor(props){
        super(props);

        if(this.props.userObj === null)
        {
            window.location.href = '/login';
        }
        this.state = {
            feed: <div>Loading...</div>
        }
        this.searchQuery = "";
        this.pageSize = "pageSize=1000";
        this.forUser = "&forUser=" + this.props.userObj.userId;
    }

    componentDidMount(){//Queries the API for a post with specified ID
       this.retrieveFeed();
    }
    componentDidUpdate()
    {
        //this.retrieveFeed();
    }

    retrieveFeed(){
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/posts?${this.pageSize}${this.forUser}${this.searchQuery}`, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET',
        })
        .then(feedResults => {
            return feedResults.json();
        })
        .then(feedData => {
            if(feedData.posts.length === 0)
                return("No posts to load, make the first!");

            return(this.generateFeed(feedData.posts));
        })
        .then(Feed => {
            this.setState({feed: Feed});
        })
    }

     voteUp(post) {

        var postToBeVotedOn = post.postId;
        var idToVote = null;

        if(post.userId)
        {
            idToVote = post.userId;
        }
        else{
            post.userId = "dabda155-3d89-4cf8-b705-3301fe361249"
            idToVote = post.userId;
        }

        if(post.positiveVoters)
        {
            post['positiveVoters'].push(idToVote);
        }
        else
            {
                post.positiveVoters = [];
                post['positiveVoters'].push(idToVote);
            }


        // TODO
        //grab actual user id

       
       fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/posts/${postToBeVotedOn}`, {
        method: 'PUT',
        body: JSON.stringify(post)
    })
    .then(result => {
        return result.json()
    })
    .then(response => {
    });

    }


    neutralVote(post) {
        var postToBeVotedOn = post.postId;
        var idToVote = null;


        if(post.userId)
        {

            idToVote = post.userId;

        }
        else{
            post.userId = "dabda155-3d89-4cf8-b705-3301fe361249"
            idToVote = post.userId;
        }

        if(post.neutralVoters)
        {
            post['neutralVoters'].push(idToVote);
            
        }
        else
            {
                post.neutralVoters = [];
                post['neutralVoters'].push(idToVote);
            }


            fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/posts/${postToBeVotedOn}`, {
                method: 'PUT',
                body: JSON.stringify(post)
            })
            .then(result => {
                return result.json()
            })
            .then(response => {
            });
    }

    voteDown(post) {
        var postToBeVotedOn = post.postId;
        var idToVote

        if(post.userId)
        {

            idToVote = post.userId;

        }
        else{
            post.userId = "dabda155-3d89-4cf8-b705-3301fe361249"
            idToVote = post.userId;
        }

        if(post.negativeVoters)
        {

            
            post['negativeVoters'].push(idToVote);
        }
        else
            {
                post.negativeVoters = [];
                post['negativeVoters'].push(idToVote);
            }

            fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/posts/${postToBeVotedOn}`, {
                method: 'PUT',
                body: JSON.stringify(post)
            })
            .then(result => {
                return result.json()
            })
            .then(response => {
            });
    }

    generateFeed(posts){
        
        var feed = posts.map((post) => {
            
            
            // var pVoters = post.positiveVoters;
            // var nVoters = post.neutralVoters;
            // var negVoters = post.negativeVoters;

            // if(pVoters)
            // {
            //     var positiveCount = pVoters.length;
            // }
            // else
            // {
            //     positiveCount = 0;
            // }
            // if(nVoters)
            // {
            //     var neutralCount = nVoters.length;
            // }
            // else
            // {
            //      neutralCount = 0;
            // }
            // if(negVoters)
            // {
            //     var negCount = negVoters.length;
            // }
            // else
            // {
            //      negCount = 0;
            // }

            var neutralCount =0;
            var negCount=0;
            var positiveCount=0;


            // fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/comments?post=SXZ${post.postId}`, {
            //     headers: {
            //         'content-type': 'application/json'
            //          },
            //     method: 'GET',
            // })
            // .then(response => {
            //     return response.json();
            // })
            // .then(data =>{

            //     console.log(data)
            //     positiveCount = data.count;
        
             
            // })


            return(
                //individual feed item
                <div className="container">
                
                    <div className="row">
                        <span className="col-sm" >
                            <button class="btn btn-primary btn-sm" type="submit" onClick={this.voteUp.bind(this, post)}>
                                <ThumbsUp /> {positiveCount}
                            </button>
                            <br />
                            <button class="btn btn-default btn-sm" type="submit" onClick={this.neutralVote.bind(this, post)}>
                                <Neutral /> {neutralCount}
                            </button>
                            <br />
                            <button class="btn btn-danger btn-sm" type="submit" onClick={this.voteDown.bind(this, post)}>
                                <ThumbsDown /> {negCount}
                            </button>
                        </span>

                        <div className="col-sm-11">      
                    
                            <div className="card bg-light h-100">
                                <Link style={{margin: '10px'}} to={`/post/${post.postId}`}>
                                
                                    <div key={post.postId} >
                                        <div class="card-block">
                                            {post.title} 
                                            <br />                                         
                                        </div>
                                    </div>
                                </Link>                     
                                <br/>

                                <div className="row">

                                    <div className="col-sm-4">
                                        Posted: &nbsp;
                                        <TimeAgo date={post.timestamp}>
                                        </TimeAgo>
                                    </div>

                                    {/* <div className="col-sm-8">
                                    {post.visibilityLevel}
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
        return feed;
    }

    //This is for navbar's search
    handleSearch = (searchParams) => {
        var newQuery = this.generateSearchQuery(searchParams);
        this.searchQuery = newQuery;
        this.retrieveFeed();
    }

    generateSearchQuery(searchParams){
        var query = "&search=";
        if (searchParams.words === '')
            query = "";
        query += searchParams.words;
        return query;
    }

    render(){
        return(
            <div>
                <link href="https://fonts.googleapis.com/css?family=Bowlby+One+SC|Lato|Lobster" rel="stylesheet" />
                <Navbar searchMethod={this.handleSearch}/>
                <div className="container">
                
                    <div className=''>
                        <div className='card card-1  text-md-center'>
                            <div className='card-body text-center'>
                                <h2 style={{color: 'black'}} id="title">Your Feed</h2>
                                {this.state.feed}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FeedPage;