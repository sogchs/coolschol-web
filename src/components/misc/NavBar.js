import React, { Component } from 'react';
import logoCoolSchool from '../../logo-coolSchool.svg'
import { Link, withRouter } from 'react-router-dom'
import { withAuthConsumer } from '../../contexts/AuthStore';
import MenuSmartPhone from './MenuSmartPhone';
import MenuFullScreen from './MenuFullScreen';
class NavBar extends Component {

  render() {
    const { pathname } = this.props.history.location;

    if ( pathname === '/' || pathname === '/login' || pathname === '/register') {
      return null;
    } else {
    return(
      
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
        <img className="logo" src={logoCoolSchool} alt="Logo coolSchool"/>
        <div className="d-flex align-items-center container-nav-full">
          {this.props.back !== false &&
          <div>
            <Link to="/home"><span className="fas fa-arrow-left mr-2 text-secondary"></span></Link>
            {this.props.user.role === "teacher" &&
            <Link className="navbar-text mr-3" to="/classroom">{this.props.classroom.title}</Link>}
            {this.props.user.role === "student" &&
            <Link className="navbar-text mr-3" to="/main">{this.props.classroom.title}</Link>}
          </div>
          }
          <MenuSmartPhone back={this.props.back}/>
          <MenuFullScreen back={this.props.back}/>
        </div>
      </nav>
    )}
  }
}

export default withAuthConsumer(withRouter(NavBar))  ;
