import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import authService from '../../services/auth-service';
import { withAuthConsumer } from '../../contexts/AuthStore';
import { ButtonToolbar, DropdownButton, Dropdown } from 'react-bootstrap';

class FooterNav extends Component {

  handleLogout = () => {
    authService.logout()
      .then( () => {
        this.props.onUserChanged({})
        this.props.history.push('/login')
      })
  }


  render() {

    const { user, isAuthenticated, isAdmin} = this.props;

    return(
      <nav className="nav-footer navbar navbar-dark bg-dark">
      {this.props.apps !== false &&
        <Link className="btn-nav-footer" to="/classroom">
          <span className="icon-home-chip"></span>
        </Link>
      }
      {this.props.apps !== false &&
        <ButtonToolbar>
          <DropdownButton
            drop="up"
            bsPrefix="btn-nav-footer"
            id="dropdown-button-apps"
            key="up"
            title={<span className="icon-apps"></span>}
          >
            <Dropdown.Item eventKey="1" className="btn-nav-footer-v"><span className="icon-conversation"></span></Dropdown.Item>
            <Dropdown.Item eventKey="2" className="btn-nav-footer-v"><span className="icon-tablon"></span></Dropdown.Item>
            <Dropdown.Item eventKey="3" className="btn-nav-footer-v"><span className="icon-calendario"></span></Dropdown.Item>
            <Dropdown.Item eventKey="4" className="btn-nav-footer-v"><span className="icon-grupos"></span></Dropdown.Item>
            <Dropdown.Item eventKey="4" className="btn-nav-footer-v"><span className="icon-sonometro"></span></Dropdown.Item>
            <Dropdown.Item eventKey="4" className="btn-nav-footer-v"><span className="icon-temporizador"></span></Dropdown.Item>
          </DropdownButton>
        </ButtonToolbar>
      }
        <ButtonToolbar>
          <DropdownButton
            drop="up"
            bsPrefix="btn-nav-footer"
            id="dropdown-button-settings"
            key="up"
            title={<span className="icon-ajustes"></span>}
          >
            {this.props.apps !== false &&
            <Dropdown.Item eventKey="1" className="btn-nav-footer-v"><span className="icon-set-classroom"></span></Dropdown.Item>
            }
            <Dropdown.Item eventKey="2" className="btn-nav-footer-v"><span className="icon-set-profile"></span></Dropdown.Item>
            <Dropdown.Item eventKey="3" className="btn-nav-footer-v"><span className="icon-log-out" onClick={this.handleLogout}></span></Dropdown.Item>
          </DropdownButton>
        </ButtonToolbar>

      </nav>
    )
  }
}

export default withRouter(withAuthConsumer(FooterNav)) ;