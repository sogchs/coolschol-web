import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import classroomService from '../../services/classroom-service';
import { withAuthConsumer } from '../../contexts/AuthStore';


class CheckList extends Component {
    state = {
      show: false,
      checklist: {
        observations: '',
        nonAttendance: [],
        teacher:'',
        classroom: '',
        date:''
      }
    }

    handleClose = () => {
        this.setState({ show: false })
      }
    
    handleShow = () => {

        this.setState({ 
          show: true,
          checklist: {
            nonAttendance: this.props.studentSelected.map(student => student.id),
            teacher: this.props.user.id,
            classroom: this.props.classroom.id,
            date: new Date().toDateString()
          } 
        })
    }

  

    handleChange = (event) => {
      const { name, value } = event.target;
  
      this.setState({ 
        checklist: {
          ...this.state.checklist,
          [name]: value
        }
      })
    }

    handleSubmit = (event) => {
      event.preventDefault();
    
      const checklistData = { ...this.state.checklist }
      
      classroomService.createChecklist(checklistData)
        .then(this.setState({ show: false }))
        .then(this.props.deselectAll)
        .then(this.props.updateStudents)
    }
    

    render(props) {
        return (
            <>
                <Button variant="secondary"  onClick={this.handleShow}>
                Checklist
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="d-flex flex-column">Check list today 
                        <small className="text-secondary">{this.state.checklist.date}</small>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="list-info">
                        <p className="text-info">Students in classroom</p>
                        <h1 className="list-total">{this.props.totalStudent}</h1>
                        <h1 className="list-num">{this.props.studentSelected.length}</h1>   
                      </div>
                      <Form>
                        <label htmlFor="observationsText">Observations</label>
                        <textarea className="form-control" 
                          id="observationsText" 
                          rows="3" 
                          name="observations"
                          value={this.state.checklist.observations} 
                          onChange={this.handleChange}
                          />
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={this.handleSubmit}>
                          Save Checklist
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }


}

export default withAuthConsumer(CheckList) ;