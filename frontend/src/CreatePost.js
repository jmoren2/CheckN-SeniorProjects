import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import Navbar from './Navbar.js'
import Question from './Question.js'
import {Divider} from 'semantic-ui-react';
//import 'bootstrap/dist/css/bootstrap.css';

class CreatePost extends Component{
    constructor(props){
        super(props);
        this.state = {
                    title: '', 
                    content: '',
                    tagArray: [],
                    tagButtons: '',
                    returnedId: null, 
                    handleSubmitDone: false,
                    questions: [],
                    hasSurvey: false,
        };
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
        this.handleChangeTags = this.handleChangeTags.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.questionObjects = [];
        console.log("The user object passed in is: " + props.userObj);
    }

    defaultQuestion(){
        this.question = '';
        this.type = 'short';
        this.restrictions = 'none';
        this.options = [];
    }

    //For surveys it will submit the survey, then call another submit once that is done for the whole post 
    //with the survey ID
    handleSubmit(event){
        event.preventDefault();
        //I think this is the right solution for posting surveys and posts but commenting it out for now
        //so that I don't actually submit anything
        /*
        if (this.state.hasSurvey)
        {
            //First create the survey object and submit it
            const survey = {
                userId: this.props.userObj.userId,
                questions: this.state.questions,
            };

            fetch('https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/surveys/', {
                method: 'POST',
                body: Json.stringify(survey)
            })
            .then(response => {
                return response.json()
            })
            .then(result => {
                this.submitPost(result.survey.surveyId);
            });
        }
        else
        {
            this.submitPost(null);
        }*/
    }

    submitPost(surveyId){
        if (surveyId === null)
        {
            const data = {
                title: this.state.title, 
                content: this.state.content,
                tags: this.state.tagArray,
                userId: this.props.userObj.userId
            };
        }
        else
        {
            const data = {
                title: this.state.title, 
                content: this.state.content,
                tags: this.state.tagArray,
                userId: this.props.userObj.userId,
                surveyId: surveyId
            };
        }

        fetch('https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/posts/', {
            method: 'POST',
            body: JSON.stringify(data)//Stringify the data being sent
        })
        .then(response => {
            return response.json()//Turn the response into a JSON object
        })
        .then(result => {
            this.setState({returnedId: result.post.postId, handleSubmitDone: true});//Give the new post ID to the app for redirection
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
            tagButtons: newTags.map((tag) => {
                return (<button>
                       {tag}
                       </button>);
            })
        });
    }

    generateSurvey = () => {
        console.log('generateSurvey');
        document.getElementById('createSurvey').hidden = true;
        document.getElementById('addQuestion').hidden = false;
        this.questionObjects.push(new this.defaultQuestion());
        var temp=this.state.questions
        temp.push(<Question number={this.questionObjects.length} object={this.questionObjects[this.questionObjects.length -1]}/>);
        this.setState({
            hasSurvey: true,
            questions: temp,
        });
    }

    showSurvey = () => {
        console.log('showSurvey');
        var survey = this.state.questions.map(question => {
            return(
                <div>
                 {question}
                 <Divider/>
                </div>
            );
        });
        return(
            <div>
                {survey}
            </div>
        );
    }

    addQuestion = () => {
        console.log('generateSurvey');
        this.questionObjects.push(new this.defaultQuestion());
        var temp=this.state.questions
        temp.push(<Question number={this.questionObjects.length} object={this.questionObjects[this.questionObjects.length -1]}/>);
        this.setState({
            questions: temp,
        });
    }

    render(){
        if (this.state.handleSubmitDone === true){
        return(<Redirect to={`/post/${this.state.returnedId}`}/>);//go to the new post's page
        }
        return(
            <div>
            <Navbar />
                <div className="container">
                    <div className=''>
                        <div className='card card-1  text-md-center'>
                            <div className='card-body text-center'>
                                <h2 className='text-center' style={{color:'black'}}>Create New Post</h2>
                                <form onSubmit={this.handleSubmit}>

                                    <div className='form-group'>
                                        <label>Title: </label>
                                        <input value={this.state.title} onChange={this.handleChangeTitle} placeholder='Enter the title' className='form-control' /> <br />
                                    </div>

                                    <div className='form-group'>
                                        <label>Content: </label>
                                        <input value={this.state.content} onChange={this.handleChangeContent}  placeholder='Enter the content' className='form-control' /> <br />
                                    </div>

                                    <div className='form-group'>
                                        <label>Tags:</label>
                                        <input onKeyUp={this.handleChangeTags}  placeholder='Enter tags' className='form-control' /> <br />
                                        <span>
                                            <label>Tag Preview: </label>
                                            {this.state.tagButtons}
                                        </span>
                                    </div>

                                    <button id='createSurvey' type='button' onClick={this.generateSurvey}>This will be the add survey button</button>
                                    {this.showSurvey()}
                                    <button hidden id='addQuestion' type='button' onClick={this.addQuestion}>Add a Question</button>

                                    <button className='btn btn-info' type='submit'>Submit</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePost;