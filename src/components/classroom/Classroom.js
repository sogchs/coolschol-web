import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import classroomService from '../../services/classroom-service';
import Student from './Student';


class Classroom extends Component {
  state = {
    students: [],
    classroom: this.props.classroom
  }

  fetchStudents = () => {
    classroomService.detailClassroom(this.props.classroom.id)
      .then(students => this.setState({ students }))
  }

  componentDidMount(){
    
  }


  render() {
    
    return(
      <div>
      
       Hola estas en classroom

       <Student />
      </div>
    )
  }
}

export default withAuthConsumer(Classroom);