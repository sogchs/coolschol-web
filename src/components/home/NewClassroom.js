import React, { Component } from 'react';
import classroomService from '../../services/classroom-service'
import { Redirect} from 'react-router-dom';
import { withAuthConsumer } from '../../contexts/AuthStore';


const validations = { title: (value) => value.length > 0 && value.length < 20}

class NewClassroom extends Component {
  state = {
    classroom: {
      title: ''
    },
    errors: {
      title: true
    },
    touch: {},
    hide: "false"
  }

  handleChange = (event) => {

    const { name, value } = event.target;

    this.setState({ 
      classroom: {
        ...this.state.classroom,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [name]: validations[name] && validations[name](value)
      }
    })
  }

  handleBLur = (event) => {
    const { name } = event.target;
  
    this.setState({
      ...this.state.touch,
      [name]: true
    })
  }

  createClassroom = (event) => {
    event.preventDefault();
    
    const classroomData = {
      ...this.state.classroom,
      teachers: this.props.user.id
    }
    classroomService.createClassroom(classroomData)
      .then(() => 
      this.setState({ hide: "true" }))
  }



  render() {
    const { hide, classroom, touch, errors } = this.state;

    
    return(
      <div>
          <button type="button" className="btn btn-outline-info new-classroom-btn" data-toggle="modal" data-target="#newCardModal">
            <div className="d-flex justify-content-center">
              <h6 className="mb-0">+ New Classroom</h6>
            </div>
          </button>
    
          {/* <!-- Modal new classroom --> */}
          <div className="modal fade" id="newCardModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden={hide}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">New Classroom</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.createClassroom}>
                    <div className="form-group">
                      <label htmlFor="nameClass">Classroom name</label>
                      <input type="text" 
                        className={`form-control form-control-sm ${touch.title ? (errors.title ? 'is-invalid' : 'is-valid') : ''}`} 
                        id="nameClass" 
                        placeholder="Ej. 5º Matemáticas"
                        value={classroom.title} 
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        name="title"
                        autoComplete="off"
                        />
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-info">
                      Create</button>
                    </div>
                  </form>
                </div>
                
              </div>
            </div>
          </div> 
      </div>
    )
  }
}

export default withAuthConsumer(NewClassroom) ;