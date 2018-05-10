import React from 'react';
import {Link} from 'react-router-dom';
//import {DropdownButton, MenuItem} from 'react-bootstrap';
import {Dropdown} from 'semantic-ui-react';

/*
A Question is a single question on the interface for creating surveys
It allows the user to customize questions
One important thing that is going on here is when creating a question I use
<Question object={genericQuestionObject}>
When genericQuestionObject is created in the parent (createPost in this case) I can write to it 
from the Question object directly through this.props.object.(aVariable)
In this way I am always updating CreatePost with the question objects
*/
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
    //This will probably be deleted, I was testing something with this but now objects are saved directly to parent
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

    //Based on the type of question changes what shows up for the answer section
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

    //This is what is displayed when short answer is selected
    renderShort(){
        console.log("renderShort");
        return(
        <div>
            <label>Response to this question will be short answer</label>
        </div>
        );
    }

    //This is what is displayed when select answer is selected
    renderSelect = () => {
        //map all elements in this.state.answers onto how i'm displaying them
        //Then display a button that will add another
        //each line will have a textbox
        //the button will add another empty string to this.state.answers then render will show another empty box
        console.log("renderSelect: " + this.state.answers + 'end');
        var i = 0;
        var formatAnswers = this.state.answers.map((answer) => {
            i++
            return(
            <div>
            <span>
                <label>{i}: </label>
                <input id={i-1} onChange={this.updateAnswer} value={/*answer.text*/this.state.answers[i-1]}/>
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

    updateAnswer = (event) =>{
        console.log("answer updated");
        console.log(this.state.answers);
        var temp = this.state.answers;
        console.log(temp);
        console.log(event.target.value);
        console.log(event.target.id);
        temp[event.target.id] = event.target.value;
        this.setState({answers: temp});
    }

    //This is called from the select answer interface to add another answer
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

    //Renders what user will see when creating a scaled question
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

    //just a bunch of if/else to link types to their restrictions
    updateRestrictionsForType = (type) => {
        if (type === 'short')
            this.currentRestrictions = this.shortRestrictions;
        else if (type === 'select')
            this.currentRestrictions = this.selectRestrictions;
        else
            this.currentRestrictions = this.emptyRestrictions;
    }

    //updates this.state.restrictions
    onRestrictionsChange = (event, data) => {
        console.log("changed restrictions");
        this.setState({
            restrictions: data.value
        });
        this.props.object.restrictions = data.value;
    }

    //updates this.state.question
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