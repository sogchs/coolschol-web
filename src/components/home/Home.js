import React, { Component } from 'react';
import NewClassroom from './NewClassroom';
import DeleteClassroom from './DeleteClassroom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import classroomService from '../../services/classroom-service';


class Home extends Component {
  state = {
    classrooms: []
  }

  componentDidMount(){
    classroomService.listClassroom()
    .then(classrooms => this.setState({ classrooms }))
  }


  render() {
    
    return(
      <div>
        <div className="classroom">
        {this.state.classrooms.map(classroom => (
          <button type="button" className="btn btn-info classroom-btn" {...classroom} key={classroom.id}>
          <h5 className="mb-0">{classroom.title}</h5>
          <div>
            <small className="text-white-50">STUDENTS</small>
            <h6 className="mb-0">20</h6>
          </div>
        </button>
      ))}
          

          <NewClassroom />
          <DeleteClassroom />
        </div>
      </div>
    )
  }
}

export default withAuthConsumer(Home);