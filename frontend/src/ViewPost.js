
import React, {Component} from 'react';

class PostEditor extends Component{//Initial State
    constructor(){
        super();
        this.state = {postContent: ""};
    }

    componentDidMount(){
        var results;
        var data;
        fetch('https://67kbssnx29.execute-api.us-west-2.amazonaws.com/dev/posts/dabda155-3d89-4cf8-b705-3301fe361249',{
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
            mode: 'cors',
        })//Queries the API for a post with specified ID
        .then(results => {
            console.log('r: ' + results);
            return results.json();})//Saves the response as JSON
        .then(data => {
            //console.log('d: ' + data);
            //console.log("STATE:  ", this.state.postContent);
            return(//places the body of the post in an input field for editing
            <div key={data}>
                <p>{results.post.title}</p>
                <p>{results.post.content}</p>
            </div>
        )})
        .then(this.setState({postContent: data}));//update the state with the above post title and comment(unsure of this spot)
    }

    render(){
        return(
            <div>
                {this.state.postContent}
            </div>
        );
    }
}
//ReactDOM.render(<PostEditor />, document.getElementById('root'));

export default PostEditor;