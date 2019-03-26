import React, { Component } from 'react';
import NewClassroom from './NewClassroom';
import DeleteClassroom from './DeleteClassroom';
import { withAuthConsumer } from '../../contexts/AuthStore';
import classroomService from '../../services/classroom-service';


class Home extends Component {
  state = {
    classrooms: []
  }

  fetchClassrooms = () => {
    classroomService.listClassroom()
    .then(classrooms => this.setState({ classrooms }))
  }

  componentDidMount(){
    this.fetchClassrooms();
  }


  render() {
    
    return(
      <div>
        <div className="classroom">
          {this.state.classrooms.map(classroom => (
            <button type="button" className="btn btn-info classroom-btn" key={classroom.id}>
              <h5 className="mb-0">{classroom.title}</h5>
              <div>
                <small className="text-white-50">STUDENTS</small>
                <h6 className="mb-0">{classroom.students || "0"}</h6>
              </div>
            </button>
          ))}
          <NewClassroom fetchClassrooms={this.fetchClassrooms}/>
          <DeleteClassroom listClassrooms={this.state.classrooms} fetchClassrooms={this.fetchClassrooms}/>
        </div>
      </div>
    )
  }
}

export default withAuthConsumer(Home);