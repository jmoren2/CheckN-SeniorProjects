import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import Navbar from './Navbar.js'
import 'bootstrap/dist/css/bootstrap.css';

class EditPost extends Component{
    constructor(props){
        super(props);
        this.state = {
            postID: props.match.params.postID,
            title: '', 
            content: '',
            tagArray: [],
            tagstring: '',
            tagButtons: '',
            handleSubmitDone: false
        };
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeTags = this.handleChangeTags.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.retrievePost = this.retrievePost.bind(this);
    }

    componentDidMount() {//Queries the API for the post being edited
        this.retrievePost();
    }

    retrievePost(){
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/posts/${this.state.postID}` ,{
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
        })
        .then(results => {
            return results.json();
        })//Saves the response as JSON
        .then(data => {
            var tagString = "";
            for (var i = 0; i < data.post.tags.length; i++)
            {
                tagString += data.post.tags[i] + " ";
            }
            this.setState({
                title: data.post.title,
                content: data.post.content,
                tagArray: data.post.tags,
                tagString: tagString
            }, () => {this.handleChangeTags({target: {value: tagString}})})
        });
    }

    handleSubmit(event){
        event.preventDefault();
        //What is being sent to the API
        const data = {
            title: this.state.title,
            content: this.state.content,
            tags: this.state.tagArray,
        };

        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/posts/${this.state.postID}`, {
            method: 'PUT',
            body: JSON.stringify(data)//Stringify the data being sent
        })
        .then(response => {
            return response.json()//Turn the response into a JSON object
        })
        .then(result => {
            this.setState({handleSubmitDone: true});//Give the new post ID to the app for redirection
        });
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});//Updates the title field as typing occurs
    }

    handleChangeContent(event) {
        this.setState({content: event.target.value});//Updates the content field as typing occurs
    }

    handleChangeTags(event) {
        //lowercases the tags and splits them
        var newTags = event.target.value.toLowerCase();
        newTags = newTags.split(" ");

        //Checks if the last string is empty and removes it
        if (newTags[newTags.length - 1] === '')
            newTags.splice([newTags.length - 1], 1);

        //Update tagArray which will be sent to the data and tagButtons which acts as a preview
        //maybe if these stay as buttons they can delete the tag when clicked
        this.setState({
            tagArray: newTags,
            tagString: event.target.value,
            tagButtons: newTags.map((tag) => {
                return (<button>
                       {tag}
                       </button>);
            })
        });
    }

    render(){
        if (this.state.handleSubmitDone === true){
            return(<Redirect to={`/post/${this.state.postID}`}/>);//go to the new post's page
        }
        return(
            <div>
            <Navbar />
                <div className="container">
                    <div className=''>
                        <div className='card card-1  text-md-center'>
                            <div className='card-body text-center'>
                                <h2 className='text-center' style={{color:'black'}}>Edit Your Post</h2>
                                <form onSubmit={this.handleSubmit}>

                                    <div className='form-group'>
                                        <label>Title: </label>
                                        <input value={this.state.title} onChange={this.handleChangeTitle} placeholder='Enter the title' className='form-control' /> <br />
                                    </div>

                                    <div className='form-group'>
                                        <label>Content: </label>
                                        <input value={this.state.content} onChange={this.handleChangeContent} placeholder='Enter the content' className='form-control' /> <br />
                                    </div>

                                    <div className='form-group'>
                                        <label>Tags:</label>
                                        <input value={this.state.tagString} onChange={this.handleChangeTags}  placeholder='Enter tags' className='form-control' /> <br />
                                        <span>
                                            <label>Tag Preview: </label>
                                            {this.state.tagButtons}
                                        </span>
                                    </div>

                                    <button className='btn btn-info' type='submit'>Submit</button>

                                    <Link to={`/post/${this.state.postID}`}>
                                    <button className='btn btn-info'>Cancel Edit</button>
                                    </Link>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditPost;