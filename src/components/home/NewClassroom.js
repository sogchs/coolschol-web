import React, { Component } from 'react';
import classroomService from '../../services/classroom-service'
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Modal, Button } from 'react-bootstrap';

const validations = { title: (value) => value.length > 0 && value.length < 20}
class NewClassroom extends Component {
  
  state = {
    classroom: {
      title: ''
    },
    errors: {
      title: true
    },
    touch: {},
    show: false
  }

  handleChange = (event) => {

    const { name, value } = event.target;

    this.setState({ 
      classroom: {
        ...this.state.classroom,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleBLur = (event) => {
    const { name } = event.target;
  
    this.setState({
      ...this.state.touch,
      [name]: true
    })
  }

  createClassroom = (event) => {
    event.preventDefault();
    
    const classroomData = {
      ...this.state.classroom,
      teachers: this.props.user.id
    }
    classroomService.createClassroom(classroomData)
    .then(this.props.fetchClassrooms)
    .then(this.handleClose())
  }

  handleClose = () => {this.setState({ show: false,
    classroom: {
      title: ''
    },
    errors: {
      title: true
    } });}

  handleShow = () => {this.setState({ show: true });}

  render() {
    const { classroom, touch, errors, show } = this.state;

    
    return(
      <div>
          <Button variant="outline-info new-classroom-btn" onClick={this.handleShow}>+ New Classroom</Button>

          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <div className="header-newclassroom">
                <Modal.Title className="title-newclassroom">Create a new Classroom</Modal.Title>
                <img className="coolito-newclassroom" src="https://res.cloudinary.com/dkgr9dg9n/image/upload/v1553675522/coolSchool/web/coolito1.png" alt="coolito-newclassroom" />
              </div>
              
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.createClassroom}>
                <div className="form-group">
                  <label htmlFor="nameClass">Classroom name</label>
                  <input type="text" 
                    className={`form-control form-control-sm ${touch.title ? (errors.title ? 'is-invalid' : 'is-valid') : ''}`} 
                    id="nameClass" 
                    placeholder="Ex. 5º Mathematics"
                    value={classroom.title} 
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    name="title"
                    autoComplete="off"
                    />
                </div>
              </form>
            </Modal.Body>
              <Modal.Footer>
                <Button variant="info" onClick={this.createClassroom}>Create</Button>
              </Modal.Footer>
          </Modal>
      </div>
    )
  }
}

export default withAuthConsumer(NewClassroom) ;