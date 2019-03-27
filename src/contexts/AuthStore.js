import React, { Component } from 'react';

const CURRENT_USER_KEY = 'current-user';
const AuthContext = React.createContext();

class AuthStore extends Component {

  state = {
    user: JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || '{}'),
    classroom: '{}'
  }

  handleUserChange = (user) => {
    this.setState({
      ...this.state,
      user: user
    });

    if(user && user.email){
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
  }

  handleClassroomChange = (classroom) => {
    console.log({ classroom })
    this.setState({ 
      ...this.state,
      classroom: classroom });
  }

  isAuthenticated = () => this.state.user && this.state.user.email;
  isAdmin = () => this.state.user && this.state.user.role === 'teacher'; //cambiar por teacher

  render(){
    return(
      <AuthContext.Provider value= {{
        user: this.state.user,
        classroom: this.state.classroom,
        onUserChanged: this.handleUserChange,
        isAuthenticated: this.isAuthenticated,
        isAdmin: this.isAdmin,
        onClassroomChanged: this.handleClassroomChange
      }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}


const withAuthConsumer = (Component) => {
  return(props) => (
    <AuthContext.Consumer>
      {(storeProps) => <Component {...props} {...storeProps}/>}
    </AuthContext.Consumer>
  )
}

export { withAuthConsumer, AuthStore, AuthContext}