import React, {Component} from 'react';
import Navbar from './Navbar.js'
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect, Link} from 'react-router-dom';

import ThumbsUp from 'react-icons/lib/fa/thumbs-up';
import ThumbsDown from 'react-icons/lib/fa/thumbs-down';
import Neutral from 'react-icons/lib/fa/arrows-h';
import Moment from 'react-moment';
import Check from 'react-icons/lib/fa/check-circle-o';
import './index.css'
import ReactModal from 'react-modal'

import TimeAgo from 'react-timeago'


class ViewPost extends Component{//Initial State
    constructor(props) {
        super(props);

        if(this.props.userObj === null)
        {
            window.location.href = '/login';
            console.log('hello')
        }
        this.state = {
            postID: props.match.params.postID,
            postContent: "",
            postComments: "",
            newComment: "",
            content: "",
            returnedId: null,
            votePhrase: "Please vote and add a comment if you'd like.",
            voteChoice: 'none',
            showModal: false,
            userThatCommented: "",
            showHistory: false
        };
        this.posterID=null;
        this.posterName=null;
        this.history="Please hold....";
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenHistory = this.handleOpenHistory.bind(this);
        this.handleCloseHistory = this.handleCloseHistory.bind(this);
        this.returnedID = null;
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.storeUser = this.storeUser.bind(this);
        this.editButton = this.editButton.bind(this);
        this.opacities = {POSITIVE: '0.6', NEUTRAL: '0.6', NEGATIVE: '0.6'};
        this.borders = {POSITIVE: '0px solid black' , NEUTRAL: '0px solid black', NEGATIVE: '0px solid black'};
        console.log("The user object passed in is: " + props.userObj);
    }

    componentDidMount() {//Queries the API for a post and its comments with specified ID
        this.retrievePost();
        this.retrieveComments();
    }

    /*componentDidUpdate() {
        this.retrievePost();
        //this.retrieveComments();
    }*/

