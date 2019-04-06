import React, { Component } from 'react';
import groupService from '../../services/group-service'
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Modal, Button } from 'react-bootstrap';

import Select from 'react-select';


const validations = {
  title: (value) => {
  let message;
  if(!value){
    message = 'Some message is required'
  }
  return message;
}}
class NewGroup extends Component {
  
  state = {
    group: {
      title: '',
      subgroups: {
        'group-1': []
      },
      classroom: this.props.classroom.id
    },
    errors: {
      title: validations.title()
    },
    touch: {},
    show: false,
    selectedOption: '',
    selectedOption2: '',
    options: [],
    selectableOptions:[]
  }

  handleChange = (event) => {

    const { name, value } = event.target;

    this.setState({ 
      group: {
        ...this.state.group,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleSubgroupSelect = (options, { name }) => {
    const value = options.map(o => o.value)
    this.setState({
      group: {
        ...this.state.group,
        subgroups: {
          ...this.state.group.subgroups,
          [name]: value
        }
      }
    }, () => {
      let currentValues = [];
      for (let subgroup of Object.values(this.state.group.subgroups)) {
        currentValues = [
          ...currentValues,
          ...subgroup
        ]
      }
      const filteredOptions = this.state.options.filter(option => 
        !currentValues.some(selected => option.value === selected)
      )
      this.setState({ selectableOptions: filteredOptions })
    });
  }

  handleBLur = (event) => {
    const { name } = event.target;
  
    this.setState({
      ...this.state.touch,
      [name]: true
    })
  }

  handleAddSubgroup = () => {
    const name = `group-${Object.keys(this.state.group.subgroups).length + 1}`
    this.setState({
      group: {
        ...this.state.group,
        subgroups: {
          ...this.state.group.subgroups,
          [name]: []
        }
      }
    })
  }

  createGroup = (event) => {
    event.preventDefault();
    
    const groupData = {
      ...this.state.group
    }
    groupService.createGroup(groupData)
    .then(this.props.fetchGroups)
    .then(this.setState({ show: false }))
  }

  handleClose = () => {this.setState({ show: false });}

  handleShow = () => {this.setState({ show: true });}

  componentDidMount(){
    const opt = this.props.classroom.students
      .map(student => { return { value: student.name, label: student.name } })
    this.setState({
      options: opt,
      selectableOptions: opt 
    })
  }

  render() {
    const { group, touch, errors, show } = this.state;
    const subgroups = group.subgroups;

    return(
      <div>
          <Button variant="outline-info" onClick={this.handleShow}>+ New Group</Button>

          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create a new Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <label htmlFor="nameGroup">Group name</label>
                  <input type="text" 
                    className={`form-control form-control-sm ${touch.title ? (errors.title ? 'is-invalid' : 'is-valid') : ''}`} 
                    id="nameGroup"
                    value={group.title} 
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    name="title"
                    autoComplete="off"
                    />
                </div>
                <span className="btn-addSubgroup" onClick={this.handleAddSubgroup}>+ Add Subgroup</span>
                {Object.keys(subgroups).map(name =>
                  (<Select
                    className="mt-2"
                    key={name}
                    name={name}
                    value={subgroups['name']}
                    onChange={this.handleSubgroupSelect}
                    options={this.state.selectableOptions}
                    isMulti
                  />
                  ))}
              </form>
            </Modal.Body>
              <Modal.Footer>
                <Button variant="info" onClick={this.createGroup}>Create</Button>
              </Modal.Footer>
          </Modal>
      </div>
    )
  }
}

export default withAuthConsumer(NewGroup) ;