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
import {Button, Comment, Divider} from 'semantic-ui-react';

import TimeAgo from 'react-timeago'

class ViewPost extends Component{//Initial State
    constructor(props) {
        super(props);

        if(this.props.userObj === null)
        {
            window.location.href = '/login';
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
            showHistory: false,
            history:"Please hold....",
            postState: "OPEN",
            surveyId: ''
        };
        this.posterID=null;
        this.posterName=null;
        this.returnedID = null;
        this.postInfo = {};
        this.opacities = {POSITIVE: '0.6', NEUTRAL: '0.6', NEGATIVE: '0.6'};
        this.borders = {POSITIVE: '0px solid black' , NEUTRAL: '0px solid black', NEGATIVE: '0px solid black'};

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenHistory = this.handleOpenHistory.bind(this);
        this.handleCloseHistory = this.handleCloseHistory.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.storeUser = this.storeUser.bind(this);
        this.editPost = this.editPost.bind(this);
        this.editComment = this.editComment.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.storeUser = this.storeUser.bind(this);
        this.changePostState = this.changePostState.bind(this);
        this.closePost = this.closePost.bind(this);
        this.openPost = this.openPost.bind(this);
    }

    componentDidMount() {//Queries the API for a post and its comments with specified ID
        this.retrievePost();
        this.retrieveComments();
    }

    componentDidUpdate() {
        //this.retrievePost();
        //this.retrieveComments();
    }

