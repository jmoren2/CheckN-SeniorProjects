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
            number: props.number,
            question: props.object.question,
            type: props.object.type,
            restrictions: props.object.restrictions,
            options: props.object.options,
        }

        //These are all predetermined options for type and restrictions
        //the text field is what the user sees, the value is what will be stored in the database.
        this.types = [
            {text: 'Free Response', value: 'free'},
            {text: 'Select Answer', value: 'select'},
            {text: 'Scale', value: 'scale'},
        ];
        this.freeRestrictions = [
            {text: 'None', value: 'none'},
            {text: 'Short', value: 'short'},
            {text: 'Long', value: 'long'},
            {text: 'Numbers Only', value: 'numeric'}
        ];
        this.selectRestrictions = [
            {text: 'Pick One', value: 'one'},
            {text: 'Pick Multiple', value: 'multiple'}
        ];
        this.scaleRestrictions = [
            {text: 'None', value: 'none'}
        ];
        this.emptyRestrictions = [];
        //This seemed like the easiest way to limit how big the users scale can be while also matching
        //their selection with a number
        this.scaleRange = [
            {text: '2', value: 2}, {text: '3', value: 3}, {text: '4', value: 4}, {text: '5', value: 5},
            {text: '6', value: 6}, {text: '7', value: 7}, {text: '8', value: 8}, {text: '9', value: 9}, 
            {text: '10', value: 10},
        ];

        this.currentRestrictions = this.freeRestrictions;
    }

    //Based on the type of question changes what shows up for the answer section
    answerHandler = () => {
        if (this.state.type === 'free')
        {
            return(this.renderFree());
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

    //This is what is displayed when free answer is selected
    renderFree(){
        return(
        <div>
            <label>Responses to this question will be type by the user</label>
        </div>
        );
    }

    //This is what is displayed when select answer is selected
    renderSelect = () => {
        var i = 0;
        //for each option generates a textbox
        var formatOptions = this.state.options.map((option) => {
            i++
            return(
            <div>
            <span>
                <label>{i}: </label>
                <input id={i-1} onChange={this.updateOption} value={this.state.options[i-1]}/>
            </span>
            </div>
            );
        });
        return(
        <div>
            <label>Choices</label>
            <div/>
            {formatOptions}
            <div/>
            <button type='button' onClick={this.addOption}>Add Option</button>
        </div>
        );
    }

    updateOption = (event) =>{
        var temp = this.state.options;
        temp[event.target.id] = event.target.value;
        this.setState({options: temp});
    }

    //This is called from the select answer interface to add another answer
    addOption = () =>{
        var newArray = this.state.options;
        newArray.push('');
        this.setState({
            options: newArray,
        });
        this.props.object.options = newArray;
    }

    //Renders what user will see when creating a scaled question
    renderScale(){
        var i = -1;
        var formatOptions = this.state.options.map(() => {
            i++;
            return(
                <span>
                    <input id={i} onChange={this.updateOption} value={this.state.options[i]}/>
                </span>
            );
        });
        return(
        <div>
            <label>Total Options</label>
            <Dropdown placeholder='2' onChange={this.onScaleChange} selection options={this.scaleRange}/>
            <div/>
            {formatOptions}
        </div>
        );
    }

    //If the user increases the value it shouldn't delete the old ones
    onScaleChange = (event, data) => {
        var temp = this.state.options;
        if (data.value > temp.length)
        {
            for (var i = temp.length; i < data.value; i++) {
                temp[i] = '';
            } 
        }
        else 
        {
            temp = temp.slice(0, data.value);
        }
        this.setState({
            options: temp
        });
        this.props.object.options = temp;
    }

    //Changing type will just update the state and change which the options array for restrictions
    onTypeChange = (event, data) => {
        if (data.value === this.state.type)
            return;
        
        this.updateRestrictionsForType(data.value);
        this.setState({
            type: data.value
        });
        this.props.object.type = data.value;
    }

    //just a bunch of if/else to link types to their restrictions
    updateRestrictionsForType = (type) => {
        if (type === 'free')
            this.currentRestrictions = this.freeRestrictions;
        else if (type === 'select')
            this.currentRestrictions = this.selectRestrictions;
        else if (type === 'scale')
            this.currentRestrictions = this.scaleRestrictions;
        else
            this.currentRestrictions = this.emptyRestrictions;
    }

    //updates this.state.restrictions
    onRestrictionsChange = (event, data) => {
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
                    <label> {this.state.number}</label>
                    <input value={this.state.question} onChange={this.onQuestionChange} placeholder='Enter question'/>
                </span>
                <div/>
                <span>
                    <div>
                        <label>Type: </label>
                        <Dropdown defaultValue={this.types[0]} placeholder='Select Type' onChange={this.onTypeChange} selection options={this.types}/>
                    </div>
                    <div>
                        <label>Restrictions: </label>
                        <Dropdown defaultValue={this.currentRestrictions[0]} placeholder='Select Restriction' onChange={this.onRestrictionsChange} selection options={this.currentRestrictions}/>
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