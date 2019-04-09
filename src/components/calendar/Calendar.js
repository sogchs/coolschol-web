import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import calendarService from '../../services/calendar-service';
import  'fullcalendar/dist/fullcalendar.min.css';

import FullCalendar from 'fullcalendar-reactwrapper';

import CreateEvent from './CreateEvent';
import EditEvent from './EditEvent';
import { Modal, Button } from 'react-bootstrap';

class Calendar extends Component {
  
  state = {
    events:[],
    show: false,
    eventSelected:{}
    }

    fetchEvents = () => {
      calendarService.listEvent(this.props.classroom.id)
      .then(events => this.setState({ events, show: false }))
    }
  
    componentDidMount(){
      this.fetchEvents();
    }

    opHandler = (event) => {
      calendarService.detailEvent(event.id)
      .then(event => this.setState({ show: true, eventSelected: event}))

    }

    handleClose = () => {this.setState({ show: false });}

    handleShow = () => {this.setState({ show: true });}


  render() {
    
    return(
      <div className="mt-4 p-1">
        <FullCalendar
        id = "calendar"
        header = {{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        }}
        
        color="red"
        eventClick={this.opHandler}
        navLinks= {true} // can click day/week names to navigate views
        editable= {true}
        eventLimit= {true} // allow "more" link when too many events
        events = {this.state.events}	
        />
        <div className="d-flex justify-content-center mt-3">
          <CreateEvent fetchEvents={this.fetchEvents}/>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Event:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <h5>{this.state.eventSelected.title}</h5>
            <p>Date: {this.state.eventSelected.start} to {this.state.eventSelected.end}</p>
            <p>Show for: {this.state.eventSelected.role}</p>
            </Modal.Body>
              <Modal.Footer>
                <EditEvent {...this.state.eventSelected} fetchEvents={this.fetchEvents}/>
                <Button variant="outline-danger" onClick={this.createEvent}>Delete</Button>
              </Modal.Footer>
          </Modal>
      </div>
    )
  }
}

export default withAuthConsumer(Calendar);

