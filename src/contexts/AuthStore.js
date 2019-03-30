import React, { Component } from 'react';

const CURRENT_USER_KEY = 'current-user';
const CURRENT_CLASSROOM_KEY = 'current-classroom';
const AuthContext = React.createContext();

class AuthStore extends Component {

  state = {
    user: JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || '{}'),
    classroom: JSON.parse(localStorage.getItem(CURRENT_CLASSROOM_KEY) || '{}')
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
    this.setState({ 
      ...this.state,
      classroom: classroom });
    
      if(classroom && classroom.id){
        localStorage.setItem(CURRENT_CLASSROOM_KEY, JSON.stringify(classroom))
      } else {
        localStorage.removeItem(CURRENT_CLASSROOM_KEY)
      }
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