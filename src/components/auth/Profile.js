import React, { Component } from 'react';
import authService from '../../services/auth-service';
import { withAuthConsumer } from '../../contexts/AuthStore';
import imagesAvatar from '../../data/imagesAvatar';
import imagesTeacher from '../../data/imagesTeacher';
import { Button, Collapse } from 'react-bootstrap';




const avatar = Object.values(imagesAvatar) 
const teacherImage = Object.values(imagesTeacher)

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
      surname: this.props.user.surname,
      imageURL: this.props.user.imageURL
    },
    errors: {
      name: validations.name(),
      surname: validations.surname()
    },
    touch: {},
    selector:false
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

    authService.editProfile(this.state.user, this.props.user.id)
    .then(this.handleLogout())
    
  }

  handleLogout = () => {
    authService.logout()
      .then( () => {
        this.props.onUserChanged({})
        this.props.history.push('/login')
      })
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
    const { user, errors, touch, selector } = this.state;
    const name = this.props.user.name
    return(
      <div className="profile shadow-sm">
        <div className="login-body">
          <p>Hi {name}, you can change your profile information except your email</p>
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
                  autoComplete="off"
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
                  autoComplete="off"
                  />
                  <div className="invalid-feedback">{errors.surname}</div>
              </div>

              <div>
                <img src={user.imageURL} alt="profile" className="image-profile"/>
                <Button
                  onClick={() => this.setState({ selector: !selector })}
                  aria-controls="collapse-pay"
                  aria-expanded={selector}
                  variant="outline-secondary"
                >
                  Select other image<i className="fas fa-arrow-down ml-2"></i>
                </Button>
                {this.props.user.role === "student" &&
                <Collapse in={selector}>
                  <div id="collapse-attach">
                    <div className="row p-2">
                      {avatar.map((img, index) => 
                      <div key={index} 
                        onClick={() => this.handleSelectImage(img)}
                        className={`student 
                          ${user.imageURL.includes(img) && 'student-selected'}`}
                        >
                        <img src={img} alt="avatar" className="image-avatar-selector"/>
                      </div>
                      )}
                    </div>
                  </div>
                      </Collapse> }
                
                {this.props.user.role === "teacher" &&
                <Collapse in={selector}>
                  <div id="collapse-attach">
                    <div className="row p-2">
                      {teacherImage.map((img, index) => 
                      <div key={index} 
                        onClick={() => this.handleSelectImage(img)}
                        className={`student 
                          ${user.imageURL.includes(img) && 'student-selected'}`}
                        >
                        <img src={img} alt="avatar" className="image-teacher-selector"/>
                      </div>
                      )}
                    </div>
                  </div>
                      </Collapse> }
              </div>
                
                <button type="submit" className="btn btn-info w-100 mt-3">Save changes</button>
                <small className="mb-0 text-info">For the new changes to take effect, the application will restart, and you need to log in</small>
            </form>
        </div>
      </div>
    )
  }
}

export default withAuthConsumer(Profile);