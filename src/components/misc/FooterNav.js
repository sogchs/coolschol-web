import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import authService from '../../services/auth-service';
import { withAuthConsumer } from '../../contexts/AuthStore';

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
        <button className="btn-nav-footer">
          <span className="icon-home-chip"></span>
        </button>

        {/* <!-- Dropup Apps --> */}
        <div className="btn-group dropup">
          <button type="button" className="btn-nav-footer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="icon-apps"></span>
          </button>
          <div className="dropdown-menu">
              <button className="btn-nav-footer-v">
                <span className="icon-conversation"></span>
              </button>
              <button className="btn-nav-footer-v">
                <span className="icon-tablon"></span>
              </button>
              <button className="btn-nav-footer-v">
                <span className="icon-calendario"></span>
              </button>
              <button className="btn-nav-footer-v">
                <span className="icon-grupos"></span>
              </button>
              <button className="btn-nav-footer-v">
                <span className="icon-sonometro"></span>
              </button>
              <button className="btn-nav-footer-v">
                  <span className="icon-temporizador"></span>
              </button>
          </div>
        </div>

        {/* <!-- Dropup Settings --> */}
        <div className="btn-group dropup">
          <button type="button" className="btn-nav-footer" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="icon-ajustes"></span>
          </button>
          <div className="dropdown-menu setting-btn">
            <button className="btn-nav-footer-v">
              <span className="icon-set-classroom"></span>
            </button>
            <button className="btn-nav-footer-v">
              <span className="icon-set-profile"></span>
            </button>
            <button className="btn-nav-footer-v" onClick={this.handleLogout}>
              <span className="icon-log-out"></span>
            </button> 
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(withAuthConsumer(FooterNav)) ;