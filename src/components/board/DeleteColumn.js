import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import boardService from '../../services/board-service';
import { withAuthConsumer } from '../../contexts/AuthStore';
class DeleteColumn extends Component {
  state = {
    show: false
  }


  deleteColumn = (event) => {
    event.preventDefault();
    
    boardService.deleteColumn(this.props.id)
    .then(this.props.fetchColumns)
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
        {this.props.user.role === "teacher" &&
        <Button variant="link" className="text-black-50 mt-3" onClick={this.handleShow} >
          Delete column
        </Button>
        }
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Column</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure? If you remove this column, the cards removes too
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.deleteColumn}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default withAuthConsumer (DeleteColumn);