import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import logoCoolSchool from '../../logo-coolSchool.svg'

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validators = {
  email: (value) => {
    let message;
    if(!value){
      message = 'Email is required'
    } 
    else if(!EMAIL_PATTERN.test(value)){
      message = 'Invalid email patern'
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
      email: validators.email(),
      password: validators.password()
    },
    touch: {},
    isAuthenticated: false
  }

  handleChange = () => {

  }

  handleBlur = () => {

  }

  handleSubmit = () => {

  }

  isValid = () => {

  }


  render(){
    return(
      <div className="login shadow-sm">
        <div className="login-body">
          <img className="w-75 mx-auto my-3" src={logoCoolSchool} alt=""/>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email"/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Contraseña</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Contraseña"/>
            </div>
            <button type="submit" className="btn btn-info w-100">Entrar</button>
          </form>
          <p className="mx-auto mt-4">Si no tienes cuenta <a href=""> REGISTRATE </a>ahora</p>
        </div>
      </div>
    )
  }
}

export default Login;