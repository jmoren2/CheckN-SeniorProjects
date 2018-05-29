import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import FaBeer from 'react-icons/lib/fa/search';
import {Link} from 'react-router-dom';

import logo from './images/checknlogo.png';
import Home from 'react-icons/lib/fa/home';
import SignOut from 'react-icons/lib/fa/sign-out';
import Create from 'react-icons/lib/fa/plus';
import About from 'react-icons/lib/fa/info-circle';
import Profile from 'react-icons/lib/fa/group';
import Check from 'react-icons/lib/fa/check';
import Notification from 'react-icons/lib/fa/envelope';
import Admin from 'react-icons/lib/fa/lock';



class Navbar extends React.Component {
  constructor(props){
    super(props);

    var hidden = false;
    if (typeof props.searchMethod === 'undefined')
      hidden = true;

    this.state = {
      searchHidden: hidden,
    }

  }
  generateSearch = (e) => {
    e.preventDefault();     //Stops the page from reloading

    //Take everything from the form and package it in an object
    var fields = {
      words: document.getElementById("searchBox").value
    }
    
    this.props.searchMethod(fields);    //This is a reference to the handleSearch method from FeedPage
  }
  
    render () {

      function openNav() {
        document.getElementById("mySidenav").style.width = "400px";
    }
    
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
        return (
            <div className="">

  <div id="mySidenav" className="sidenav">
      <a href="javascript:void(0)" className="closebtn"  onClick={closeNav}>&times;</a>
      <Link to="/feed">
      <Home /> 	&nbsp;
      Home
      </Link>
      <Link to="/about">
      <About /> 	&nbsp;
      About
      </Link>
      <Link to="/create">
      <Create /> 	&nbsp;
      Create Post
      </Link>
      <Link to="/admin">
      <Admin />	&nbsp;
      Admin Controls</Link>
      <Link to="/logout">
      <SignOut />	&nbsp;
      Logout</Link>
</div>


{/* <span style={{fontSize:30,cursor:'pointer' }} onClick={openNav}> &#9776; open</span> */}

  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" style={{cursor:'pointer' }} onClick={openNav}>&#9776;</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" id="navTitle" href="/feed"> CheckN</a>
        </li>
        <li className="nav-item active">
          <img height="35" width="35" src={logo} />
        </li>
      </ul>
      <span className="navbar-text">
          <form className="form-inline" onSubmit={this.generateSearch}>
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="searchBox" hidden={this.state.searchHidden}></input>
              <button className="btn btn-default" type="submit" hidden={this.state.searchHidden}>
                <FaBeer /> 
              </button>
          </form>
      </span>
    </div>
  </nav>
            </div>
        )
    }
}

export default Navbar;
