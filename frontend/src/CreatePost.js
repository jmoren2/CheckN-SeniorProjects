import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class CreatePost extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.returnedID = null;
    }

    handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('https://95sbuermt6.execute-api.us-west-2.amazonaws.com/dev/posts', {
            method: 'POST',
            body: data,
        });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                title<input id="title" name="title" type="text"/>
                content<input id="content" name="content" type="text"/>

                <Link to={`post/${this.returnedID}`}>
                    <button>Send data!</button>
                </Link>
            </form>
        );
    }
}

export default CreatePost;