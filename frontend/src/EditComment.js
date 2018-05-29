import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import Navbar from './Navbar.js'
import 'bootstrap/dist/css/bootstrap.css';

class EditComment extends Component{
    constructor(props){
        super(props);
        this.state = {
            commentID: props.match.params.commentID,//Line In Progress
            content: '',
            vote: '',
            handleSubmitDone: false
        };
        this.postID='';
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeVote = this.handleChangeVote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.retrieveComment = this.retrieveComment.bind(this);
    }

    componentDidMount() {//Queries the API for the post being edited
        this.retrieveComment();
    }

    retrieveComment(){
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/comments/${this.state.commentID}` ,{
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
        })
        .then(results => {
            return results.json();
        })//Saves the response as JSON
        .then(data => {
            this.postID=data.comment.postId;
            this.setState({
                content: data.comment.content,
                vote: data.comment.vote
            })
        });
    }

    handleSubmit(event){
        event.preventDefault();
        //What is being sent to the API
        const data = {
            content: this.state.content,
            vote: this.state.vote
        };

        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/posts/${this.postID}/comments/${this.state.commentID}`, {
            method: 'PUT',
            body: JSON.stringify(data)//Stringify the data being sent
        })
        .then(response => {
            return response.json()//Turn the response into a JSON object
        })
        .then(result => {
            this.setState({handleSubmitDone: true});//Give the new post ID to the app for redirection
        });
    }

    handleChangeContent(event) {
        this.setState({content: event.target.value});//Updates the content field as typing occurs
    }

    handleChangeVote(event) {
        this.setState({vote: event.target.value});//Updates the vote field as typing occurs
    }

    render(){
        if (this.state.handleSubmitDone === true){
            return(<Redirect to={`/post/${this.postID}`}/>);//go back to the post's page after editing the comment
        }
        return(
            <div>
            <link href="https://fonts.googleapis.com/css?family=Bowlby+One+SC|Lato|Lobster" rel="stylesheet" />
            <Navbar />
                <div className="container">
                    <div className=''>
                        <div className='card card-1  text-md-center'>
                            <div className='card-body text-center'>
                                <h2 className='text-center' style={{color:'black'}}>Edit Your Comment</h2>
                                <form onSubmit={this.handleSubmit}>

                                    <div className='form-group'>
                                        <label>Content: </label>
                                        <input value={this.state.content} onChange={this.handleChangeContent} placeholder='Enter the content' className='form-control' /> <br />
                                        <label>Vote: </label>
                                        <input value={this.state.vote} onChange={this.handleChangeVote} placeholder='Enter the vote' className='form-control' /> <br />
                                    </div>

                                    <button className='btn btn-info' type='submit'>Submit</button>

                                    <Link to={`/post/${this.postID}`}>
                                    <button className='btn btn-info'>Cancel Edit</button>
                                    </Link>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditComment;