import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class CreatePost extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.returnedID = null;
        this.state = {title: '', content: '', returnedId: ''};
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('state.title: ' + this.state.title);
        console.log('state.content: ' + this.state.content);
        const data = {title: this.state.title, content: this.state.content};
        console.log('data: ' + JSON.stringify(data));

        fetch('https://95sbuermt6.execute-api.us-west-2.amazonaws.com/dev/posts', {
            method: 'POST',
            body: JSON.stringify(data),
        })
        .then(result => {
            console.log('result: ' + JSON.stringify(result));
            return result.json()
        })
        .then(response => {
            console.log('response: ' + JSON.stringify(response));
            this.setState({returnedId: response.post.postId});
            console.log(this.state.returnedId);
            console.log(response.post);
            console.log(response.post.postId);
        });
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }

    handleChangeContent(event) {
        this.setState({content: event.target.value});
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                title<input type="title" value={this.state.value} onChange={this.handleChangeTitle} type="text" />
                content<input type="content" value={this.state.value} onChange={this.handleChangeContent} type="text" />

                {/* <Link to={`post/${this.state.returnedID}`}> */}
                    <button>Send data!</button>
                {/* </Link> */}
            </form>
        );
    }
}

export default CreatePost;