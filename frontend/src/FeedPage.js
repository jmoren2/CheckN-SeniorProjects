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
            feed: <div>Loading...</div>
        }
        this.searchQuery = "search=a";
        console.log("The user object passed in is: " + props.userObj);
    }

    componentDidMount(){//Queries the API for a post with specified ID
       this.retrieveFeed();
    }
    componentDidUpdate()
    {
        this.retrieveFeed();
    }

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
            return(this.generateFeed(feedData.posts));
        })
        .then(Feed => {
            this.setState({feed: Feed});
        })
    }

     voteUp(post) {
        console.log("voted up!")
        console.log(JSON.parse(JSON.stringify(post)));

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
            console.log('added voter')
            console.log(post)
            
        }
        else
            {
                post.positiveVoters = [];
                post['positiveVoters'].push(idToVote);
                console.log('array created');
                console.log('added voter');
                console.log(post);
            }


        // TODO
        //grab actual user id

       
       fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/posts/${postToBeVotedOn}`, {
        method: 'PUT',
        body: JSON.stringify(post)
    })
    .then(result => {
        console.log('result: ' + JSON.stringify(result));
        return result.json()
    })
    .then(response => {
        console.log('response: ' + JSON.stringify(response));``

    });

    }


    neutralVote(post) {
        console.log("voted neutral!")
        console.log(JSON.parse(JSON.stringify(post)));
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
            console.log('added voter')
            console.log(post)
            
        }
        else
            {
                post.neutralVoters = [];
                post['neutralVoters'].push(idToVote);
                console.log('array created');
                console.log('added voter');
                console.log(post);
            }


            fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/posts/${postToBeVotedOn}`, {
                method: 'PUT',
                body: JSON.stringify(post)
            })
            .then(result => {
                console.log('result: ' + JSON.stringify(result));
                return result.json()
            })
            .then(response => {
                console.log('response: ' + JSON.stringify(response));``
        
            });
    }

    voteDown(post) {
        console.log("voted down!")


        console.log(JSON.parse(JSON.stringify(post)));
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
            console.log('added voter')
            console.log(post)
            
        }
        else
            {
                post.negativeVoters = [];
                post['negativeVoters'].push(idToVote);
                console.log('array created');
                console.log('added voter');
                console.log(post);
            }


            fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/posts/${postToBeVotedOn}`, {
                method: 'PUT',
                body: JSON.stringify(post)
            })
            .then(result => {
                console.log('result: ' + JSON.stringify(result));
                return result.json()
            })
            .then(response => {
                console.log('response: ' + JSON.stringify(response));``
        
            });
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
                </div>

            );
  

        })
        return feed;
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