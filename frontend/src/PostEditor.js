import React, {Component} from 'react';

class PostEditor extends Component{//Initial State
    constructor(){
        super();
        this.state = {postContent: ""};
    }

    componentDidMount(){
        fetch('https://67kbssnx29.execute-api.us-west-2.amazonaws.com/dev/posts/{postId}')//Queries the API for a post weith  specified ID
        .then(results => {return results.json();});//Saves the response as JSON
        return(//places the body of the post in an input field for editing
            <div key={results.post}>
                <input type="text" value="{results.post}">
                </input>
            </div>
        )
        this.setState({postContent: postContent});//update the state (unsure of this spot)
        console.log("STATE:  ", this.state.postContent);
    }

    render(){
        return(
            <div>
                {this.state.postContent}
            </div>
        )
    }
}