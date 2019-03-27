import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import classroomService from '../../services/classroom-service';
import { Button, Modal, FormControl, InputGroup } from 'react-bootstrap';

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
}}

class AddStudent extends Component {
  state = {
    students: [],
    user: {
      email:''
    },
    errors: {
      email: validations.email(),
    },
    touch: {}
  }

  handleChange = (event) => {

    const { name, value } = event.target;

    this.setState({ 
      user: {
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

  getStudent = (event) => {
    event.preventDefault();

    const userDate = { ...this.state.user.email}
    classroomService.searchUserEmail()
    console.log("hola", this.state.user.email)
  }

  addListStudents = (event) => {
    event.preventDefault();
    
    const classroomData = {
      ...this.state.classroom
    }
    classroomService.editClassroom(classroomData)
    //.then(this.props.fetchClassrooms)
    .then(this.setState({ show: false }))
  }


  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }


  render() {
    const { errors, students, user } = this.state
    
    return(
      <>
        <Button variant="outline-info ml-3" onClick={this.handleShow}>
          +
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add News Students</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Student email..."
                name="email" 
                value={user.email}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
              />
              
              {/* <div className="invalid-feedback">{errors.email}</div> */}
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.getStudent}>+ Add</Button>
              </InputGroup.Append>
            </InputGroup>
            <ul>
              <li> Nombre y mail del alumno</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onSubmit={this.addListStudents} >
              Save students
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default withAuthConsumer(AddStudent);