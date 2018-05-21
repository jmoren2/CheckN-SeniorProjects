import React from 'react';
import {Link, Redirect, Route} from 'react-router-dom';
import { Dropdown, Button, Input, Container, Header, Form, TextArea, Modal, Image, Card } from 'semantic-ui-react';
import Navbar from './Navbar.js'


class DepartmentReport extends React.Component{
    constructor(props){
        super(props);

        if(this.props.userObj === null)
        {
            window.location.href = '/login';
            console.log('hello')
        }

        this.state = {
            allDepartments: [],
            selectedDepartment: ''
        }

        
        console.log("The user object passed in is: " + props.userObj);
    
    }

    getAllDepartments = () =>
    {

    fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/departments`, {
        headers: {
            'content-type': 'application/json'
             },
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .then(data =>
        {
        console.log(data)

        if(data.statusCode === 500)
        {
            this.setState({
                allDepartments: []
            })
            console.log('No Departments')
        }
        else{
            var length = null;
            if(data.departments.length !== 0)
            {
                length = data.departments.length;
            }
            else
            {
                length = 0;
            }
            var departments = []
            for(var i=0; i < data.departments.length; ++i)
            {

                departments.push({
                    key: data.departments[i],
                    value: data.departments[i],
                    text:  data.departments[i]
                })
            }
            this.setState({
                allDepartments: departments
            }, function(){

                document.getElementById("metrics").hidden = false;
            })
            
        }
    })
}


    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    


    render(){ 
        return(
            <div>
            
                <Navbar searchMethod={this.handleSearch}/>
                <div className="container">
                
                    <div className=''>
                        <div className='card card-1  text-md-center'>
                            <div className='card-body text-center'>
                                <h2 style={{color: 'black'}}>Department Report</h2>

                                <Dropdown id="allDepartments" name="selectedDepartment" label="All Departments" selection onFocus={this.getAllDepartments} options={this.state.allDepartments} onChange={this.handleChange} />


                                <div id="metrics" hidden>
                                        <Card>
                                            <Card.Header>
                                                <h3>

                                                {this.state.selectedDepartment + " " + " Report"}
                                                </h3>
                                            </Card.Header>
                                            <Card.Description>
                                                {/* Posts: {this.state.posts.length} <br/>
                                                Comments: {this.state.comments.length} <br/>
                                                Total Votes: {this.state.votes.length} <br/>
                                                Up Votes: {this.state.votes.length} <br/>
                                                Neutral Votes: {this.state.votes.length} <br/>
                                                Down Votes: {this.state.votes.length} <br/> */}
                                            

                                            </Card.Description>
                                        </Card>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default DepartmentReport;