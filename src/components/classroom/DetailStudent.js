import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import classroomService from '../../services/classroom-service';
import { Form, Button, Table } from 'react-bootstrap';




class DetailStudent extends Component {
  state = {
    studentSelected: '',
    student: {},
    hidden: true,
    disabled: true,
    score: [],
    checklist: [],
    pos:''

  }

  getStudent = () => {
    classroomService.detailStudent(this.state.studentSelected)
    .then(student=> this.setState({ student: student }))
    .then(this.getScore())
    .then(this.getChecklist())
    .then(this.setState({ hidden: false}))
  }
  getScore = () => {
    classroomService.listScore(this.state.studentSelected)
    .then(score=> this.setState({ score: score }))
  }

  getChecklist = () => {
    classroomService.listChecklist(this.state.studentSelected)
    .then(checklist=> this.setState({ checklist: checklist }))
  }

  componentDidMount(){

  }

  handleChange = (event) => {

    const { value } = event.target;

    this.setState({ 
      studentSelected: value,
      disabled: false
    })
  }


  handleSubmit = (event) => {
    event.preventDefault();
    this.getStudent()
    
  }


  render() {
    const { student,hidden, disabled, score, checklist } = this.state
    
    return(

      <div className="container-detail">
       <Form.Group className="form-detail">
          <Form.Label className="text-secondary">Select a student</Form.Label>
          <div className="form-detail-items">
            <Form.Control as="select" onChange={this.handleChange} className="select-detail">
              <option>Select one ...</option>
              {this.props.classroom.students.map(student => 
                <option key={student.id} value={student.id} name="student">{student.name} {student.surname}</option>
                )}
                
            </Form.Control>
            <Button onClick={this.handleSubmit} variant="outline-info ml-2" disabled={disabled}><i className="far fa-eye"></i></Button>
          </div>
         
        </Form.Group>
        <div className="detail-student-container" hidden={hidden}>
          <div className="detail-header">
            <img src={student.imageURL} alt="student-avatar" className="detail-img"/>
            <div className="detail-header-text">
              <h1 className="detail-name">{student.name} {student.surname}</h1>
              <h2 className="detail-email">{student.email}</h2>
            </div>
          </div>

          <div className="detail-body mt-4">
          <div className="detail-title-table">
              <h4 className="mt-2">Scores</h4>
              <p className="detail-num">{checklist.length}</p>
            </div>
            <Table responsive>
              <thead className="text-info">
                <tr>
                  <th>Type</th>
                  <th>Nº</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {score.map(oneScore => 
                  <tr key={oneScore.id}>
                    <td>{oneScore.type === "positive" ? (oneScore.type === "negative" ? '+' : '+') : '-'}</td>
                    <td>{oneScore.scoreNumber}</td>
                    <td>{oneScore.reason}</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="detail-title-table">
              <h4 className="mt-2">No attendance days</h4>
              <p className="detail-num">{checklist.length}</p>
            </div>
            
            <Table responsive>
              <thead className="text-info">
                <tr>
                  <th>Date</th>
                  <th>Observations</th>
                </tr>
              </thead>
              <tbody>
                {checklist.map(oneChecklist => 
                  <tr key={oneChecklist.id}>
                    <td>{oneChecklist.date}</td>
                    <td>{oneChecklist.observations}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>   
        </div>
      </div>
    )
  }
}

export default withAuthConsumer(DetailStudent);