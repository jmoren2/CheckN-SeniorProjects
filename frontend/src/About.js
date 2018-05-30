import React from 'react';
import {Link} from 'react-router-dom';
import logo from './images/checknlogo.png';
import clientLogo from './images/nikeCheck.jpg'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Discovery } from 'aws-sdk';
import Navbar from './Navbar.js'

class About extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }

    render(){
        return(
            <div>
            <link href="https://fonts.googleapis.com/css?family=Bowlby+One+SC|Lato|Lobster" rel="stylesheet" />
            <Navbar />
                <div className="container">
                    <div className="row">
                        <div className="card card-1">
                            <div className="col-sm" />
                            <div id="desc" className="col-sm-12"><div className="card-body">
                                <div className="text-center" id="title">About</div><br /><br />
                                <p>CheckN is a platform for sharing ideas, gathering feedback, and solving problems. 
                                Harness the resources you already have, by allowing easy communication inside teams as well as across multiple teams.</p>

                                <p>Create your own custom surveys then analyze the results right on this site, or download your results in an easy to use .csv format</p>

                                <p>Use the admin reporting tools to see where the most activity is being centralized, on a per user or a per department basis.</p>
                                
                                <p>Easily manage users, departments, and roles from the admin console.</p>
                                <br /><br />
                                <div className="text-center" id="details">
                                    Written by Portland State University Capstone A-Team, Winter-Spring 2017-18:
                                    <br />
                                    Kristen Bateson, Mike Blauvelt, Andy Grill, Jinghui Han, 
                                    Jonathan Jensen, Josh Moreno, and Matt Ripley
                                </div> 
                            </div></div>
                        </div>
                    </div>
                </div>
            </div>

        
        );
    }
}

export default About;