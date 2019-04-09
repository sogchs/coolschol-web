import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import groupService from '../../services/group-service'
class DeleteGroup extends Component {
  state = {
    show: false
  }


  deleteGroup = (event) => {
    event.preventDefault();
    
    groupService.deleteGroup(this.props.group.id)
    .then(this.props.fetchGroups)
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
      <>
        <Button variant="link" className="btn-delete-group" onClick={this.handleShow} >
        <i className="far fa-trash-alt"></i>
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure? This groups are very nice!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.deleteGroup}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default DeleteGroup;