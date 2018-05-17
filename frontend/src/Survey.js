//This will be a page where users take surveys
//Gets the surveyId and the postID from the url

//Need the page to check against a userID to make sure users that aren't signed in or have already taken can't do it again

import React from 'react';
import {Link} from 'react-router-dom';
//import {DropdownButton, MenuItem} from 'react-bootstrap';
import {Dropdown, Button, Card, Form, Checkbox, Grid, Divider, Input, TextArea} from 'semantic-ui-react';


/*
Need to check how responses are gonna be formatted 
Also figure out when I'm gonna create the response array
If I create it in render it will be destroyed,
but if I create a generic object it might not have good info for each response
*/

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


class Survey extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            surveyFeed: null,
            surveyResponses: [],
            checked: true
        }
        this.surveyQuestions = [];
        //this.surveyResponses = [];
    }

    componentDidMount() {//Queries the API for a post and its comments with specified ID
        this.retrieveSurvey();
    }

    componentDidUpdate(){
        console.log('UPDATED');
        console.log(this.state.surveyResponses[0].response[0]);
        console.log(this.state.checked);
    }

    defaultResponse(id){
        this.questionId = id;
        this.response = [];
    }

    retrieveSurvey(){
        console.log(this.props.match.params.surveyId);
        //fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/surveys/${this.props.match.params.surveyID}` ,{
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/surveys/${this.props.match.params.surveyId}`, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
        })
        .then(results => {
            console.log(results);
            return results.json();
        })//Saves the response as JSON
        .then(survey => {
            console.log(survey);
            this.generateSurvey(survey.survey.questions);//Continues the work in the function above
        });
    }

    //When generating survey need to create quesiton objects
    //have mapping increment an index, set questionObject[index] to the question object
    //Then pass that index along to renderQuestion so that it can reference the objects
    generateSurvey = (survey) => {
        var index = -1;
        var theSurvey = survey.map((question) => {
            index++;

            var temp = this.state.surveyResponses;
            temp.push(new this.defaultResponse(question.Id));
            this.setState({surveyResponses: temp});

            return(
                <div>
                    {this.renderQuestion(question, index)}
                </div>
            );
        });
        this.setState({surveyFeed: theSurvey});
    }

    renderQuestion = (question, index) => {
        return(
            <div>
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        {question.question}
                    </Card.Header>
                    <Form>
                        {this.questionHandler(question, index)}
                    </Form>
                </Card.Content>
            </Card>
            <Divider/>
            </div>
        );
    }

    //Go through the type for each question and pass it on to another method
    questionHandler = (question, index) => {
        console.log('type ' + question.type);
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

    //Rows will be updated based on size restrictions but in the future there might be a character limit
    renderFree = (question, index) => {
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
        console.log(this.state);
        return(
            <TextArea id={index} className='freeResponse' value={this.state.surveyResponses[index].response[0]} onChange={onChangeMethod} fluid placeholder='Enter Response...' rows={theRows} autoHeight/>
        );
    }

    renderSelect = (question, index) => {

        //call a different checkbox renderer based on restriction
        var checkBoxRender = this.renderMultipleCheckbox;
        if (question.restrictions === 'one')
            checkBoxRender = this.renderOneCheckbox;

        var optionIndex = -1;
        var checkBoxes = question.options.map((option) => {
            optionIndex++;
            var temp=this.state.surveyResponses;

            return(
                <div>
                    {checkBoxRender(option, index, optionIndex)}
                </div>
            );
        });

        return(
            <div>
                {checkBoxes}
            </div>
            /*
            <Form>
                <Form.Field>
                    Selected value: <b>{this.state.value}</b>
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Choose this'
                        name='checkboxRadioGroup'
                        value='this'
                        checked={this.state.value === 'this'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Or that'
                        name='checkboxRadioGroup'
                        value='that'
                        checked={this.state.value === 'that'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
            </Form>*/
        );
    }

    renderOneCheckbox = (option, index, optionIndex) => {
        console.log('renderOneCheckbox');
        console.log(option);
        console.log(typeof option);
        var k = index;
        console.log('Other' === option);
        return(
            <Checkbox
                label={option}
                value={index}
                name="checkboxRadioGroup"
                checked={this.state.checked}
                onChange={this.updateOneSelect}
            >
            </Checkbox>
        );
    }

    //checked={this.state.surveyResponses[index].response[0] === option}

    updateOneSelect = (event, {value}) => {
        console.log('updateOneSelect');
        /*console.log(event.target.value);
        console.log(this.state);
        console.log(event.target.label);
        console.log(event.target.value);
        console.log('==========================');
        console.log(event);
        console.log(event.target);*/
        var temp = this.state.surveyResponses;
        console.log(temp[value].response[0]);
        //console.log(event);
        //console.log(event.target);
        //console.log(event.target.value);
        //console.log(value);
        //console.log(event.target.innerText);
        temp[value].response[0] = event.target.innerHTML;
        //console.log(temp[value]);
        console.log(temp[value].response[0]);
        console.log(typeof temp[value].response[0]);
        this.setState({surveyResponses: temp, checked: !this.state.checked});
        /*var temp = this.state.surveyResponses;
        temp[event.target.tabindex].response[0] = event.target.value;
        console.log(temp[event.target.tabindex].response[0]);
        this.setState({surveyResponses: temp});*/
    }

    renderMultipleCheckbox = (option, index, optionIndex) => {
        return(
            <Checkbox/>
        );
    }

    renderScale = (question, index) => {
        return(
            <label>scale</label>
        );
    }

    updateTextResponse = (event) =>{
        var temp = this.state.surveyResponses;
        temp[event.target.id].response[0] = event.target.value;
        this.setState({surveyResponses: temp});
        console.log(this.state);
    }

    updateNumericResponse = (event) => {
        if (event.target.value != '')
        {
            if (isNaN(event.taret.value))
                return;
            else
            {
                var temp = this.state.surveyResponses;
                temp[event.target.id].response[0] = event.target.value;
                this.setState({surveyResponses: temp});
            }
        }
    }

    render(){
        return(
            <div className='container'>
                <div className='card card-1 text-md-center'>
                    {this.state.surveyFeed}
                </div>
            </div>
        );
    }
}

export default Survey;