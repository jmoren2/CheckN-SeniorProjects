import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import Navbar from './Navbar.js'
import 'bootstrap/dist/css/bootstrap.css';
import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';
import Neutral from 'react-icons/lib/fa/arrows-h';
import {TextArea} from 'semantic-ui-react';

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
        this.opacities = {POSITIVE: '0.6', NEUTRAL: '0.6', NEGATIVE: '0.6'};
        this.borders = {POSITIVE: '0px solid black' , NEUTRAL: '0px solid black', NEGATIVE: '0px solid black'};
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
            this.opacities = {POSITIVE: '0.4', NEUTRAL: '0.4', NEGATIVE: '0.4'};
            this.opacities[data.comment.vote.toUpperCase()] = '1';
            this.borders = {POSITIVE: '0px solid black' , NEUTRAL: '0px solid black', NEGATIVE: '0px solid black'};
            this.borders[data.comment.vote.toUpperCase()] = '4px solid black';
            this.setState({
                content: data.comment.content,
                vote: data.comment.vote.toUpperCase()
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
            setTimeout(function() { //Start the timer
                this.setState({handleSubmitDone: true}) //After 1 second, set render to true
            }.bind(this), 2000)//Give the new post ID to the app for redirection
        });
    }

    handleChangeContent(event) {
        this.setState({content: event.target.value});//Updates the content field as typing occurs
    }

    handleChangeVote(event) {
        this.setState({vote: event.target.value});//Updates the vote field as typing occurs
    }

    voteSelected = (e) => {
        e.preventDefault();
        //This basically resets the opacities and borders of all buttons, then sets up the selected one
        this.opacities = {POSITIVE: '0.4', NEUTRAL: '0.4', NEGATIVE: '0.4'};
        this.opacities[e.target.id] = '1';
        this.borders = {POSITIVE: '0px solid black' , NEUTRAL: '0px solid black', NEGATIVE: '0px solid black'};
        this.borders[e.target.id] = '4px solid black';
        this.setState({
            vote: e.target.id
        });
        //enable submitting now that there is a vote
        //document.getElementById("submitVoteButton").disabled = false;
    }

    render(){
        if (this.state.handleSubmitDone === true){
            return(<Redirect to={`/post/${this.postID}`}/>);//go back to the post's page after editing the comment
        }
        return(
            <div className='container'>
                <link href="https://fonts.googleapis.com/css?family=Bowlby+One+SC|Lato|Lobster" rel="stylesheet" />
                <div className='card card-1 text-md-center'>
                <h2 className='text-center' style={{color:'black'}}>Edit Your Comment</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                    <span>
                        <button type='button' id='POSITIVE' className="btn btn-primary votebtn" style={{opacity: this.opacities['POSITIVE'], border: this.borders['POSITIVE']}} onClick={this.voteSelected}>
                            <ThumbsUp size={30}/>
                        </button>
                        <button type='button' id='NEUTRAL' className="btn btn-default votebtn" style={{opacity: this.opacities['NEUTRAL'], border: this.borders['NEUTRAL']}} onClick={this.voteSelected}>
                            <Neutral size={30}/>
                        </button>
                        <button type='button' id='NEGATIVE' className="btn btn-danger votebtn" style={{opacity: this.opacities['NEGATIVE'], border: this.borders['NEGATIVE']}} onClick={this.voteSelected}>
                            <ThumbsDown size={30}/>
                        </button>
                    </span>
                    <TextArea autoHeight onChange={this.handleChangeContent} value={this.state.content} placeholder='Share your thoughts...' style={{width: '70%', margin: 'auto'}}/> <br />
                    <button id='submitVoteButton' className='btn btn-primary' type='submit'>Submit</button>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

export default EditComment;