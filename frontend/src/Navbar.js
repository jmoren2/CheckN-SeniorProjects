import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import FaBeer from 'react-icons/lib/fa/search';


class Navbar extends React.Component {
    render () {
        return (
            <div className="">

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">CheckN</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      
      <li class="nav-item active">
        <a class="nav-link" href="/Create">Create Post <span class="sr-only">(current)</span></a>
      </li>

      <li class="nav-item active">
        <a class="nav-link" href="/Feed">Feed<span class="sr-only">(current)</span></a>
      </li>
      
    </ul>
    <span class="navbar-text">
    <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
    <button class="btn btn-default" type="submit">
    <FaBeer /> 
        </button>
  </form>
    </span>
  </div>
</nav>

{/* <nav class="navbar navbar-light bg-light justify-content-between">
  <a class="navbar-brand" href='/'>CheckN</a>
  
  <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
    <button class="btn btn-default" type="submit">
    <FaBeer /> 
        </button>
  </form>
</nav> */}
            </div>
        )
    }
}

export default Navbar;