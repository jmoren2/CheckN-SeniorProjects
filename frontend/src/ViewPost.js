import React, {Component} from 'react';
import Navbar from './Navbar.js'
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect} from 'react-router-dom';


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
    }

    componentDidMount(){//Queries the API for a post and its comments with specified ID
        this.retrievePost();
        this.retrieveComments();
    }

    retrievePost(){
        fetch(`https://95sbuermt6.execute-api.us-west-2.amazonaws.com/dev/posts/${this.state.postID}` ,{
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
            return(//displays the post title and contents
            <div key={data} className="card bg-light">
            <div className="card-block">

                <h3>{data.post.title}</h3>
                <p>{data.post.content}</p>

            </div>
                
            </div>
        )})
        .then(data => {
            this.setState({postContent: data});
        });//update the state with the above post title and content
    }

    generateCommentFeed(comments){
        var commentFeed = comments.map((comment) => {
            return(
                <div key={comment.commentId}>
                    {comment.content}
                </div>
            )
        })
        return commentFeed;
    }

    retrieveComments(){
        fetch(`https://95sbuermt6.execute-api.us-west-2.amazonaws.com/dev/posts/${this.state.postID}/comments`, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET',
        })
        .then(commentResults => {
            return commentResults.json();
        })
        .then(commentData => {
            console.log('comments: ' + JSON.stringify(commentData));
            return(this.generateCommentFeed(commentData.comments));
        })
        .then(commentFeed => {
            this.setState({postComments: commentFeed});
        })
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('state.newComment: ' + this.state.content);
        const data = {content: this.state.content, postId: this.state.postID};//(attaches the comment to the post being commented on)
        console.log('data: ' + JSON.stringify(data));//content and postID are sent along to the API

        fetch(`https://95sbuermt6.execute-api.us-west-2.amazonaws.com/dev/posts/${this.state.postID}/comments`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(result => {
            console.log('result: ' + JSON.stringify(result));
            return result.json()
        })
        .then(response => {
            console.log('response: ' + JSON.stringify(response));
            this.setState({returnedId: response.comment.Item.commentId, newComment: this.state.content});
            console.log(response.comment.Item);
            console.log(response.comment.Item.commentId);
        });
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
                                    <div>
                                        {this.state.newComment/*Begins empty until a user presses the "reply" button*/}
                                    </div>
                                    <div>
                                        {this.state.postComments}
                                    </div>

                                    <button className='btn btn-info' type='submit' onClick={this.addComment}>Reply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewPost;
