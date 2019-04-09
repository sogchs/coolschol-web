import React, { Component } from 'react';
import logoCoolSchool from '../../logo-coolSchool.svg'
import { Link } from 'react-router-dom'
import { withAuthConsumer } from '../../contexts/AuthStore';
class NavBar extends Component {

  render() {

    return(
      
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
        <img className="logo" src={logoCoolSchool} alt="Logo coolSchool"/>
        <div>
          {this.props.back !== false &&
            <Link className="navbar-text" to="/home"><i className="fas fa-arrow-left mr-1"></i>{this.props.classroom.title}</Link>
          }
        </div>
      </nav>
    )
  }
}

export default withAuthConsumer(NavBar)  ;
