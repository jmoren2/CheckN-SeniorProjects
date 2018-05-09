import React from 'react';
import {Link} from 'react-router-dom';
//import {DropdownButton, MenuItem} from 'react-bootstrap';
import {Dropdown} from 'semantic-ui-react';

class Question extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            number: props.number,
            question: '',
            type: 'short',
            restrictions: null,
            answers: [],
        }
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
        var formatAnswers = this.state.answers.map((answer) => {
            <div>
            <span>
                <label>1. </label>
                <input value={answer.text}/>
            </span>
            </div>
        });
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
        this.setState({
            type: data.value
        });
    }

    onRestrictionsChange = (event, data) => {
        console.log("changed restrictions");
        this.setState({
            restrictions: data.value
        });
    }

    render() {
        return(
            <div>
                <label>Question</label>
                <span>
                    <label>1: </label>
                    <input placeholder='type question'/>
                </span>
                <div/>
                <span>
                    <div>
                        <label>Type: </label>
                        <Dropdown placeholder='short' onChange={this.onTypeChange} selection options={[{text: 'short', value: 'short'},{text: 'select', value: 'select'}]}/>
                    </div>
                    <div>
                        <label>Restrictions: </label>
                        <Dropdown placeholder='restrictions' onChange={this.onRestrictionsChange} selection options= {[{text: 'numbers only', value: 'numbers only'}, {text: 'none', value: 'none'}]}/>
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