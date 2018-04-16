import React, {Component} from 'react';

class PostEditor extends Component{//Initial State
    constructor(){
        super();
        this.state = {postContent: ""};
    }
}

componentDidMount(){
    fetch('https://67kbssnx29.execute-api.us-west-2.amazonaws.com/dev/posts/{postId}')//NEED TO ADD THE POSTID STUFF
    .then(postInfo => {return results.json();})//Mapping the post contents to the json given by the API
    .then(data => {

    })

    //WORK IN PROGRESS
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