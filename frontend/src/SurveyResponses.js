import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Accordion, Dropdown, Grid} from 'semantic-ui-react';

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
            filterByResponseTo: -1,
            filterByResponse: -1,

            surveyId: this.props.match.params.surveyId, 
            postId: this.props.match.params.fromPostId,
        }
    }

    componentDidMount() {
        //I'll need the survey and the responses so that I can see questions and all possible answers
        this.retrieveSurvey();
        //this.retrieveResponses();
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
        })
    }

    retrieveResponses(){
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/surveys/${this.state.surveyId}/responses`, {
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
        });
    }

    showSelection(){
        return(
            <Grid centered celled='internally' columns={3}>
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
        return(
            <label>Temp</label>
        );
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