    storeUser(data) {//A function for fetching the user object associated with the post
        fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/users/${data.post.userId}`, {
            headers: {
                'content-type' : 'application/json'
            },
            method: 'GET',
        })
        .then(response => {
            return response.json();
        })
        .then(userObject => {
            this.posterID = userObject.user.userId;//Saved for checking to edit the post
            this.posterName = userObject.user.firstName + " " + userObject.user.lastName;//Saves the full name for displaying

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
            return(//displays the post contents
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
                                    <p>{this.posterName}</p>
                                    <p id="postEdit">{data.post.content}</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-4">
                                Posted: &nbsp;
                                <TimeAgo date={data.post.timestamp}>
                                 
                                </TimeAgo>
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
        .then(posting => {
            this.setState({postContent: posting});//update the state with the above post title, poster, and content
        });
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
            //Getting the user name to add to the post
            console.log("IN RETRIEVE POST");
            console.log(data);
            console.log(data.post);
            this.storeUser(data);//Continues the work in the function above
        });
    }

    retreiveUser(userId)
    {
       // console.log('userId: ' + userId)
        return fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/users/${userId}`, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET',
        })
        .then(result => {
        //    console.log('result: ' + JSON.stringify(result));
        //    console.log('result type: ' + typeof response);
            return result.json()
        })
        .then(response => {
            
             console.log('response: ' + JSON.stringify(response.user));
             console.log('response type: ' + typeof response.user);
             console.log('response obj val: ' + Object.values(response.user));
             if(document.getElementById(response.user.userId))
             {
                var x = document.getElementById(response.user.userId);

                x.innerHTML = response.user.email + " commented: ";
            }
        })
    }

    generateCommentFeed(comments){ //comments are edited here  
        var commentFeed = comments.map((comment) => {
            console.log(comment)

            var vote = null;

            if(comment.vote === "POSITIVE")
            {
                vote = <ThumbsUp />
            }
            else if(comment.vote === "NEGATIVE")
            {
                vote = <ThumbsDown />
            }
            else
            {
                vote = <Neutral />
            }
            
            var test = this.retreiveUser(comment.userId);

            //console.log('test: ' + test)
            return(
                    <div key={comment.commentId} className="card bg-light">
                    
                    <div className="card-block">
                    <p id={comment.userId}>
                        {comment.userId} commented: 
                    </p>

                    <div>
                        {vote}
                    </div>
                    
                    <p>{comment.content}</p>{/*TODO: make history only viewable if admin or manager*/}
                    <button class="btn btn-info" onClick={this.handleOpenHistory}>Edit History</button>
                    </div>
                        
                    </div>
                );
        })

        //console.log('cmnt feed: ' +JSON.stringify(commentFeed))
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
        const data = {content: this.state.content, postId: this.state.postID, userId: this.props.userObj.userId, vote: this.state.voteChoice};//attaches the comment to the post being commented on

        fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/posts/${this.state.postID}/comments`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(result => {
            return result.json()
        })
        .then(response => {
            console.log('new Comment' + JSON.stringify(response))
            this.setState({returnedId: response.comment.Item.commentId, newComment: this.addNewCommentToTop(this.state.content) });
        });
    }

    addNewCommentToTop(content)
    {
        var newComment = 
        <div>
            <div className="card bg-light" style={{objectFit:'contain'}}>
                <div className="card-block">
                    <p style={{paddingTop:'8px'}}> {this.state.content} </p>
                </div>
            </div>
    
            <div style={{fontSize: '12px', paddingTop:'8px', paddingBottom:'8px'}}  className="text-success col-sm-2 justify-content-center mx-auto">
            Commented&nbsp;<Check />
            </div>
        </div>
        
        return newComment
    }

    handleChangeComment(event) {
        this.setState({content: event.target.value});//Updates the comment input field as typing occurs
    }

    //Returns the response box
    //put inside of a method to later have this return nothing if the user already voted
    responseBox(){
        return(
                <div>
                <label>{this.state.votePhrase}</label>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                    <span>
                        <button id='POSITIVE' className="btn btn-primary votebtn" style={{opacity: this.opacities['POSITIVE'], border: this.borders['POSITIVE']}} onClick={this.voteSelected}>
                            <ThumbsUp size={30}/>
                        </button>
                        <button id='NEUTRAL' className="btn btn-default votebtn" style={{opacity: this.opacities['NEUTRAL'], border: this.borders['NEUTRAL']}} onClick={this.voteSelected}>
                            <Neutral size={30}/>
                        </button>
                        <button id='NEGATIVE' className="btn btn-danger votebtn" style={{opacity: this.opacities['NEGATIVE'], border: this.borders['NEGATIVE']}} onClick={this.voteSelected}>
                            <ThumbsDown size={30}/>
                        </button>
                    </span>
                        <input onChange={this.handleChangeComment}  placeholder='Share your thoughts...' className='form-control' style={{width: '70%', margin: 'auto'}}/> <br />
                    <button id='submitVoteButton' className='btn btn-primary' type='submit' disabled>Submit</button>
                    </div>
                </form>
                </div>
        );
    }

    //Handles a click on post vote event
    voteSelected = (e) => {
        e.preventDefault();
        //This basically resets the opacities and borders of all buttons, then sets up the selected one
        this.opacities = {POSITIVE: '0.4', NEUTRAL: '0.4', NEGATIVE: '0.4'};
        this.opacities[e.target.id] = '1';
        this.borders = {POSITIVE: '0px solid black' , NEUTRAL: '0px solid black', NEGATIVE: '0px solid black'};
        this.borders[e.target.id] = '4px solid black';
        this.setState({
            voteChoice: e.target.id
        });
        //enable submitting now that there is a vote
        document.getElementById("submitVoteButton").disabled = false;
    }



    handleOpenModal () {
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
      }

    handleOpenHistory () {
        this.setState({ showHistory: true });
    }

    handleCloseHistory () {
        this.setState({ showHistory: false });
    }

      getVoters(){
        return (
            <div>
                
            </div>
        )
      }

    editButton() {
        if(this.props.userObj.userId === this.posterID) {
            return(
            <Link to={`/edit/${this.state.postID}`}>
            <button className='btn btn-info'>Edit Post</button>
            </Link>);
        }
        else {
            return
        }
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
                                        {this.editButton()}
                                    </div>

                                    <div>
                                        {this.responseBox()}
                                    </div>

                                   <h3 style={{color: 'black'}}>Comments</h3>
                                   
                                    <div>
                                   <button class="btn btn-info" onClick={this.handleOpenModal}>Show All</button>
                                        <ReactModal class="modal fade" isOpen={this.state.showModal}>
                                        {this.state.postComments}
                                        <button class="btn btn-info" onClick={this.handleCloseModal}>Close Modal</button>
                                        </ReactModal>
                                    </div>

                                    <div>
                                        {this.state.newComment}
                                    </div>
       
                                    <div>
                                        <ReactModal class="modal fade" isOpen={this.state.showHistory}>
                                            {this.history}
                                            <button class="btn btn-info" onClick={this.handleCloseHistory}>Close History</button>
                                        </ReactModal>
                                        {this.state.postComments}
                                    </div>
                                        
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default ViewPost;
