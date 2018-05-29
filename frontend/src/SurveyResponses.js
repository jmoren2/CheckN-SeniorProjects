import React from 'react';
import Navbar from './Navbar.js';
import {Link, Redirect} from 'react-router-dom';
import {Accordion, Dropdown, Grid, Icon, Card, Divider, Tab} from 'semantic-ui-react';
import {CSVLink, CSVDownload} from 'react-csv';
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

            csvData: [],
            responseTotals: null,

            surveyId: this.props.match.params.surveyId, 
            postId: this.props.match.params.fromPostId,

        }

        if (this.props.fromSurvey)
        {
            alert("You've already taken that survey");
        }

        this.panes = [
            {menuItem: 'Individual Responses', 
                render: () =>
                    <Tab.Pane key='IndividualResponses'>
                        {this.showResponses()}
                    </Tab.Pane>
            },
            {menuItem: 'Overall Responses',
                render: () =>
                    <Tab.Pane key='OverallResponses'>
                        {this.showOverall()}
                    </Tab.Pane>
            }
        ]
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
            this.initializeForSurvey(survey.survey.questions, survey.survey.responses);
            //this.retrieveResponses(survey.survey.responses);
            this.createCSVData(survey.survey.questions, survey.survey.responses);
        })
        .catch(error => {
            console.log(error);
        });
    }

    //When initializing a survey I create the {text: , value: } objects for the dropboxes
    //Also store the question array itself in state I will want the question text later on
    initializeForSurvey(questions, responses){
        var dropBoxQuestionArray = [{text: 'All', value: -1}];
        var dropBoxOptionsArrays = [];
        var responseTotals = [];
        for (var i = 0; i < questions.length; i++)
        {
            dropBoxQuestionArray.push({text: i+1, value: i});
            dropBoxOptionsArrays.push([{text: 'Any', value: -1}]);
            responseTotals.push([]);
            for (var j = 0; j < questions[i].options.length; j++)
            {
                dropBoxOptionsArrays[i].push({text: questions[i].options[j], value: j});
                responseTotals[i].push(0);
            }
            if (questions[i].type === 'free')
            {
                if (questions[i].restrictions === 'numeric')
                {
                    responseTotals[i].push(0);//total responses
                    responseTotals[i].push(0);//sum
                    responseTotals[i].push(0);//average
                }
                else 
                {
                    responseTotals[i].push([0]);
                }
            }
        }

        //Go through the responses and total results for summary
        for (var i = 0; i < responses.length; i++)
        {
            var response = responses[i].responses;
            //Go through each response to each question
            for (var j = 0; j < response.length; j++)
            {
                if (typeof response[j][0] === 'undefined')
                    continue;
                if (questions[j].type === 'free')
                {
                    if (questions[j].restrictions === 'numeric')
                    {
                        responseTotals[j][0] = 1 + responseTotals[j][0];
                        responseTotals[j][1] += Number(response[j][0]);
                        responseTotals[j][2] = (responseTotals[j][1]/responseTotals[j][0]);
                    }
                    else
                    {
                        responseTotals[j][0] += 1;
                    }
                }
                else if (questions[j].type === 'select')
                {
                    //Go through each answer on a select question
                    for (var k = 0; k < response[j].length; k++)
                    {
                        var choice = response[j][k];
                        for (var l = 0; l < questions[j].options.length; l++)
                        {
                            if (choice === questions[j].options[l])
                                responseTotals[j][l] += 1;
                        }
                    }
                }
                else
                {
                    var choice = response[j][0];
                    for (var l = 0; l < questions[j].options.length; l++)
                    {
                        if (choice === questions[j].options[l])
                            responseTotals[j][l] += 1;
                    }
                }
            }
        }
        console.log(responseTotals);

        this.setState({
            dropBoxQuestionArray: dropBoxQuestionArray,
            dropBoxOptionsArrays: dropBoxOptionsArrays,
            currentDropBoxOptions: dropBoxOptionsArrays[0],
            questions: questions,
            responses: responses,
            responseTotals: responseTotals
        });
    }

    //Response now come in with the survey
    //retrieveResponses(responses){
    //    console.log(responses);
    //    this.setState({responses: responses});
    //}

    createCSVData(questions, responses){
        var finalArray = [];

        //Create the first row which is name followed by each question
        var row1 = ['Name'];
        for (var i = 0; i < questions.length; i++)
        {
            var count = 1;
            row1.push(questions[i].question);
        }
        finalArray.push(row1);

        //Now push a new row for each user
        for (var i = 0; i < responses.length; i++)
        {
            var row = [];
            row.push(responses[i].userName);

            //Go through each response
            for (var j = 0; j < responses[i].responses.length; j++)
            {
                var responseString = responses[i].responses[j][0];
                //if the question has multiple responses, append them to string with commas
                if (questions[j].type === 'select' && questions[j].restrictions === 'multiple')
                {
                    for (var k = 1; k < responses[i].responses[j].length; k++)
                    {
                        responseString += (', ' + responses[i].responses[j][k]);
                    }
                }
                row.push(responseString);
            }

            finalArray.push(row);
        }

        this.setState({csvData: finalArray});
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
            <div>
                {this.generateAccordions()}
            </div>
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
                        <Divider/>
                        <h>
                            {this.state.responses[index].userName}
                        </h>
                        {this.generateRespones(index)}
                    </div>
                );
            }
            else if (this.state.filterByResponse === -1)
            {
                if ((typeof this.state.responses[index].responses[this.state.filterByResponseTo][0]) === 'undefined')
                {
                    return(<div/>);
                }
                else
                {
                    return(
                        <div>
                            <Divider/>
                            <h>
                                {this.state.responses[index].userName}
                            </h>
                            {this.generateRespones(index)}
                        </div>
                    )
                }
            }
            else if (this.state.responses[index].responses[this.state.filterByResponseTo].includes(this.state.questions[this.state.filterByResponseTo].options[this.state.filterByResponse]))
            {
                return(
                    <div>
                        <Divider/>
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

                var responseString = this.state.responses[index].responses[questionIndex][0];
                if (this.state.questions[questionIndex].restrictions === 'multiple')
                {
                    for (var i = 1; i < this.state.responses[index].responses[questionIndex].length; i++)
                    {
                        responseString += (', ' + this.state.responses[index].responses[questionIndex][i]);   
                    }
                }
                return(
                    <Card className="responsecard" fluid>
                        <Card.Content>
                            <Card.Header>
                                {questionIndex + 1}. {this.state.questions[questionIndex].question}
                            </Card.Header>
                        <div/>
                        <label>{responseString}</label>
                        </Card.Content>
                    </Card>
                )
            })
        }
        else
        {
            responseOutput = this.state.questions.map((question) => {
                questionIndex++;

                var responseString = this.state.responses[index].responses[questionIndex][0];
                if (this.state.questions[questionIndex].restrictions === 'multiple')
                {
                    for (var i = 1; i < this.state.responses[index].responses[questionIndex].length; i++)
                    {
                        responseString += (', ' + this.state.responses[index].responses[questionIndex][i]);   
                    }
                }
                if (this.state.filterByQuestions.includes(questionIndex))
                {
                    return(
                        <Card className="responsecard" fluid>
                            <Card.Content>
                                <Card.Header>
                                    {questionIndex + 1}. {this.state.questions[questionIndex].question}
                                </Card.Header>
                            <div/>
                            <label>{responseString}</label>
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

    showOverall(){
        return(
            <div>
                {this.generateSummaries()}
            </div>
        )
    }

    generateSummaries(){
        var index = -1;
        var questionSummaries = this.state.questions.map((question) => {
            index++;
            if (question.type === 'free')
            {
                if (question.restrictions === 'numeric')
                    return this.renderSummaryFreeNumeric(index);
                return this.renderSummaryFree(index);
            }
            //select and scale are similar enough to use the same function
            return this.renderSummarySelect(index);
        })
        return questionSummaries;
    }

    renderSummaryFree(index){
        return(
            <Card className="responsecard" fluid>
                <Card.Content>
                    <Card.Header>
                        {index + 1}. {this.state.questions[index].question}
                    </Card.Header>
                    <div/>
                    <label>Total Responses: {this.state.responseTotals[index][0]}</label>
                </Card.Content>
            </Card>
        )
    }

    renderSummaryFreeNumeric(index){
        return(
            <Card className="responsecard" fluid>
                <Card.Content>
                    <Card.Header>
                        {index + 1}. {this.state.questions[index].question}
                    </Card.Header>
                    <div/>
                    <label>Total Responses: {this.state.responseTotals[index][0]}</label>
                    <div/>
                    <label>Average: {this.state.responseTotals[index][2]}</label>
                </Card.Content>
            </Card>
        )
    }

    renderSummarySelect(index){
        var optionIndex = -1;
        var options = this.state.questions[index].options.map((option) => {
            optionIndex++;
            return(
                <div>
                    <label>{option}: {this.state.responseTotals[index][optionIndex]}</label>
                </div>
            )
        })
        return(
            <Card className="responsecard" fluid>
                <Card.Content>
                    <Card.Header>
                        {index + 1}. {this.state.questions[index].question}
                    </Card.Header>
                    <div/>
                    {options}
                </Card.Content>
            </Card>
        )
    }

    /*renderSummaryScale(index){
        return(
            <Card className="responsecard" fluid>
                <Card.Content>
                    <Card.Header>
                        {index + 1}. {this.state.questions[index].question}
                    </Card.Header>
                    <div/>
                    <label>Total Responses: {this.state.responseTotals[index][0]}</label>
                </Card.Content>
            </Card>
        )
    }*/

    render(){
        return(
            <div>
            <link href="https://fonts.googleapis.com/css?family=Bowlby+One+SC|Lato|Lobster" rel="stylesheet" />
            <Navbar/>
            <div className='container'>
                <div className='card card-1 text-md-center'>
                    {this.showSelection()}
                    <CSVLink data={this.state.csvData} >Download responses as csv</CSVLink>
                    <label>Total Responses: {this.state.responses.length}</label>
                    <Tab panes={this.panes}>
                    </Tab>
                </div>
            </div>
            </div>
        );
    }
}

export default SurveyResponse;