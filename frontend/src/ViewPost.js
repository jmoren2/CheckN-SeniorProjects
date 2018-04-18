import React, {Component} from 'react';

class ViewPost extends Component{//Initial State
    constructor(props){
        super(props);
        this.state = {
            postID: props.match.params.postID,
            postContent: ""
        };
    }

    componentDidMount(){
        fetch(`https://95sbuermt6.execute-api.us-west-2.amazonaws.com/dev/posts/${this.state.postID}` ,{
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
            mode: 'cors',
        })//Queries the API for a post with specified ID
        .then(results => {
            return results.json();})//Saves the response as JSON
        .then(data => {
            //console.log('d: ' + data);
            //console.log("STATE:  ", this.state.postContent);
            console.log('r: ' + JSON.stringify(data));
            return(//places the body of the post in an input field for editing
            <div key={data}>
                <h1>{data.post.title}</h1>
                <p>{data.post.content}</p>
            </div>
        )})
        .then(data => {this.setState({postContent: data})});//update the state with the above post title and comment(unsure of this spot)
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

export default ViewPost;
