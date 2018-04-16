import React, {Component} from 'react';

class PostEditor extends Component{//Initial State
    constructor(){
        super();
        this.state = {postContent: ""};
    }
}

componentDidMount(){
    fetch('https://67kbssnx29.execute-api.us-west-2.amazonaws.com/dev/posts/{postId}')//NEED postId to be fetched
    .then(postInfo => {return postInfo.json();})//Grab the JSON given by the API
    .then(data => {
        let postBody = data.postInfo.map((body) => {//Map over data
            //WORK IN PROGRESS THIS WAS A GUESS
            return(
                <div key={body.postInfo}>
                    <p>{body.postInfo}</p>
                </div>
            )
        })
        this.setState({postContent: postContent});
        console.log("STATE:  ", this.state.postContent)
    })
}

    render(){
        return(
            <div>
                <div>
                    {this.state.postContent}
                </div>
            </div>
        )
    }