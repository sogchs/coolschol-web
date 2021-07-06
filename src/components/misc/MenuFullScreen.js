import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import authService from '../../services/auth-service';
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Dropdown, DropdownButton } from 'react-bootstrap';





class MenuFullScreen extends Component {

  state = {
    
  }

  handleLogout = () => {
    authService.logout()
      .then( () => {
        this.props.onUserChanged({})
        this.props.history.push('/login')
      })
  }
  
  
  

  render() {

    return(
    <>
    {this.props.back !== false &&
    <div className="nav-container">
      <Link to="/calendar" onClick={() => this.setState({ openLeft: false })}><span className="icon-calendario"></span></Link>
      <Link to="/board" onClick={() => this.setState({ openLeft: false })}><span className="icon-tablon"></span></Link>
      <Link to="/chat" onClick={() => this.setState({ openLeft: false })}><span className="icon-conversation"></span></Link>
      {this.props.user.role === "teacher" &&
      <>
      <Link to="/groups" onClick={() => this.setState({ openLeft: false })}><span className="icon-grupos"></span></Link>
      <Link to="/timer" onClick={() => this.setState({ openLeft: false })}><span className="icon-temporizador"></span></Link>
      </>}
      <DropdownButton title={<span className="icon-ajustes"></span>} alignRight id="dropdown-menu-align-right">
        <div className="container-drop-set">
          {this.props.user.role === "teacher" &&
          <Link className="btn-set-dropdown" to="/classroom-edit" onClick={() => this.setState({ openLeft: false })}><span className="icon-set-classroom"></span></Link>}
          <Link className="btn-set-dropdown" to="/profile" onClick={() => this.setState({ openLeft: false })}><span className="icon-set-profile"></span></Link>
          <span  className="text-info btn-logout-menu btn-set-dropdown" onClick={() => this.handleLogout()}><span className="icon-log-out"></span></span>
        </div>
      </DropdownButton>
    </div>
    }
           
    </>
    )
  }
}

export default withAuthConsumer(withRouter(MenuFullScreen)) ;
