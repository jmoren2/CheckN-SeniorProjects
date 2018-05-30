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
            selectedDepartment: '',
            usersByDep:[],
            depPosts:0,
            depComments:0,
            depVotes:0,
            depUpVotes:0,
            depNetVotes:0,
            depDownVotes:0,
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

            
            })
            
        }
    })
}

    getMetrics = () =>
    {
        
                document.getElementById("metrics").hidden = false;
        
    fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/users?dept=${this.state.selectedDepartment}`, {
        headers: {
            'content-type': 'application/json'
             },
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .then(data =>{
            this.setState({
                usersByDep: data.users
            },
        function(){
            this.calculateMetrics()
        })
    })
    }


    calculateMetrics = () =>
    {
        var posts = 0;
        var comments = 0;
        var votes =0;
        var uvotes=0;
        var nvotes =0;
        var dvotes=0;

        for(var i=0; i <this.state.usersByDep.length; ++i)
        {
            console.log(this.state.usersByDep[i])
            if(this.state.usersByDep[i].posts)
            {
                var x = this.state.usersByDep[i].posts.length;

                posts += x;
                //console.log(this.state.usersByDep[i])
                //posts += this.state.usersByDep[i].userPermissions[0].posts.length;
            }
            if(this.state.usersByDep[i].comments)
            {
                var y = this.state.usersByDep[i].comments.length
                comments += y;
                //console.log(this.state.usersByDep[i])
                //comments += this.state.usersByDep[i].userPermissions[0].comments.length;
            }
            if(this.state.usersByDep[i].votes)
            {
                var v = this.state.usersByDep[i].votes.length;
                votes +=v;
                ///votes += this.state.usersByDep[i].userPermissions[0].votes.length;
            }
           
        }

        this.setState({
            depPosts: posts,
            depComments: comments,
            depVotes: votes
        },
    function(){
        alert(JSON.stringify(this.state.usersByDep))
    })
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    


    render(){ 
        return(
            <div>
            
            <link href="https://fonts.googleapis.com/css?family=Bowlby+One+SC|Lato|Lobster" rel="stylesheet" />
            <Navbar searchMethod={this.handleSearch}/>
                <div className="container">
                
                    <div className=''>
                        <div className='card card-1  text-md-center'>
                            <div className='card-body text-center'>
                                <h2 style={{color: 'black'}} id="pageTitle">Department Report</h2>

                                <Dropdown id="allDepartments" name="selectedDepartment" label="All Departments" selection onFocus={this.getAllDepartments} options={this.state.allDepartments} onChange={this.handleChange} />

                                <Button standard  id="run" onClick={this.getMetrics}>Run</Button> <br />
                            

                                <div id="metrics" hidden>
                                    <br />
                                        <Card id="metricsCard">
                                            <Card.Header>
                                                <h3>

                                                {this.state.selectedDepartment + " " + " Report"}
                                                </h3>
                                            </Card.Header>
                                            <Card.Description>
                                                Posts: {this.state.depPosts} <br/>
                                                Comments: {this.state.depComments} <br/>
                                                Total Votes: {this.state.depVotes} <br/>
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