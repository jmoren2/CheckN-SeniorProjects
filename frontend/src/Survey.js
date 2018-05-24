//This will be a page where users take surveys
//Gets the surveyId and the postID from the url

//Need the page to check against a userID to make sure users that aren't signed in or have already taken can't do it again

import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Dropdown, Button, Card, Form, Checkbox, Grid, Divider, Input, TextArea, Label} from 'semantic-ui-react';
import "./index.css";

/*
{
    "responseId": "3943666c-78cc-42cd-8a5c-765a42e55852",
    "userId": "124d45f8-988f-4a9d-b908-f6e17e20f438",
    "responses": [{
        "questionId":"cc84625b-cd53-4367-a595-a75e43949743",
        "response":["banana"]
    },{
        "questionId":"1f53297d-e84a-41d6-9a7c-bb10bb9d26c5",
        "response":["I like bananas because they are my favorite color!"]
    }]
}
*/

class Survey extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            questions: [],
            responses: [],
            surveyId: '',
            responseSubmitted: false, 
            postId: this.props.match.params.fromPostId
        }
    }

    componentDidMount() {
        this.retrieveSurvey();
    }

    retrieveSurvey(){
        //fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/surveys/${this.props.match.params.surveyID}` ,{
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/surveys/${this.props.match.params.surveyId}`, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
        })
        .then(results => {
            return results.json();
        })//Saves the response as JSON
        .then(survey => {
            console.log(survey);
            this.initializeState(survey.survey);
        })
        .catch(error => {
            console.log(error);
        });
    }

    defaultResponse(){
        this.response = [];
    }

    //State holds on to the questions and responses
    //This is important because I want the rendering of each component to be completely state dependent 
    initializeState(survey){
        console.log('initializeState');
        console.log(survey);
        var questionArray = survey.questions;
        var responseArray = survey.questions.map((question) => {
            //var temp = new this.defaultResponse();
            return(
                []
            )
        });

        this.setState(
            {
                questions: questionArray,
                responses: responseArray,
                surveyId: survey.surveyId
            }
        );
    }

    //Show survey is a method that gets called by render.  Before I have essentially a "feed" but that causes issues
    showSurvey(){
        var index = -1;
        var theSurvey = this.state.questions.map((question) => {
            index++;
            return(
                <div>
                    {this.questionHandler(question, index)}
                </div>
            );
        });
        
        return(
            <div>
                {theSurvey}
            </div>
        )
    }

    //Look at the type of question and pass it on to that types renderer
    questionHandler(question, index){
        if (question.type === "free")
        {
            return(
                this.renderFree(question, index)
            );
        }
        else if (question.type === "select")
        {
            return(
                this.renderSelect(question, index)
            );
        }
        else if (question.type === "scale")
        {
            return(
                this.renderScale(question, index)
            );
        }
        else
        {
            return(
                <label>OTHER</label>
            );
        }
    }

    renderFree(question, index){
        var theRows = 3;
        var onChangeMethod = this.updateTextResponse;
        if (question.restrictions === 'short')
            theRows = 2;
        else if (question.restrictions === 'long')
            theRows = 5;
        else if (question.restrictions === 'numeric')
        {
            theRows = 1;
            onChangeMethod = this.updateNumericResponse;
        }
        return(
            <div>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {this.state.questions[index].question}
                    </Card.Header>
                    <Form>
                    <TextArea id={index} className='freeResponse' value={this.state.responses[index][0]} onChange={onChangeMethod} fluid placeholder='Enter Response...' rows={theRows} autoHeight/>
                    </Form>
                </Card.Content>
            </Card>
            <Divider/>
            </div>
        );
    }

    updateTextResponse = (event) => {
        var temp = this.state.responses;
        temp[event.target.id][0] = event.target.value;
        this.setState({responses: temp});
    }

    //checks if the new value is not a number, and if it isn't then it doesn't update
    //deals with empty string seperately because I ran into problems with it
    updateNumericResponse = (event) => {
        if (event.target.value != '')
        {
            if (isNaN(event.target.value))
                return;
            else
            {
                var temp = this.state.responses;
                temp[event.target.id][0] = event.target.value;
                this.setState({responses: temp});
            }
        }
        else
        {
            var temp = this.state.responses;
            temp[event.target.id][0] = event.target.value;
            this.setState({responses: temp});
        }
    }

    renderSelect(question, index){
        var onChangeFunction = this.handleSingleSelectChange;
        var selectOptions = null;
        var optionIndex = -1;
        if (this.state.questions[index].restrictions === 'multiple')
        {
            onChangeFunction = this.handleMultipleSelectChange;
            selectOptions = this.state.questions[index].options.map((options) => {
                optionIndex++;
                return(
                    <div>
                        <Checkbox 
                            label={this.state.questions[index].options[optionIndex]}
                            value={index}
                            onChange={onChangeFunction}
                        />
                    </div>
                );
            });
        }
        else
        {
            selectOptions = this.state.questions[index].options.map((options) => {
                optionIndex++;
                return(
                    <div>
                        <Checkbox 
                            label={this.state.questions[index].options[optionIndex]}
                            value={index}
                            checked={this.state.questions[index].options[optionIndex] === this.state.responses[index][0]}
                            onChange={onChangeFunction}
                        />
                    </div>
                );
            });
        }

        return(
            <div>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {this.state.questions[index].question}
                    </Card.Header>
                    <Form>
                        {selectOptions}
                    </Form>
                </Card.Content>
            </Card>
            <Divider/>
            </div>
        )
    }

    handleSingleSelectChange = (event, {value, label}) => {
        var temp = this.state.responses;
        if (temp[value][0] === label)
            temp[value][0] = '';
        else
            temp[value][0] = label;
        this.setState({responses: temp});
    }

    handleMultipleSelectChange = (event, {value, label, checked}) => {
        var temp = this.state.responses;
        //If the user has just checked the item, add it
        if (checked)
        {
            temp[value].push(label);
        }
        else    //otherwise the user must have just unchecked it, so remove it
        {
            var index = temp[value].indexOf(label);
            //indexOf should return -1 if item isn't in array, which shouldn't happen
            if (index >= 0)
            {
                //This should remove 1 item starting at index
                temp[value].splice(index, 1);
            }
        }
    }

    //Scale is just a slightly modified single select
    //probably use a grid that has 2 rows and as many columns as options
    renderScale(question, index){
        var optionIndex = -1;
        var topRow = this.state.questions[index].options.map((option) => {
            optionIndex++;
            return(
                <Grid.Column>
                    <label>{this.state.questions[index].options[optionIndex]}</label>
                </Grid.Column>
            )
        });
        optionIndex = -1;
        var bottomRow = this.state.questions[index].options.map((options) => {
            optionIndex++;
            return(
                <Grid.Column>
                    <Checkbox
                        text={this.state.questions[index].options[optionIndex]}
                        value={index}
                        checked={this.state.questions[index].options[optionIndex] === this.state.responses[index][0]}
                        onChange={this.handleScaleChange}
                    />
                </Grid.Column>
            )
        });
        return(
            <div>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {this.state.questions[index].question}
                    </Card.Header>
                    <Form>
                    <Grid columns={this.state.questions[index].options.length} divided centered>
                    <Grid.Row>
                        {topRow}
                    </Grid.Row>
                    <Grid.Row>
                        {bottomRow}
                    </Grid.Row>
                </Grid>
                    </Form>
                </Card.Content>
            </Card>
            <Divider/>
            </div>
        )
    }

    handleScaleChange = (event, {value, text}) => {
        var temp = this.state.responses;
        if (temp[value][0] === text)
            temp[value][0] = '';
        else
            temp[value][0] = text;
        this.setState({responses: temp});
    }

    //Submit will do the request to submit a response and then redirect back to the post the user came from
    handleSubmit = () => {
        console.log("SUBMITTING");
        var surveyResponse = {
            userId: this.props.userObj.userId,
            responses: this.state.responses
        }
        console.log(surveyResponse);
        //fetch here
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/surveys/${this.props.match.params.surveyId}/responses`, {
                method: 'POST',
                body: JSON.stringify(surveyResponse)
            })
            .then(response => {
                return response.json();
            })
            .then(result => {
                console.log(result);
                this.setState({responseSubmitted: true});
            })
            .catch(error => console.error('Error:', error));
    }

    render(){
        if (this.state.responseSubmitted)
        {
            return(
                <Redirect to={`/post/${this.state.postId}`}/>
            );
        }
        else
        {
            return(
                <div className='container'>
                    <div className='card card-1 text-md-center'>
                        {this.showSurvey()}
                        <Button onClick={this.handleSubmit} positive>Submit Response</Button>
                    </div>
                </div>
            );
        }
    }
}

export default Survey;