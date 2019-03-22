import React, { Component } from 'react';
import logoCoolSchool from './logo-coolSchool.svg'

class NavBar extends Component {

  render() {

    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
      
        <img className="logo" src={logoCoolSchool} alt="Logo coolSchool"/>
        <div>
          <a className="navbar-text" href="#"><i className="fas fa-arrow-left mr-1"></i>  5ªLengua</a>
        </div>
    </nav>
    )
  }
}

export default NavBar;
