import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import classroomService from '../../services/classroom-service';
import { Button, Modal, FormControl, InputGroup, Form } from 'react-bootstrap';

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
    objectIdStudents: [],
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

    const userEmail = { ...this.state.user}
    classroomService.searchUserByEmail(userEmail)
    .then(student => this.setState({ 
      students: [
        ...this.state.students,
      student
      ],
      objectIdStudents: [
        ...this.state.objectIdStudents,
        student.id
      ],
      user: {
        email: ''
      }
       
    }))
  }

  addListStudents = (event) => {
    event.preventDefault();
    
    const classroomStudents = {
      ...this.state.objectIdStudents
    }
    classroomService.editClassroom(this.props.classroom.id, classroomStudents)
    //.then(this.props.fetchClassrooms)
    .then(this.setState({ show: false }))
    console.log("id clase en la que estoy=>", this.props.classroom.id)
    console.log("datos que quiero guardar=>", classroomStudents)
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
              <Form.Control
                placeholder="Student email..."
                name="email" 
                value={user.email}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
              />
              
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.getStudent}>+ Add</Button>
              </InputGroup.Append>
            </InputGroup>
            <ol reversed>
              {students.map(student => (
                <li key={student.id}>{student.name} {student.surname} - {student.email}</li>
              ))}
              
            </ol>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={this.addListStudents}>
              Save students
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default withAuthConsumer(AddStudent);