    storeUser(data) {//A function for fetching the user object associated with the post
        this.setState({surveyId: data.post.surveyId});
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/users/${data.post.userId}`, {
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

            this.setState({postState: data.post.state});

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
            return(//displays the post contents
            <div className="container">

                <div className="row">
                    <span className="col-sm">
                        <button id="upVotes" className="btn btn-primary btn-sm" type="submit">
                            <ThumbsUp /> {data.post.voteCounts.positive}
                        </button>
                        <br />
                        <button id="netVotes" className="btn btn-default btn-sm" type="submit">
                        <   Neutral /> {data.post.voteCounts.neutral}
                        </button>
                        <br />
                        <button id="downVotes" className="btn btn-danger btn-sm" type="submit">
                            <ThumbsDown /> {data.post.voteCounts.negative}
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
                                    Viewable by {data.post.visibilityLevel[0].role} users.
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
        //fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/posts/${this.state.postID}`, {
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/posts/${this.state.postID}` ,{
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
            this.postInfo = {
                title: data.post.title,
                content: data.post.content,
                positiveVoters: data.post.positiveVoters,
                neutralVoters: data.post.neutralVoters,
                negativeVoters: data.post.negativeVoters,
                pinnedId: data.post.pinnedId,
                state: data.post.state,
                tagArray: data.post.tags,
                visibilityLevel: data.post.visibilityLevel
            };
            this.storeUser(data);//Continues the work in the function above
        });
    }

    retreiveUser(userId)
    {
        return fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/users/${userId}`, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET',
        })
        .then(result => {
            return result.json()
        })
        .then(response => {
            
             if(response.statusCode !== 500)
             {
                if(document.getElementById(response.user.userId))
                {
                   var x = document.getElementById(response.user.userId);
   
                   x.innerHTML = response.user.firstName + " " + response.user.lastName + " commented: ";
                   x.title = response.user.email;
               }
               else
               {var y = document.getElementById("unknown user");
   
                   x.innerHTML = "unknown user" + " commented: ";
                  
                   
               }
             }
        })
    }

    generateCommentFeed(comments){ //comments are edited here  

        if(comments)
        {

        
        var commentFeed = comments.map((comment) => {

                var content = null;

                if(comment.content === '')
                {
                    content = "noContent"
                }
                else
                {
                    content = "hasContent"
                }

                var vote = null;

                if(comment.vote === "positive")
                {
                    vote = <ThumbsUp  size={30} style={{color: "blue"}} />
                }
                else if(comment.vote === "negative")
                {
                    vote = <ThumbsDown  size={30} style={{color: "red"}} />
                }
                else
                {
                    vote = <Neutral size={30}/>
                }

                var test = null;

                if(comment.userId)
                {
                test = comment.userId;
                }
                else
                {
                    test = "unknown user"
                }

                this.retreiveUser(comment.userId);
                return(
                    <div name={content} key={comment.commentId} className="card bg-light">
                        <Comment.Group className='comment'>
                        <Comment>
                            <Comment.Avatar src={vote}></Comment.Avatar>
                            <Comment.Content>
                                <Comment.Author>{comment.userName}</Comment.Author>
                                <Comment.Text>
                                    {comment.content}
                                </Comment.Text>
                                <Comment.Actions>
                                    {this.editComment(comment.userId, comment.commentId)}
                                    <Comment.Action commentid={comment.commentId} type='comment' onClick={this.handleOpenHistory}>History</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                        </Comment.Group>
                    </div>
                );
                /*
                return(
                        <div name={content} key={comment.commentId} className="card bg-light">
                        
                        <div className="card-block">
                        <p id={test}>
                            {test} commented: 
                        </p>
                        
                        {this.editComment(comment.userId, comment.commentId)}
                        <Button class="btn btn-info" commentid={comment.commentId} type="comment" onClick={this.handleOpenHistory}>Edit History</Button>
                        <div>
                            {vote}
                        </div>
                        
                        <p>{comment.content}</p>
                        </div>
                            
                        </div>
                );*/
        })
        return commentFeed;

    }
    }


    retrieveComments(){
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/comments?postId=${this.state.postID}`, {
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

        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/posts/${this.state.postID}/comments`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(result => {
            return result.json()
        })
        .then(response => {
            this.setState({returnedId: response.comment.commentId, newComment: this.addNewCommentToTop(this.state.content) });
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
        if(this.state.postState === "OPEN"){
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
        //this.retrieveComments();
        this.setState({ showModal: true });
      }
      
      handleCloseModal () {
        this.setState({ showModal: false });
      }

    handleOpenHistory = (event) => {//TODO: Fetch histories and set to this.state.history
        var data = event.target;
        data.commentid = data.attributes.commentid.nodeValue;
        //console.log(data);
        if(data.type === "comment"){
            fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/comments/${data.commentid}`, {
                method: 'GET'
            })
            .then(result => {
                return result.json()
            })
            .then(response => {
                var commentHistory;
                var counter = response.comment.history.length;
                var editText = "";

                if(response.comment.history.length > 1){
                    commentHistory = response.comment.history.map((iteration) => {
                        --counter;

                        if(counter === 0){
                            editText = "Original Comment:";
                        }
                        else{
                            editText = "Edit #" + counter;
                        }

                        return(
                            <p>
                                <div className="card-block">
                                    {/*TODO: make history only viewable if admin or manager*/}
                                    <div>{editText}</div>
                                    <div>{iteration.vote}</div>
                                    <div>{iteration.content}</div>
                                </div><br></br>
                            </p>
                        );
                    })
                }
                else{
                    commentHistory = "No edits have been made yet to this comment";
                }

                return commentHistory;
            })
            .then(timeline => {
                this.setState({history: timeline});
                this.setState({ showHistory: true });
            });
        }
        else{
            fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/posts/${data.postid}`, {
                method: 'GET'
            })
            .then(result => {
                return result.json()
            })
            .then(response => {
                var postHistory;
                var counter = response.post.history.length;
                var editText = "";

                if(response.post.history.length > 1){
                    postHistory = response.post.history.map((iteration) => {
                        --counter;

                        if(counter === 0){
                            editText = "Original Post:";
                        }
                        else{
                            editText = "Edit #" + counter;
                        }

                        return(
                            <p>
                                <div className="card-block">
                                    {/*TODO: make history only viewable if admin or manager*/}
                                    <div>{editText}</div>
                                    <div>Title: {iteration.title}</div>
                                    <div>Content: {iteration.content}</div>

                                    <div>Tags:
                                        {iteration.tags.map((eachTag) => {
                                            return(<div>{eachTag} </div>);
                                        })}
                                    </div><br></br>
                                </div>
                            </p>
                        );
                    })
                }
                else{
                    postHistory = "No edits have been made yet to this post";
                }

                return postHistory;
            })
            .then(timeline => {
                this.setState({history: timeline});
                this.setState({ showHistory: true });
            });
        }
    }

    handleCloseHistory () {
        this.setState({history : "Please hold...."});
        this.setState({ showHistory: false });
    }

      getVoters(){
        return (
            <div>
                
            </div>
        )
      }
     

    editPost() {
        if(this.props.userObj.userId === this.posterID && this.state.postState === "OPEN") {
            return(
            <Link to={`/edit/${this.state.postID}`}>
            <button className='btn btn-info'>Edit Post</button>
            </Link>);
        }
        else {
            return
        }
    }

    editComment(userID, commentID) {//TODO: Add back in the ability to only edit a user's own comment
        if(this.props.userObj.userId === userID && this.state.postState === "OPEN") {
        return(
            <Link to={`/editComment/${commentID}`}>
                <Comment.Action>Edit</Comment.Action>
            </Link>);
        }
        else {
            return
        }
    }

    changePostState() {
        if(this.state.postState === "OPEN" && (this.props.userObj.userId === this.posterID || this.props.userObj.userPermissions[0].role === "admin")) {
            return(
                <button className='btn btn-info' onClick = {this.closePost}>Close Post</button>//Button to close the post
            );
        }
        if(this.state.postState === "CLOSED" && (this.props.userObj.userId === this.posterID || this.props.userObj.userPermissions[0].role === "admin")) {
            return(
                <button className='btn btn-info' onClick = {this.openPost}>Reopen Post</button>//Button to reopen the post
            );
        }
    }

    closePost = () => {
        this.postInfo.state = "CLOSED";
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/posts/${this.state.postID}`, {
            method: 'PUT',
            body: JSON.stringify(this.postInfo.state)//Stringify the data being sent
        })
        .then(response => {
            return response.json()//Turn the response into a JSON object
        });
        //API call to close the post
    }

    openPost = () => {
        this.postInfo.state = "OPEN";
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/posts/${this.state.postID}`, {
            method: 'PUT',
            body: JSON.stringify(this.postInfo.state)//Stringify the data being sent
        })
        .then(response => {
            return response.json()//Turn the response into a JSON object
        });
        //API call to open the post
    }
    
    surveyButton() {
        if (typeof this.state.surveyId === "undefined")
            return null;
        return(
            <div>
                <Link to={`/survey/${this.state.surveyId}/${this.state.postID}`}>
                    <Button positive>Take Survey</Button>
                </Link>
                <Link to={`/surveyResponses/${this.state.surveyId}/${this.state.postID}`}>
                    <Button positive>View Responses</Button>
                </Link>
            </div>
        );
    }

    changePost()
    {
        if(document.getElementById("upVotes"))
        {
        var up = document.getElementById("upVotes");
        }
    }

    filterCommentsWithoutContent(comments)
    {
        if(document.getElementsByName("noContent"))
        {
            
            var noc = document.getElementsByName("noContent");
            

            for (let i = 0; i < noc.length; i++) {
                noc[i].hidden = true;
              }
            
        }
        return (
            comments
        )
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
                                        {this.editPost()}
                                        {this.changePostState()}
                                        {this.surveyButton()}
                                    </div>
                                    <Button class="btn btn-info" postid={this.state.postID} type="post" onClick={this.handleOpenHistory}>Edit History</Button>

                                    <div>
                                        {this.responseBox()}
                                    </div>

                                   <h3 style={{color: 'black'}}>Comments</h3>
                                   
                                    <div>
                                   <button class="btn btn-info" onClick={this.handleOpenModal}>Show All</button>
                                        <ReactModal class="modal fade" isOpen={this.state.showModal}>
                                        {
                                            this.state.postComments
                                        }
                                        <button class="btn btn-info" onClick={this.handleCloseModal}>Close Modal</button>
                                        </ReactModal>
                                    </div>

                                    <div>
                                        {this.state.newComment}
                                    </div>
       
                                    <div>
                                        <ReactModal class="modal fade" isOpen={this.state.showHistory}>
                                            {this.state.history}
                                            <button class="btn btn-info" onClick={this.handleCloseHistory}>Close History</button>
                                        </ReactModal>
                                        {this.filterCommentsWithoutContent(this.state.postComments)}
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
