import React from 'react';
import {Link, Redirect, Route} from 'react-router-dom';
import { Dropdown, Button, Input, Container, Header } from 'semantic-ui-react';
import Navbar from './Navbar.js'



class Report extends React.Component{
    constructor(props){
        super(props);

        if(this.props.userObj === null)
        {
            window.location.href = '/login';
            console.log('hello')
        }

        
        console.log("The user object passed in is: " + props.userObj);
    
    }


    


    render(){ 

        return(
            <div>
            
                <Navbar searchMethod={this.handleSearch}/>
                <div className="container">
                
                    <div className=''>
                        <div className='card card-1  text-md-center'>
                            <div className='card-body text-center'>
                                <h2 style={{color: 'black'}}>Report Page</h2>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Report;