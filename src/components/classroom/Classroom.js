import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import classroomService from '../../services/classroom-service';
import Score from './Score';
import AddStudent from './AddStudent';
import CheckList from './CheckList';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';



class Classroom extends Component {
  state = {
    studentsSelect: [],
    nonAttendance:[],
    //button: true
  }

  handleSelectStudent = (student) => {
   const containStudent = this.state.studentsSelect.includes(student)
    if(containStudent){
      const removeStudent = () => {
        return this.state.studentsSelect.filter( e => e !== student );};
        
      this.setState({ studentsSelect: removeStudent() })

    } else {
      this.setState({
        studentsSelect: [
          ...this.state.studentsSelect,
          student
        ],
        button: false
      })
    }

   
  }


  handleSelectAll = () => {
    this.setState({ studentsSelect:[]})
    this.setState({
        studentsSelect: 
          this.props.classroom.students
      })
  }

  handleDeselectAll = () => {
    this.setState({ studentsSelect:[]})
  }

  handleRandomSelect = () => {
    this.setState({ studentsSelect:[]})
    const randomStudent = this.props.classroom.students.length;
    const selected = Math.floor(Math.random()*randomStudent);
    //console.log(this.props.classroom.students[selected]);
    this.setState({
        studentsSelect: [
          this.props.classroom.students[selected]
        ]
          
      })
  }

  updateStudentByChecklist = () => {
    classroomService.getChecklist(this.props.classroom.id)
    .then(checklist => this.setState({
      nonAttendance: checklist.nonAttendance.map(checklist => checklist)
    })
  )}

  componentDidMount(){
   // this.updateStudentByChecklist()
  }




  render() {
    const longStudent = this.state.studentsSelect.length
    // if(longStudent === 0){
    //    this.setState({ button: true })
    // }
    
    return(
      <div>
        <div className="btn-classroom-action">
          <ButtonGroup size="sm" className="mx-auto" >
            <Button variant="outline-secondary" onClick={this.handleRandomSelect}><i className="fas fa-random"></i></Button>
            <Button variant="outline-secondary" onClick={this.handleSelectAll}><i className="fas fa-check"></i> All</Button>
            <Button variant="outline-secondary" onClick={this.handleDeselectAll}><i className="fas fa-check"></i> None</Button>
            <CheckList
            studentSelected={this.state.studentsSelect} 
            totalStudent={this.props.classroom.students.length}
            deselectAll={this.handleDeselectAll}
            updateStudents={this.updateStudentByChecklist}
            />
            <Score 
            studentSelected={this.state.studentsSelect}
            deselectAll={this.handleDeselectAll}
            button={this.state.button}
            />
            <Link className="btn btn-secondary"  to="/student">Detail</Link>
          </ButtonGroup>
        </div>
        
        <div className="board-students">
          {this.props.classroom.students.map(student => (
              <div className={`student 
                    ${this.state.studentsSelect.includes(student) && 'student-selected'}
                    ${this.state.nonAttendance.includes(student.id) && 'student-out'}
                    `}
                name="student"
                key={student.id} 
                onClick={() => this.handleSelectStudent(student)}
                >
                <img className="avatar-card" src={student.imageURL} alt=""/>
                {/* <span className="avatar-points">10</span> */}
                <div className="card">
                  <div className="card-p">
                    <p className="card-name">{student.name}</p>
                    <p className="card-surname">{student.surname}</p>
                  </div>
                </div>
              </div>
          ))}
          <AddStudent />
        </div>
          
      </div>
    )
  }
}

export default withAuthConsumer(Classroom);