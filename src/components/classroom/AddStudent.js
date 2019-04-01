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

  handleBlur = (event) => {
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
      user: {
        email: ''
      }
    }))
  }

  addListStudents = (event) => {
    event.preventDefault();
    const { classroom: contextClassroom, onClassroomChanged } = this.props;

    const classroom = {
      students: this.state.students.map(student => student.id)
    }
    const newStudents = [...contextClassroom.students, ...this.state.students]
    classroomService.editClassroom(this.props.classroom.id, classroom)
      .then(() => {
        this.setState({ show: false, students: [] });
        onClassroomChanged({
          ...contextClassroom,
          students: newStudents
        });
      }) 
  }


  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  

  render() {
    const { errors, students, user, touch } = this.state
    return(
      <>
        <Button variant="outline-info ml-3 btn-add-student" onClick={this.handleShow}>
          +
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add News Students</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <Form.Control id="email"
                className={`form-control ${touch.email && errors.email && 'is-invalid'}`}
                placeholder="Student email..."
                name="email"
                value={user.email}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
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