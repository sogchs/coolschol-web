import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import logoCoolSchool from '../../logo-coolSchool.svg';
import authService from '../../services/auth-service';

const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


const validations = {
  email: (value) => {
    let message;
    if(!value){
      message = 'Email is required'
    }
    else if(!EMAIL_PATTERN.test(value)){
      message = 'Invalid email pattern '
    }
    return message;
  },
  password: (value) => {
    let message;
    if(!value){
      message = 'Password is required'
    }
    return message;
  },
  name: (value) => {
    let message;
    if(!value){
      message = 'Name is required'
    }
    return message;
  },
  role: (value) => {
    let message;
    if(!value){
      message = 'Role is required'
    }
    return message;
  }
}
class Register extends Component {
  state = {
    user: {
      email: '',
      password: '',
      name: '',
      role: {
        teacher: 'Teacher',
        student: 'Student'
      }
    },
    errors: {
      email: validations.email(),
      password: validations.password(),
      name: validations.name(),
      role: validations.role()
    },
    touch: {},
    isRegistered: false
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
      touch: {
        ...this.state.touch,
        [name]: true
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.isValid()){
      authService.register(this.state.user)
        .then( (user) =>  this.setState({ isRegistered: true }),
                (error) => {
                  const { errors, message } = error.response.data;
                  this.setState({
                    errors: {
                      ...errors,
                      email: !errors && message
                    },
                    touch: {
                      ...errors,
                      email: !errors && message
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
    const { user, isRegistered, errors, touch } = this.state;

    if(isRegistered){
      return (<Redirect to='/login'/>)
    }

    return(
      <div className="login shadow-sm">
        <div className="login-body">
            <img className="w-75 mx-auto my-3" src={logoCoolSchool} alt="Logo"/>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="emailRegister">Email</label>
                <input type="email" 
                  className={`form-control ${touch.email && errors.email && 'is-invalid'}`} 
                  id="emailRegister"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={user.email}
                  />
                  <div className="invalid-feedback">{errors.email}</div>
              </div>
              <div className="form-group">
                <label htmlFor="passwordRegister">Contraseña</label>
                <input type="password" 
                  className={`form-control ${touch.password && errors.password && 'is-invalid'}`} 
                  id="passwordRegister"
                  name="password"
                  placeholder="Contraseña"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={user.password}
                  />
                  <div className="invalid-feedback">{errors.password}</div>
              </div>
              <div className="form-group">
                <label htmlFor="nameRegister">Nombre y Apellidos</label>
                <input type="text" 
                  className={`form-control ${touch.name && errors.name && 'is-invalid'}`} 
                  id="nameRegister" 
                  name="name"
                  placeholder="Nombre completo"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={user.name}
                  />
                  <div className="invalid-feedback">{errors.name}</div>
              </div>
              <div className="form-check form-check-inline">
                <input className={`form-check-input ${touch.role && errors.role && 'is-invalid'}`} 
                type="radio" 
                name="role" 
                id="roleRegister" 
                value={user.role.teacher}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                />
                <label className="form-check-label" htmlFor="roleRegister">Profesor</label>
              </div>
              <div className="form-check form-check-inline">
                <input className={`form-check-input ${touch.role && errors.role && 'custom-control-input'}`} 
                  type="radio" 
                  name="role" 
                  id="roleRegister2" 
                  value={user.role.student}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  />
                <label className="form-check-label" htmlFor="roleRegister2">Alumno</label>
                <div className="invalid-feedback">{errors.role}</div>
              </div>
              
                <button type="submit" className="btn btn-info w-100 mt-3">Entrar</button>
            </form>
            <p className="mx-auto mt-4">Si ya tienes cuenta <Link to='/login'> ENTRA </Link>en tu espacio</p>        
        </div>
      </div>
    )
  }
}

export default Register;