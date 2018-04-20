import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';

class CreatePost extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.returnedID = null;
        this.state = {title: '', content: '', returnedId: null, handleSubmitDone: false};
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        console.log('state.title: ' + this.state.title);
        console.log('state.content: ' + this.state.content);
        const data = {title: this.state.title, content: this.state.content};//What is being sent to the API
        console.log('data: ' + JSON.stringify(data));

        fetch('https://95sbuermt6.execute-api.us-west-2.amazonaws.com/dev/posts', {
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(result => {
            console.log('result: ' + JSON.stringify(result));
            return result.json()
        })
        .then(response => {
            console.log('response: ' + JSON.stringify(response));
            this.setState({returnedId: response.post.Item.postId, handleSubmitDone: true});
            console.log(response.post.Item);
            console.log(response.post.Item.postId);
        });
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});//Updates the title field as typing occurs
    }

    handleChangeContent(event) {
        this.setState({content: event.target.value});//Updates the content field as typing occurs
    }

    render(){
        if (this.state.handleSubmitDone === true){
            return <Redirect to={`/post/${this.state.returnedId}`}/>//go to the post's webpage
        }
        return(
            <form onSubmit={this.handleSubmit}>
                title<input value={this.state.title} onChange={this.handleChangeTitle} type="text" />
                content<input value={this.state.content} onChange={this.handleChangeContent} type="text" />

                {/*<Link to={`/post/${this.state.returnedId}`}>*/}
                    <button>Send data!</button>
                {/*</Link>*/}
            </form>
        );
    }
}

export default CreatePost;