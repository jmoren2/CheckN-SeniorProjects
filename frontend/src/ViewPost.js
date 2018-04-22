import React, {Component} from 'react';


class ViewPost extends Component{//Initial State
    constructor(props){
        super(props);
        this.state = {
            postID: props.match.params.postID,
            postContent: "",
            postComments: ""
        };
    }

    componentDidMount(){//Queries the API for a post with specified ID
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
            return(//places the body of the post in an input field for editing
            <div key={data}>
                <h1>{data.post.title}</h1>
                <p>{data.post.content}</p>
            </div>
        )})
        .then(data => {
            this.setState({postContent: data});
        });//update the state with the above post title and comment
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


    render(){
        return(
            <div>
                <div>
                    {this.state.postContent}
                </div>
                <div>
                    {this.state.postComments}
                </div>
            </div>
        );
    }
}

export default ViewPost;
