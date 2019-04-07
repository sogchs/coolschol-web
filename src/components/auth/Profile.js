import React, { Component } from 'react';
import authService from '../../services/auth-service';
import { withAuthConsumer } from '../../contexts/AuthStore';
import imagesAvatar from '../../data/imagesAvatar';



const avatar = Object.values(imagesAvatar)

const validations = {
  name: (value) => {
    let message;
    if(!value){
      message = 'Name is required'
    }
    return message;
  },
  surname: (value) => {
    let message;
    if(!value){
      message = 'Surname is required'
    }
    return message;
  }
}

class Profile extends Component {
  state = {
    user: {
      name: this.props.user.name,
      surname: this.props.user.name,
      imageURL: this.props.user.imageURL
    },
    errors: {
      name: validations.name(),
      surname: validations.surname()
    },
    touch: {}
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
    
  }

  handleSelectImage = (img) => {
    
    this.setState({
      user: {
        ...this.state.user,
        imageURL: img
      }
    })
  }


  render(){
    const { user, errors, touch } = this.state;

    return(
      <div className="login shadow-sm">
        <div className="login-body">
          <p>Hi {user.name}, you can change your profile information except your email</p>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="nameRegister">Name</label>
                <input type="text" 
                  className={`form-control ${touch.name && errors.name && 'is-invalid'}`} 
                  id="nameRegister" 
                  name="name"
                  placeholder="Name..."
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={user.name}
                  />
                  <div className="invalid-feedback">{errors.name}</div>
              </div>
              <div className="form-group">
                <label htmlFor="surnameRegister">Surname</label>
                <input type="text"
                  className={`form-control ${touch.surname && errors.surname && 'is-invalid'}`} 
                  id="surnameRegister" 
                  name="surname"
                  placeholder="Surname..."
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={user.surname}
                  />
                  <div className="invalid-feedback">{errors.surname}</div>
              </div>
              <p>Meter aqui el img de origen y un collapse</p>
              <div className="row p-2">
                {avatar.map((img, index) => 
                <div key={index} 
                  onClick={() => this.handleSelectImage(img)}
                  className={`student 
                    ${user.imageURL.includes(img) && 'student-selected'}`}
                  >
                  <img src={img} alt="avatar" className="image-profile"/>
                </div>
                )}
              </div>
              
              

              
                <button type="submit" className="btn btn-info w-100 mt-3">Save changes</button>
            </form>
            
        </div>
      </div>
    )
  }
}

export default withAuthConsumer(Profile);