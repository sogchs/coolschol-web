import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import classroomService from '../../services/classroom-service';
import Student from './Student';
import Score from './Score';
import AddStudent from './AddStudent';


class Classroom extends Component {
  state = {
    students: [],
    classroom: ''

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
            <Student 
              key={student.id} 
              studentName={student.name} 
              studentSurname={student.surname}
              studentIMG={student.imageURL}
              />
          ))}
          <AddStudent />
        </div>
        
      </div>
    )
  }
}

export default withAuthConsumer(Classroom);