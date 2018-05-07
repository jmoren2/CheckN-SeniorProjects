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
    }

    componentDidMount(){//Queries the API for a post and its comments with specified ID
        this.retrievePost();
        this.retrieveComments();
    }

    componentDidUpdate(){
        this.retrievePost();
        //this.retrieveComments();
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

        
       // console.log(post)
       
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
        var idToVote = null;

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
            //console.log('r: ' + JSON.stringify(data));


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
<button className="btn btn-primary btn-sm" type="submit" onClick={this.voteUp.bind(this, data.post)}>
      <ThumbsUp /> {positiveCount}
</button>
<br />
<button className="btn btn-default btn-sm" type="submit" onClick={this.neutralVote.bind(this, data.post)}>
      <Neutral /> {neutralCount}
</button>
<br />
<button className="btn btn-danger btn-sm" type="submit" onClick={this.voteDown.bind(this, data.post)}>
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

        )})
        .then(data => {
            this.setState({postContent: data});
        });//update the state with the above post title and content
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
            //console.log('comments: ' + JSON.stringify(commentData));
            return(this.generateCommentFeed(commentData.comments));
        })
        .then(commentFeed => {
            this.setState({postComments: commentFeed});
        })
    }

    handleSubmit(event){
        event.preventDefault();
        //console.log('state.newComment: ' + this.state.content);
        const data = {content: this.state.content, postId: this.state.postID};//attaches the comment to the post being commented on
        //console.log('data: ' + JSON.stringify(data));//content and postID are sent along to the API

        fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/posts/${this.state.postID}/comments`, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(result => {
            //console.log('result: ' + JSON.stringify(result));
            return result.json()
        })
        .then(response => {
            //console.log('response: ' + JSON.stringify(response));``
            this.setState({returnedId: response.comment.Item.commentId, newComment: this.addNewCommentToTop(this.state.content) });
            //console.log(response.comment.Item);
            //console.log(response.comment.Item.commentId);
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
