import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import authService from '../../services/auth-service';
import { withAuthConsumer } from '../../contexts/AuthStore';
import Drawer from 'react-motion-drawer';




class MenuSmartPhone extends Component {

  state = {
    openLeft: false,
    width:100,
    drawerStyle: `
    {
      "background": "#F9F9F9",
      "boxShadow": "rgba(0, 0, 0, 0.188235) 0px 10px 20px, rgba(0, 0, 0, 0.227451) 0px 6px 6px"
    }`
  }

  handleLogout = () => {
    authService.logout()
      .then( () => {
        this.props.onUserChanged({})
        this.props.history.push('/login')
      })
  }
  
  
  

  render() {
    const {openLeft, drawerStyle: stringDrawerStyle} = this.state;

    let drawerStyle = {}
    try {
      drawerStyle = JSON.parse(stringDrawerStyle)
    } catch (err) {
      console.error('Error parsing JSON: ', err)
    }

    const drawerProps = {overlayColor: "rgba(255,255,255,0.6)",
      drawerStyle
    };


    return(
    <>
    {this.props.back !== false &&
      <div>
        <span className="menu-generalBtn"onClick={() =>this.setState({ openLeft: !openLeft })}><span className="icon-home-chip"></span></span>
        <div className="container-menu">
          <Drawer
            right
            {...drawerProps}
            width={this.state.width}
            fadeOut
            open={openLeft}
            onChange={open => this.setState({ openLeft: open })}
          >
            <div className="menu-container mt-5">
              <h3 className="title-menu">APPS</h3>
              <div className="menu-apps">
                <Link to="/calendar" onClick={() => this.setState({ openLeft: false })}><span className="icon-calendario"></span></Link>
                <Link to="/board" onClick={() => this.setState({ openLeft: false })}><span className="icon-tablon"></span></Link>
                <Link to="/chat" onClick={() => this.setState({ openLeft: false })}><span className="icon-conversation"></span></Link>
                <Link to="/groups" onClick={() => this.setState({ openLeft: false })}><span className="icon-grupos"></span></Link>
                <Link to="/timer" onClick={() => this.setState({ openLeft: false })}><span className="icon-temporizador"></span></Link>
              </div>
              <h3 className="title-menu mt-5">SET</h3>
              <div className="menu-apps">
                <Link to="/classroom-edit" onClick={() => this.setState({ openLeft: false })}><span className="icon-set-classroom"></span></Link>
                <Link to="/profile" onClick={() => this.setState({ openLeft: false })}><span className="icon-set-profile"></span></Link>
                <button  className="text-info mt-4" onClick={() => this.handleLogout()}><span className="icon-log-out"></span></button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>}
      {this.props.back === false &&
      <button  className="" onClick={() => this.handleLogout()}><span className="icon-log-out"></span></button>}
    </>
    )
  }
}

export default withAuthConsumer(withRouter(MenuSmartPhone)) ;
