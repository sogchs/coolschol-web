import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import boardService from '../../services/classroom-service';
import { Button } from 'react-bootstrap';


class Board extends Component {
  state = {
    columns: []
  }

  fetchColumns = () => {
    boardService.listColumns()
    .then(columns => this.setState({ columns }))
  }

  componentDidMount(){
    this.fetchClassrooms();
  }



  render() {
    
    return(
      <div>
        <div className="classroom">
          {this.state.classrooms.map(classroom => (
            <Button type="button" className="btn btn-info classroom-btn" key={classroom.id} href="/classroom">
              <h5 className="mb-0">{classroom.title}</h5>
              <div>
                <small className="text-white-50">STUDENTS</small>
                <h6 className="mb-0">{classroom.students || "0"}</h6>
              </div>
            </Button>
          ))}
          <NewClassroom fetchClassrooms={this.fetchClassrooms}/>
          <DeleteClassroom listClassrooms={this.state.classrooms} fetchClassrooms={this.fetchClassrooms}/>
        </div>
      </div>
    )
  }
}

export default withAuthConsumer(Board);