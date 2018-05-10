import React from 'react';
import {Link} from 'react-router-dom';
//import {DropdownButton, MenuItem} from 'react-bootstrap';
import {Dropdown} from 'semantic-ui-react';

class Question extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            number: props.object.number,
            question: props.object.question,
            type: props.object.type,
            restrictions: props.object.restrictions,
            answers: props.object.answers,
        }

        //These are all predetermined options for type and restrictions
        //the text field is what the user sees, the value is what will be stored in the database.
        this.types = [
            {text: 'Short Response', value: 'short'},
            {text: 'Select Answer', value: 'select'},
            {text: 'Scale', value: 'scale'},
        ];
        this.shortRestrictions = [
            {text: 'None', value: 'none'},
            {text: 'Numbers Only', value: 'numbers only'}
        ];
        this.selectRestrictions = [
            {text: 'Pick One', value: 'pick one'},
            {text: 'Pick Multiple', value: 'pick multiple'}
        ];
        this.emptyRestrictions = []

        this.currentRestrictions = this.shortRestrictions;
    }

    //returns a question object
    getQuestionObject(){
        var questionObject = {
            question: this.state.question,
            answer: {type: this.state.type}
        };

        if (this.state.resitrctions != null)
        {
            questionObject.answer.restrictions = (this.state.restrictions);
        }
        if (this.state.answers.length != 0)
        {
            questionObject.answer.answers = (this.state.answers);
        }

        return questionObject;
    }

    answerHandler = () => {
        console.log("answerHandler");
        if (this.state.type === 'short')
        {
            return(this.renderShort());
        }
        else if (this.state.type === 'select')
        {
            return(this.renderSelect());
        }
        else if (this.state.type === 'scale')
        {
            return(this.renderScale());
        }
        else
        {
            return(<label>No Type Selected</label>);
        }
    }

    //I don't know if it is a good idea to show the user a text box because they might think to put something in it
    renderShort(){
        console.log("renderShort");
        return(
        <div>
            <label>Response to this question will be short answer</label>
        </div>
        );
    }

    renderSelect = () => {
        //map all elements in this.state.answer onto the how i'm displaying them
        //Then display a button that will add another
        //each line will have a textbox
        //the button will add another empty string to this.state.answers so that render will go again
        console.log("renderSelect: " + this.state.answers + 'end');
        var formatAnswers = this.state.answers.map((answer) => {
            return(
            <div>
            <span>
                <label>1. </label>
                <input value={answer.text}/>
            </span>
            </div>
            );
        });
        console.log(formatAnswers);
        return(
        <div>
            <label>Choices</label>
            <div/>
            {formatAnswers}
            <div/>
            <button type='button' onClick={this.addAnswer}>add answer</button>
        </div>
        );
    }

    addAnswer = () =>{
        console.log('adding answer');
        var newArray = this.state.answers;
        newArray.push(' ');
        console.log(newArray);
        this.setState({
            answers: newArray,
        });
        this.props.object.answers = newArray;
    }

    renderScale(){
        return(<div/>);
    }

    //Changing type will just update the state and change which the options array for restrictions
    onTypeChange = (event, data) => {
        console.log('changed type');
        console.log('changed to: ' + data.value);
        if (data.value === this.state.type)
            return;
        
        this.updateRestrictionsForType(data.value);
        this.setState({
            type: data.value
        });
        this.props.object.type = data.value;
        console.log(this.state);
    }

    updateRestrictionsForType = (type) => {
        if (type === 'short')
            this.currentRestrictions = this.shortRestrictions;
        else if (type === 'select')
            this.currentRestrictions = this.selectRestrictions;
        else
            this.currentRestrictions = this.emptyRestrictions;
    }

    onRestrictionsChange = (event, data) => {
        console.log("changed restrictions");
        this.setState({
            restrictions: data.value
        });
        this.props.object.restrictions = data.value;
    }

    onQuestionChange = (event) => {
        this.setState({question: event.target.value});
        this.props.object.question = event.target.value;
    }

    render() {
        return(
            <div>
                <label>Question </label>
                <span>
                    <label>{(this.state.number + 1)}</label>
                    <input value={this.state.question} onChange={this.onQuestionChange} placeholder='Enter question'/>
                </span>
                <div/>
                <span>
                    <div>
                        <label>Type: </label>
                        <Dropdown placeholder='short' onChange={this.onTypeChange} selection options={this.types}/>
                    </div>
                    <div>
                        <label>Restrictions: </label>
                        <Dropdown placeholder='restrictions' onChange={this.onRestrictionsChange} selection options={this.currentRestrictions}/>
                    </div>
                </span>
                <div/>
                <div>
                    {this.answerHandler()}
                </div>
            </div>
        );
    }
}

export default Question;