import React, { Component } from 'react';


class DeleteClassroom extends Component {
  


  render() {
    
    return(
      <div className="mx-auto">
          <button type="button" className="btn text-secondary" data-toggle="modal" data-target="#deleteClassModal">
            Delete Classroom
          </button>
              
          {/* <!-- Modal delete className --> */}
          <div className="modal fade" id="deleteClassModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Delete Classroom</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlSelect1">Select the classroom for delete</label>
                      <select className="form-control" id="exampleFormControlSelect1">
                          <option>Classroom</option>
                      </select>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
                      <label className="form-check-label" htmlFor="inlineCheckbox1">Check to confirm</label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-danger">Delete</button>
                  </div>
                </div>
              </div>
          </div>
        </div>
    )
  }
}

export default DeleteClassroom;