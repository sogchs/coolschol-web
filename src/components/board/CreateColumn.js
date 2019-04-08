import React, { Component } from 'react';
import boardService from '../../services/board-service'
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Modal, Button } from 'react-bootstrap';

const validations = { title: (value) => value.length > 0 && value.length < 30}
class CreateColumn extends Component {
  
  state = {
    column: {
      title: '',
      classroom: this.props.classroom.id
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
      column: {
        ...this.state.column,
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

  createColumn = (event) => {
    event.preventDefault();
    
    const column = {
      ...this.state.column
    }
    boardService.createColumn(column)
    .then(this.props.fetchColumns)
    .then(this.setState({ show: false }))
  }

  handleClose = () => {this.setState({ show: false });}

  handleShow = () => {this.setState({ show: true });}

  render() {
    const { column, touch, errors, show } = this.state;

    
    return(
      <div>
          {this.props.user.role === "teacher" &&
          <Button variant="column-add btn btn-outline-info mt-3" onClick={this.handleShow}>+ New Column</Button>
            }
          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create a new Column for your board</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.createColumn}>
                <div className="form-group">
                  <label htmlFor="nameClass">Column Title</label>
                  <input type="text" 
                    className={`form-control form-control-sm ${touch.title ? (errors.title ? 'is-invalid' : 'is-valid') : ''}`} 
                    id="nameClass" 
                    placeholder="Ex. Exams for training..."
                    value={column.title} 
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    name="title"
                    autoComplete="off"
                    />
                </div>
              </form>
            </Modal.Body>
              <Modal.Footer>
                <Button variant="info" onClick={this.createColumn}>Create</Button>
              </Modal.Footer>
          </Modal>
      </div>
    )
  }
}

export default withAuthConsumer(CreateColumn) ;