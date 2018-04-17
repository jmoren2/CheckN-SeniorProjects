import React, {Component} from 'react';

class CreatePost extends Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
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

                <button>Send data!</button>
            </form>
        );
    }
}