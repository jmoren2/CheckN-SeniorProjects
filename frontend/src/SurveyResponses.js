import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Accordion, Dropdown, Grid, Icon, Card} from 'semantic-ui-react';
import './index.css'

class SurveyResponse extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            questions: [],
            responses: [],

            //These are all related to the dropbox filtering
            dropBoxQuestionArray: null,
            dropBoxOptionsArrays: null,
            currentDropBoxOptions: null,
            filterByQuestions: [-1],
            filterByResponseTo: -1,
            filterByResponse: -1,

            //whether or not the box is open needs to be state dependent
            activeBoxes: [],
            //total index will let me do a show all button later
            totalIndex: 0,

            surveyId: this.props.match.params.surveyId, 
            postId: this.props.match.params.fromPostId,

        }
    }

    componentDidMount() {
        this.retrieveSurvey();
    }

    retrieveSurvey(){
        //fetch(`https://c9dszf0z20.execute-api.us-west-2.amazonaws.com/prod/surveys/${this.props.match.params.surveyID}` ,{
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/surveys/${this.state.surveyId}`, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
        })
        .then(results => {
            return results.json();
        })//Saves the response as JSON
        .then(survey => {
            this.initializeForSurvey(survey.survey.questions);
            this.retrieveResponses(survey.survey.responses);
        })
        .catch(error => {
            console.log(error);
        });
    }

    //When initializing a survey I create the {text: , value: } objects for the dropboxes
    //Also store the question array itself in state I will want the question text later on
    initializeForSurvey(questions){
        var dropBoxQuestionArray = [{text: 'All', value: -1}];
        var dropBoxOptionsArrays = []
        for (var i = 0; i < questions.length; i++)
        {
            dropBoxQuestionArray.push({text: i+1, value: i});
            dropBoxOptionsArrays.push([{text: 'Any', value: -1}]);
            for (var j = 0; j < questions[i].options.length; j++)
            {
                dropBoxOptionsArrays[i].push({text: questions[i].options[j], value: j});
            }
        }

        this.setState({
            dropBoxQuestionArray: dropBoxQuestionArray,
            dropBoxOptionsArrays: dropBoxOptionsArrays,
            currentDropBoxOptions: dropBoxOptionsArrays[0],
            questions: questions
        });
    }

    //Response now come in with the survey
    retrieveResponses(responses){
        this.setState({responses: responses});
    }

    showSelection(){
        return(
            <Grid celled='internally' columns={3}>
                <Grid.Row>
                    <Grid.Column>
                        <label>Show Questions:</label>
                    </Grid.Column>
                    <Grid.Column>
                        <label>Filter to users who answered question:</label>
                    </Grid.Column>
                    <Grid.Column>
                        <label>With response:</label>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Dropdown
                        placeholder='All'
                        fluid
                        multiple
                        selection
                        options={this.state.dropBoxQuestionArray}
                        onChange={this.onChangeFilterByQuestions}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown
                        placeholder='Any'
                        fluid
                        selection
                        options={this.state.dropBoxQuestionArray}
                        onChange={this.onChangeFilterByResponseToDropbox}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Dropdown
                        placeholder='Any'
                        fluid
                        selection
                        options={this.state.currentDropBoxOptions}
                        onChange={this.onChangeFilterByResponseDropbox}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    onChangeFilterByQuestions = (event, data) => {
        if (data.value.length == 0)
            this.setState({filterByQuestions: [-1]});
        else
            this.setState({filterByQuestions: data.value});
    }
    onChangeFilterByResponseToDropbox = (event, data) => {
        this.setState({
            currentDropBoxOptions: this.state.dropBoxOptionsArrays[data.value],
            filterByResponseTo: data.value,
            filterByResponse: -1
        })
    }

    onChangeFilterByResponseDropbox = (event, data) => {
        this.setState({
            filterByResponse: data.value
        })
    }

    showResponses(){
        return(
            <Accordion exclusive={false} fluid styled>
                {this.generateAccordions()}
            </Accordion>
        );
    }

    generateAccordions(){
        var index = -1;
        if (!((typeof this.state.responses) === "object"))
        {
            return null;
        }
        if(this.state.responses.length == 0)
        {
            return null;
        }
        var accordions = this.state.responses.map((response) => {
            index++;
            if (this.state.filterByResponseTo == -1)
            {
                return(
                    <div>
                        <h>
                            {this.state.responses[index].userName}
                        </h>
                        {this.generateRespones(index)}
                    </div>
                );
            }
            else if (this.state.responses[index].responses[this.state.filterByResponseTo].includes(this.state.questions[this.state.filterByResponseTo].options[this.state.filterByResponse]))
            {
                return(
                    <div>
                        <h>
                            {this.state.responses[index].userName}
                        </h>
                        {this.generateRespones(index)}
                    </div>
                )
            }
            else
            {
                return(
                    <div/>
                )
            }
        })
        return accordions;
    }

    handleAccordionClick = (event, data) => {
        var temp = this.state.activeBoxes;

        if (temp.includes(data.index))
        {
            temp.splice(temp.indexOf(data.index), 1);
        }
        else
        {
            temp.push(data.index);
        }
        this.setState({activeBoxes: temp});
    }

    generateRespones(index){
        var questionIndex = -1;
        var responseOutput = null;

        if (this.state.filterByQuestions.includes(-1))
        {
            //render all unconditionally
            //responseIndex++;
            responseOutput = this.state.questions.map((question) => {
                questionIndex++;
                return(
                    <Card className="responsecard" fluid>
                        <Card.Content>
                            <Card.Header>
                                {questionIndex + 1}. {this.state.questions[questionIndex].question}
                            </Card.Header>
                        <div/>
                        <label>{this.state.responses[index].responses[questionIndex]}</label>
                        </Card.Content>
                    </Card>
                )
            })
        }
        else
        {
            responseOutput = this.state.questions.map((question) => {
                questionIndex++;
                if (this.state.filterByQuestions.includes(questionIndex))
                {
                    return(
                        <Card className="responsecard" fluid>
                            <Card.Content>
                                <Card.Header>
                                    {questionIndex + 1}. {this.state.questions[questionIndex].question}
                                </Card.Header>
                            <div/>
                            <label>{this.state.responses[index].responses[questionIndex]}</label>
                            </Card.Content>
                        </Card>
                    )
                }
                else
                {
                    return(
                        <div/>
                    )
                }
            })
        }
        return responseOutput;
    }

    generateResponseContent(index){

    }

    render(){
        return(
            <div className='container'>
                <div className='card card-1 text-md-center'>
                    {this.showSelection()}
                    {this.showResponses()}
                </div>
            </div>
        );
    }
}

export default SurveyResponse;