import React, { Component } from 'react';
import logoCoolSchool from '../../logo-coolSchool.svg'
import { Link } from 'react-router-dom'
import { withAuthConsumer } from '../../contexts/AuthStore';
import MenuSmartPhone from './MenuSmartPhone';
class NavBar extends Component {

  render() {

    return(
      
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
        <img className="logo" src={logoCoolSchool} alt="Logo coolSchool"/>
        <div className="d-flex align-items-center">
          {this.props.back !== false &&
          <div>
            <Link to="/home"><span className="fas fa-arrow-left mr-2 text-secondary"></span></Link>
            <Link className="navbar-text mr-3" to="/classroom">{this.props.classroom.title}</Link>
          </div>
          }
          <MenuSmartPhone back={this.props.back}/>
        </div>
      </nav>
    )
  }
}

export default withAuthConsumer(NavBar)  ;
