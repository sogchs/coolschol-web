import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logoCoolSchool from '../../logo-coolSchool.svg';
import authService from '../../services/auth-service'
import { withAuthConsumer } from '../../contexts/AuthStore';

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validations = {
  email: (value) => {
    let message;
    if(!value){
      message = 'Email is required'
    } 
    else if(!EMAIL_PATTERN.test(value)){
      message = 'Invalid email pattern'
    }
    return message;
  },
  password: (value) => {
    let message;
    if(!value){
      message = 'Password is required'
    }
    return message;
  }
}

class Login extends Component {

  state = {
    user:{
      email: '',
      password: ''
    },
    errors: {
      email: validations.email(),
      password: validations.password()
    },
    touch: {},
    isAuthenticated: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
      touch: { ...this.state.touch, [name]: true }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.isValid()){
      authService.login(this.state.user)
        .then( (user) => {
          this.setState({ isAuthenticated: true}, () => {
            this.props.onUserChanged(user)
          })
        },
        (error) => {
          const { message, errors } = error.response.data;
          this.setState({
            errors: {
              ...errors, password: !errors && message
            },
            touch: {
              ...errors, password: !errors && message
            }
          })
        }
        )
      }
    }

  isValid = () => {
    return !Object.keys(this.state.user)
    .some(attr => this.state.errors[attr])
  }


  render(){
    const { user, errors, touch, isAuthenticated } = this.state

    if (isAuthenticated){
      return (<Redirect to='./home' />)
    }
    return(
      <>
      <img className="coolito-login" src="https://res.cloudinary.com/dkgr9dg9n/image/upload/v1553675522/coolSchool/web/coolito6.png" alt=""/>
      <div className="login shadow-sm">
      
        <div className="login-body">
          <img className="w-75 mx-auto my-3" src={logoCoolSchool} alt=""/>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="emailLogin">Email</label>
              <input type="email" 
                className={`form-control ${touch.email && errors.email && 'is-invalid'}`}
                name="email"
                id="emailLogin" 
                placeholder="Email"
                onChange={this.handleChange}
                value={user.email}
                onBlur={this.handleBlur}
                autoComplete="off"
                />
              <div className="invalid-feedback">{errors.email}</div>
            </div>
            <div className="form-group">
              <label htmlFor="passwordLogin">Password</label>
              <input type="password" 
                className={`form-control ${touch.password && errors.password && 'is-invalid'}`} 
                name="password"
                id="passwordLogin" 
                placeholder="Password"
                onChange={this.handleChange}
                value={user.password}
                onBlur={this.handleBlur}
                autoComplete="off"
                />
              <div className="invalid-feedback">{errors.password}</div>
            </div>
            <button type="submit" className="btn btn-info w-100" disabled={!this.isValid()}>Login</button>
          </form>
          <p className="mx-auto mt-4">If you don´t have an account <Link to='/register'> REGISTER </Link></p>
        </div>
      </div>
      </>
    )
  }
}

export default withAuthConsumer(Login);