import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import classroomService from '../../services/classroom-service';
import { Table } from 'react-bootstrap';




class Student extends Component {
  state = {
    studentSelected: this.props.user.id,
    student: {},
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
    this.getStudent()
  }

  render() {
    const { student, score, checklist } = this.state

    const totalScore = score.reduce((a, b) => 
    (b.type === "positive") ? (a + b.scoreNumber) : (a - b.scoreNumber), 0)
    
    return(

      <div className="container-detail">

        <div className="detail-student-container">
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
              <p className="detail-num">{totalScore}</p>
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

export default withAuthConsumer(Student);