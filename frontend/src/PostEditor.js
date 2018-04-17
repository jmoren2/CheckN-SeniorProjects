import React, {Component} from 'react';

class PostEditor extends Component{//Initial State
    constructor(){
        super();
        this.state = {postContent: ""};
    }

    componentDidMount(){
        var results;
        fetch('https://67kbssnx29.execute-api.us-west-2.amazonaws.com/dev/posts/dabda155-3d89-4cf8-b705-3301fe361249',{
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
            mode: 'cors',
        })//Queries the API for a post weith  specified ID
        .then(results => {
            console.log('r: ' + results);
            return results.json();})//Saves the response as JSON
        .then(data => {
            console.log('d: ' + data);
            this.setState({postContent: '1'});//update the state (unsure of this spot)
            console.log("STATE:  ", this.state.postContent);
            return(//places the body of the post in an input field for editing
            <div key={data}>
                <input type="text" value="{results.post}">
                </input>
            </div>
        )})

    }

    render(){
        return(
            <div>
                {this.state.postContent}
            </div>
        );
    }
}
ReactDOM.render(<PostEditor />, document.getElementById('root'));