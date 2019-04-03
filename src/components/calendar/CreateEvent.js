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

  changeColor = () =>{
    if(this.state.event.role === "school"){
      this.setState({ 
        event: { 
        ...this.state.event,
        color: "red"}})
      console.log("colooor")
    } else{
      this.setState({ 
        event: { 
        ...this.state.event,
        color: "blue"}})
    }
  }

  createEvent = (e) => {
    
    e.preventDefault();

    calendarService.createEvent(this.state.event)
    .then(this.props.fetchEvents)
    .then(this.setState({ show: false }))
  }

  handleClose = () => {this.setState({ show: false });}

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
                onChange={this.handleChange}
                />
                <label className="form-check-label" htmlFor="roleRegister">Just this classroom</label>
              </div>
              <div className="form-check form-check-inline">
                <input className={`form-check-input ${touch.role && errors.role && 'custom-control-input'}`} 
                  type="radio" 
                  name="role" 
                  id="roleEvent2" 
                  value="school"
                  checked={event.role === "school"}
                  onChange={this.handleChange}
                  />
                <label className="form-check-label" htmlFor="roleEvent2">All school</label>
                <div className="invalid-feedback">{errors.role}</div>
              </div>

              <div id="collapse-date">
                <div className="m-2">
                  <div className="mt-3">
                    <label htmlFor="dateStart" className="col-form-label">Start</label>
                    <input type="date" className="ml-3" id="dateStart"
                    name="start" 
                    step="1" 
                    value={event.start}
                    onChange={this.handleChange}
                    />
                  </div>
                  <div className="mt-3">
                    <label htmlFor="dateEnd" className="col-form-label">End</label>
                    <input className="ml-3" type="date" id="dateEnd"
                    step="1"
                    name="end" 
                    value={event.end}
                    onChange={this.handleChange}
                    />
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