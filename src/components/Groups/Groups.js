import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import groupService from '../../services/group-service'
import NewGroup from './NewGroup'
import DeleteGroup from './DeleteGroup'


class Groups extends Component {
  state = {
    groups: []
  }

  fetchGroups = () => {
    groupService.listGroups(this.props.classroom.id)
    .then(groups => this.setState({ groups: groups}))
  }

  componentDidMount(){
    this.fetchGroups()
  }

  handleClick = (classroom) =>{
    this.props.onClassroomChanged(classroom)
  }



  render() {
    
    return(
      <div>
        <div className="group">
          {this.state.groups.map(group => (
            <div className="container-group" key={group.id}>
              <div className="header-group">
                <h1 className="title-group">{group.title}</h1>
                <DeleteGroup fetchGroups={this.fetchGroups} group={group}/>
              </div>
              
              <div className="container-subgroups">
                {Object.keys(group.subgroups).map((subgroup, index) => (
                  <div key={index}>
                    <p className="title-subgroup">{subgroup}</p>
                    {group.subgroups[subgroup].map((student, index) => 
                    <p key={index} className="m-0">{student}</p>
                    )}
                  </div>
            
                ))}
            </div>
            </div>
          ))}
          <NewGroup fetchGroups={this.fetchGroups}/>
          
        </div>
      </div>
    )
  }
}

export default withAuthConsumer(Groups);