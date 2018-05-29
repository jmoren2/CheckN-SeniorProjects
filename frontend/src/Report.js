import React from 'react';
import {Link, Redirect, Route} from 'react-router-dom';
import { Dropdown, Button, Input, Container, Header, Form, TextArea, Modal, Image, Card } from 'semantic-ui-react';
import Navbar from './Navbar.js'

class Report extends React.Component{
    constructor(props){
        super(props);

        if(this.props.userObj === null)
        {
            window.location.href = '/login';
            console.log('hello')
        }

        this.state = {
            
            AllUsers: [],
            selectedUser:'',
            selectedUserInfo:[],
            firstName: '',
            lastName: '',
            email:'',
            department:'',
            role: '',
            userId:'',
            posts: [],
            comments: [],
            votes:[],
            postCount: '',
          commentCount: '',
          positiveVotes: 0,
          neutralVotes:0,
          negativeVotes: 0
            
        }

        
        console.log("The user object passed in is: " + JSON.stringify(this.props.userObj));
    
    }


    heandlSearchUser = (event, data) =>
    {
        
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/users?namesearch=${data.value}`, {
                headers: {
                    'content-type': 'application/json'
                },
                method: 'GET',
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)

            if(data.statusCode === 500)
            {
                this.setState({
                    AllUsers: []
                })
                console.log('No User')
            }
            else{
                var x = document.getElementById("allUsers")
                x.hidden = false;
                var length = null;
                if(data.users.length !== 0)
                {
                    length = data.users.length;
                }
                else
                {
                    length = 0;
                }
                var users = []
                for(var i=0; i < data.users.length; ++i)
                {
    
                    users.push({
                        key: data.users[i].email,
                        value: data.users[i].email,
                        text:  data.users[i].firstName + " " + data.users[i].lastName
                    })
                }
                this.setState({
                    AllUsers: users
                })
            
            }
             
        })
    
    
    }

    handleUserChange = (event, data) =>
    {
       
            this.setState({
                selectedUser: data.value
            }, function(){
                this.getUserInfo();
            })
    }

    getUserInfo = () =>
    {
        fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/users?email=${this.state.selectedUser}`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET',
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log("suer")
                console.log(data.users[0]) 
                this.setState({
                    selectedUserInfo: data.users[0],
                    firstName: data.users[0].firstName,
                    lastName: data.users[0].lastName,
                    userId:data.users[0].userId,
                    email:data.users[0].email,
                    department:data.users[0].userPermissions[0].department,
                    role:data.users[0].userPermissions[0].role,
                    votes: data.users[0].votes,
                    posts: data.users[0].posts,
                    comments: data.users[0].comments,
                    
                })

            })
    }

    

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    getUserReport = () =>
    {
        //alert(this.state.selectedUser)
               
    fetch(`https://wjnoc9sykb.execute-api.us-west-2.amazonaws.com/dev/reports/users/${this.state.userId}`, {
        headers: {
            'content-type': 'application/json'
             },
        method: 'GET',
    })
    .then(response => {
        return response.json();
    })
    .then(data =>{
        //alert(JSON.stringify(data));

      this.setState({
          postCount: data.report.postCount,
          commentCount: data.report.commentCount,
          positiveVotes: data.report.positiveVotes,
          neutralVotes: data.report.neutralVotes,
          negativeVotes: data.report.negativeVotes
      }, function(){
                    
        document.getElementById("metrics").hidden = false;
                })      
    })
    }

    


    render(){ 
        console.log(this.state.posts)
        return(
            <div>
                <link href="https://fonts.googleapis.com/css?family=Bowlby+One+SC|Lato|Lobster" rel="stylesheet" />
                <Navbar searchMethod={this.handleSearch}/>
                <div className="container">
                
                    <div className=''>
                        <div className='card card-1  text-md-center'>
                            <div className='card-body text-center'>
                                <h2 style={{color: 'black'}} id="pageTitle">Users Report</h2>

                                <Input id="searchUser"  placeholder='Search User...' onChange={this.heandlSearchUser} /> <br/>

                                <Dropdown id="allUsers" selection options={this.state.AllUsers} hidden onChange={this.handleUserChange}  />

                                <Button standard  id="runUserReport" onClick={this.getUserReport}>Run</Button> <br />
                                
                                <div id="metrics" hidden>
                                <br />
                                <Card id="metricsCard">
                                    <Card.Header>
                                        <h3>
                                            {this.state.firstName + " " + this.state.lastName + " Report"}
                                        </h3>
                                    </Card.Header>
                                    <Card.Description>
                                        Posts: {this.state.postCount} <br/>
                                        Comments: {this.state.commentCount} <br/>
                                        Up Votes: {this.state.positiveVotes} <br/>
                                        Neutral Votes: {this.state.neutralVotes} <br/>
                                        Down Votes: {this.state.negativeVotes} <br/>
                                       

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

export default Report;