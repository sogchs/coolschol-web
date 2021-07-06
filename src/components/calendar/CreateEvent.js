import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Modal, Button } from 'react-bootstrap';
import calendarService from '../../services/calendar-service';

const validations = { title: (value) => value.length > 0 && value.length < 30}
class CreateEvent extends Component {
  
  state = {
    event: {
      title: '',
      classroom: this.props.classroom.id,
      start: '',
      end: '',
      role: '',
      color: ''
    },
    errors: {
      title: true
    },
    touch: {},
    show: false
  }

  handleChange = (e) => {

    const { name, value } = e.target;

    this.setState({ 
      event: {
        ...this.state.event,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleBLur = (e) => {
    const { name } = e.target;
  
    this.setState({
      ...this.state.touch,
      [name]: true
    })
    
  }

  changeRoleClassroom = (e) =>{
    const { name, value } = e.target;
    this.setState({ 
      event: {
        ...this.state.event,
        [name] : value,
        color: "rgb(30, 163, 183)"
      }
    })
  }

  changeRoleSchool = (e) =>{
    const { name, value } = e.target;
    this.setState({ 
      event: {
        ...this.state.event,
        [name] : value,
        color: "rgb(164, 164, 164)"
      }
    })
  }

  createEvent = (e) => {
    
    e.preventDefault();

    calendarService.createEvent(this.state.event)
    .then(this.props.fetchEvents)
    .then(this.handleClose())
  }

  handleClose = () => {this.setState({ show: false,
    event: {
      title: '',
      classroom: this.props.classroom.id,
      start: '',
      end: '',
      role: '',
      color: ''
    },
    errors: {
      title: true
    } });}

  handleShow = () => {this.setState({ show: true });}

  render() {
    const { event, touch, errors, show } = this.state;
    
    return(
      <>
          <Button variant="outline-info" onClick={this.handleShow}>+ Create Event</Button>

          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="titleEvent">Title</label>
                <input type="text" 
                  className={`form-control ${touch.email && errors.email && 'is-invalid'}`} 
                  id="titleEvent"
                  name="title"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  value={event.title}
                  />
                  <div className="invalid-feedback">{errors.title}</div>
              </div>
              
              <div className="form-check form-check-inline">
                <input className={`form-check-input ${touch.role && errors.role && 'is-invalid'}`} 
                type="radio" 
                name="role" 
                id="roleEvent" 
                value="classroom"
                checked={event.role === "classroom"}
                onChange={this.changeRoleClassroom}
                />
                <label className="form-check-label" htmlFor="roleRegister">Just for this classroom</label>
              </div>
              <div className="form-check form-check-inline">
                <input className={`form-check-input ${touch.role && errors.role && 'custom-control-input'}`} 
                  type="radio" 
                  name="role" 
                  id="roleEvent2" 
                  value="school"
                  checked={event.role === "school"}
                  onChange={this.changeRoleSchool}
                  />
                <label className="form-check-label" htmlFor="roleEvent2">All school</label>
                <div className="invalid-feedback">{errors.role}</div>
              </div>
              
              <div id="collapse-date">
                <div className="m-2">
                  <div className="mt-3">
                    <input type="date" className="" id="dateStart"
                    name="start" 
                    step="1" 
                    value={event.start}
                    onChange={this.handleChange}
                    />
                    <label htmlFor="dateStart" className="col-form-label ml-2">Start</label>
                  </div>
                  <div className="mt-3">
                    <input className="" type="date" id="dateEnd"
                    step="1"
                    name="end" 
                    value={event.end}
                    onChange={this.handleChange}
                    />
                    <label htmlFor="dateEnd" className="col-form-label ml-2">End</label>
                  </div>
                </div>
              </div>
            </form>
            </Modal.Body>
              <Modal.Footer>
                <Button variant="info" onClick={this.createEvent}>Create</Button>
              </Modal.Footer>
          </Modal>
      </>
    )
  }
}

export default withAuthConsumer(CreateEvent) ;