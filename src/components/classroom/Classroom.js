import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import classroomService from '../../services/classroom-service';
import Score from './Score';
import AddStudent from './AddStudent';



class Classroom extends Component {
  state = {
    studentsSelect: [],
    classroom: ''

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
        ]    
      })
    }
  }


  render() {
    return(
      <div>
        <div className="btn-classroom-action">
          <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Random</button>
          <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill">Select all</button>
          <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill" data-toggle="modal" data-target="#list">Check List</button>
          <Score />
        </div>
        <div className="board-students">
          {this.props.classroom.students.map(student => (
              <div className={`student ${this.state.studentsSelect.includes(student) && 'student-selected'}`}
                name="student"
                key={student.id} 
                onClick={() => this.handleSelectStudent(student)}
                >
                <img className="avatar-card" src={student.imageURL} alt=""/>
                <span className="avatar-points">10</span>
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