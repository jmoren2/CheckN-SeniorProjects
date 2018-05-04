import React, {Component} from 'react';
import Navbar from './Navbar.js'
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect} from 'react-router-dom';

import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';
import Neutral from 'react-icons/lib/fa/arrows-h';
import Moment from 'react-moment';
import Check from 'react-icons/lib/fa/check-circle-o';


class ViewPost extends Component{//Initial State
    constructor(props){
        super(props);
        this.state = {
            postID: props.match.params.postID,
            postContent: "",
            postComments: "",
            newComment: "",
            content: "",
            returnedId: null,
        };
        this.returnedID = null;
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addComment = this.addComment.bind(this);
        console.log("The user object passed in is: " + props.userObj);
    }

    componentDidMount(){//Queries the API for a post and its comments with specified ID
        this.retrievePost();
        this.retrieveComments();
    }

    retrievePost(){
        fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/posts/${this.state.postID}` ,{
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
        })
        .then(results => {
            return results.json();
        })//Saves the response as JSON
        .then(data => {
            console.log('r: ' + JSON.stringify(data));


            var pVoters = data.post.positiveVoters;
            var nVoters = data.post.neutralVoters;
            var negVoters = data.post.negativeVoters;

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
            return(//displays the post title and contents
            <div className="container">

                <div className="row">
                    <span className="col-sm">
                        <button className="btn btn-primary btn-sm" type="submit">
                            <ThumbsUp /> {positiveCount}
                        </button>
                        <br />
                        <button className="btn btn-default btn-sm" type="submit">
                        <   Neutral /> {neutralCount}
                        </button>
                        <br />
                        <button className="btn btn-danger btn-sm" type="submit">
                            <ThumbsDown /> {negCount}
                        </button>
                    </span>

                    <div className="col-sm-11">
                        <div className="card bg-light h-100">

                            <div key={data} className="">
                                <div className="card-block">
                                    <h3>{data.post.title}</h3>
                                    <p>{data.post.content}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-4">
                                    <Moment format="YYYY/MM/DD HH:mm">
                                        {data.post.timestamp}
                                    </Moment>
                                </div>
                                <div className="col-sm-8">
                                    {data.post.visibilityLevel}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <br/>
            </div>
            );
        })
        .then(data => {
            this.setState({postContent: data});//update the state with the above post title and content
        });
    }

    generateCommentFeed(comments){ //comments are edited here
        var commentFeed = comments.map((comment) => {
            return(
                <div key={comment.commentId} className="card bg-light">
                
                <div className="card-block"></div>
                <p>{comment.content}</p>
                    
                </div>
            )
        })
        return commentFeed;
    }

    retrieveComments(){
        fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/posts/${this.state.postID}/comments`, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET',
        })
        .then(commentResults => {
            return commentResults.json();
        })
        .then(commentData => {
            return(this.generateCommentFeed(commentData.comments));
        })
        .then(commentFeed => {
            this.setState({postComments: commentFeed});
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const data = {content: this.state.content, postId: this.state.postID, userId: this.props.userObj.userId};//attaches the comment to the post being commented on

        fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/posts/${this.state.postID}/comments`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(result => {
            return result.json()
        })
        .then(response => {
            this.setState({returnedId: response.comment.Item.commentId, newComment: this.addNewCommentToTop(this.state.content) });
        });
    }

    addNewCommentToTop(content)
    {
        var newComment = 
        <div className="card bg-light" style={{objectFit:'contain'}}>
                
            <div className="card-block"></div>
            <div className="row">
                <div className="col-sm-10">
                    <p>{this.state.content}</p>
                </div>
                <div style={{fontSize: '12px', paddingTop:'8px'}}  className="text-success col-sm-2">
                    Commented&nbsp;<Check />
                </div>
            </div>
                    
        </div>
        return newComment;
    }

    handleChangeComment(event) {
        this.setState({content: event.target.value});//Updates the comment input field as typing occurs
    }

    addComment(){
        this.setState(//Replaces the empty "newComment" state with the form for a new comment
            {newComment:
                
            <form onSubmit={this.handleSubmit}>
            
                <div className='form-group'>
                    <input onChange={this.handleChangeComment}  placeholder='Share your thoughts...' className='form-control' /> <br />
                </div>
                <button className='btn btn-info' type='submit'>Submit</button>
            </form>}
        );
    }


    render(){
        return(
            <div>
            <Navbar />
                <div className="container">

                    <div className=''>
                        <div className='card card-1  text-md-center'>
                            <div className='card-body text-center'>

                                <h1 style={{color: 'black'}}>Post</h1>
                                    <div>
                                        {this.state.postContent}
                                    </div>

                                   <h3 style={{color: 'black'}}>Comments</h3>


                                         <div>
                                             {this.state.newComment}
                                         </div>
                                        
                                    <div>
                                        {this.state.postComments}
                                    </div>
                                    <a href="#">
                                    <button className='btn btn-info' type='submit' style={{href:'#'}} onClick={this.addComment}>Reply</button>
                                    </a>
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewPost;
