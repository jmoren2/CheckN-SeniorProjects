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
            <Navbar />
               <div className="text-center">
                   
                    Written by A-Team Capstone Winter 2018!

                    <div className="text-center">

Kristen Bateson, Mike Blauvelt, Andy Grill, Jinghui Han, 
Jonathan Jensen, Josh Moreno, and Matt Ripley

                    </div>
                   
                </div> 

            </div>

        
        );
    }
}

export default About;