import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import classroomService from '../../services/classroom-service'
class DeleteClassroom extends Component {
  state = {
    show: false,
    classroom: {
      classroomId: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ 
      classroom: {
        ...this.state.classroom,
        [name]: value
      }
    })
  }

  deleteClassroom = (event) => {
    event.preventDefault();
    
    classroomService.deleteClassroom(this.state.classroom.classroomId)
    .then(this.props.fetchClassrooms)
    .then( this.setState({ show: false}))
  }

  handleShow = () => {
    this.setState({ show: true });
  }
  handleClose = () => {
    this.setState({ show: false });
  }

  render() {
    return(
      <div className="mx-auto">
        <Button variant="link" className="text-black-50 mt-3" onClick={this.handleShow} >
          Delete Classroom
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Classroom</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select the classroom to delete it</Form.Label>
                <Form.Control as="select" className="w-75" name="classroomId" onChange={this.handleChange}>
                <option readOnly>Select..</option>
                {this.props.listClassrooms.map(classroom => (
                <option value={classroom.id} key={classroom.id}>{classroom.title}</option>
                ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.deleteClassroom}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default DeleteClassroom;