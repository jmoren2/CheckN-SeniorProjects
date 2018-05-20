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
        //I'll need the survey and the responses so that I can see questions and all possible answers
        this.retrieveSurvey();
        this.retrieveResponses();
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
            console.log(survey);
            console.log(survey.survey);
            this.initializeForSurvey(survey.survey.questions);
        });
    }

    //When initializing a survey I create the {text: , value: } objects for the dropboxes
    //Also store the question array itself in state I will want the question text later on
    initializeForSurvey(questions){
        console.log('initialize survey being');
        console.log(questions);
        var dropBoxQuestionArray = [{text: 'All', value: -1}];
        var dropBoxOptionsArrays = []
        for (var i = 0; i < questions.length; i++)
        {
            dropBoxQuestionArray.push({text: i+1, value: i});
            dropBoxOptionsArrays.push([{text: 'Any', value: -1}]);
            for (var j = 0; j < questions[i].options.length; j++)
            {
                console.log('adding option');
                dropBoxOptionsArrays[i].push({text: questions[i].options[j], value: j});
                console.log(dropBoxOptionsArrays[i]);
            }
        }

        console.log("initialize survey done");
        console.log(dropBoxOptionsArrays);
        this.setState({
            dropBoxQuestionArray: dropBoxQuestionArray,
            dropBoxOptionsArrays: dropBoxOptionsArrays,
            currentDropBoxOptions: dropBoxOptionsArrays[0],
            questions: questions
        });
    }

    retrieveResponses(){
        /*fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/surveys/${this.state.surveyId}/responses`, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET',
        })
        .then(results => {
            return results.json();
        })
        .then(responses => {
            console.log(responses);
        })
        .catch(error => {
            console.log(error);
        });*/
        this.setState({
            responses: [
                {
                    userId: 12345,
                    responses: [['howdy'],['sup'],['hello'],['123'],['a'],['b', 'd'],['3']]
                },
                {
                    userId: 54321,
                    responses: [['Portland'],['Seattle'],['Los Angeles'],['24'],['d'],['a', 'c'],['8']]
                },
                {
                    userId: 100110101,
                    responses: [['blah blah blah'],['yadda yadda yadda'],['whatever'],['30000'],['d'],['b', 'c'],['1']]
                }
            ],
            totalIndex: 3
        })
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
        console.log(data);
        if (data.value.length == 0)
            this.setState({filterByQuestions: [-1]});
        else
            this.setState({filterByQuestions: data.value});
    }
    onChangeFilterByResponseToDropbox = (event, data) => {
        console.log(event.value);
        console.log(data.value);
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
        console.log('show responses');
        return(
            <Accordion exclusive={false} fluid styled>
                {this.generateAccordions()}
            </Accordion>
        );
    }

    generateAccordions(){
        var index = -1;
        var accordions = this.state.responses.map((response) => {
            index++;
            if (this.state.filterByResponseTo == -1)
            {
                return(
                    <div>
                        <Accordion.Title onClick={this.handleAccordionClick} index={index} active={this.state.activeBoxes.includes(index)}>
                            <Icon name='dropdown'/>
                            {this.state.responses[index].userId}
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeBoxes.includes(index)}>
                            {this.generateRespones(index)}
                        </Accordion.Content>
                    </div>
                );
            }
            else if (this.state.responses[index].responses[this.state.filterByResponseTo].includes(this.state.questions[this.state.filterByResponseTo].options[this.state.filterByResponse]))
            {
                return(
                    <div>
                        <Accordion.Title onClick={this.handleAccordionClick} index={index} active={this.state.activeBoxes.includes(index)}>
                            <Icon name='dropdown'/>
                            {this.state.responses[index].userId}
                        </Accordion.Title>
                        <Accordion.Content active={this.state.activeBoxes.includes(index)}>
                            {this.generateRespones(index)}
                        </Accordion.Content>
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
        console.log('===================');
        var temp = this.state.activeBoxes;
        console.log(temp);
        if (temp.includes(data.index))
        {
            console.log('removing ' + data.index);
            //get rid of that one
            temp.splice(temp.indexOf(data.index), 1);
        }
        else
        {
            console.log('adding ' + data.index);
            temp.push(data.index);
        }
        console.log(temp);
        this.setState({activeBoxes: temp});
    }

    generateRespones(index){
        var questionIndex = -1;
        var responseOutput = null;
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        console.log(index);
        console.log(this.state);
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