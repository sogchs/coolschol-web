import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { withAuthConsumer } from '../../contexts/AuthStore';
import classroomService from '../../services/classroom-service';

const validations = {
    reason: (value) => {
    let message;
    if(!value){
      message = 'Reason is required'
    }
    else if(value.length > 3 && value.length < 20){
      message = 'Invalid long Reason '
    }
    return message;
  }
}
class Score extends Component {
    state = {
        show: false,
        selector: false,
        button: true,
        score: {
            type:'',
            reason:'For question in classroom',
            students:[],
            scoreNumber: '1',
            classroom:''
        },
        touch: {},
        errors: {
            reason: validations.reason()
        }
    }

    handleClose = () => {
        this.setState({ show: false });
      }
    
    handleShow = () => {
        this.setState({ 
            show: true,
            score: {
                ...this.state.score,
              students: this.props.studentSelected.map(student => student.id),
              teacher: this.props.user.id,
              classroom: this.props.classroom.id
            } 
          })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
          score: {
            ...this.state.score,
            [name]: value
          },
          errors: {
            ...this.state.errors,
            [name]: validations[name] && validations[name](value)
          }
        })
      }
    
    handleBlur = (event) => {
    const { name } = event.target;
    this.setState({
        touch: {
        ...this.state.touch,
        [name]: true
        }
    })
    }

    handleDisableSelect = () => {
        this.setState({ selector: true });
    }

    handleActiveButton = () => {
        this.setState({ button: false})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const scoreData = { ...this.state.score }
        classroomService.createScore(scoreData)
        .then(this.setState({ show: false }))
        .then(this.props.deselectAll) 
      }

    render() {
        const { score, selector, button } = this.state
        return (
            <>
                <Button variant="secondary"  onClick={this.handleShow} disabled={this.props.button}>
                    Score
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <div className="header-score">
                            <Modal.Title className="title-score">Score round</Modal.Title>
                        <img className="coolito-score" src="https://res.cloudinary.com/dkgr9dg9n/image/upload/v1553675522/coolSchool/web/coolito4.png" alt="coolito-score"/>
                        </div>
                        
                    </Modal.Header>
                    <Modal.Body>
                    <div className="form-check d-flex justify-content-around">
                        <div className="form-check form-check-inline flex-column-reverse">
                            <input className="form-check-input" 
                            type="radio" 
                            name="type" 
                            id="+Radio" 
                            value="positive"
                            checked={score.type === "positive"}
                            onChange={this.handleChange}
                            onClick={this.handleActiveButton}
                            />
                            <label className="form-check-label" htmlFor="+radio">Positive</label>
                        </div>
                        <div className="form-check form-check-inline flex-column-reverse">
                        <input className="form-check-input" 
                            type="radio" 
                            name="type" 
                            id="-Radio" 
                            value="negative"
                            checked={score.type === "negative"}
                            onChange={this.handleChange}
                            onClick={this.handleActiveButton}
                            />
                            <label className="form-check-label" htmlFor="-Radio">Negative</label>
                        </div>
                    </div>
                        
                    <hr/>
                    <div className="d-flex flex-column">
                        <div className="form-group flex-column col-6">
                            <label htmlFor="scoreNumber">Score Number</label>
                            <input type="number" 
                            className="form-control" 
                            id="scoreNumber"
                            name="scoreNumber" 
                            value={score.scoreNumber}
                            onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <p className="mb-0">Reason:</p>
                            <select id="selectReason" className="form-control" name="reason" onChange={this.handleChange} disabled={selector}>
                                <option>For question in classroom</option>
                                <option>For schoolfellow</option>
                                <option>For homework</option>
                                <option>For interest</option>
                                <option>For behavior</option>
                            </select>
                            <small>You can use a predefined reason</small>

                            <input type="text" 
                            className="form-control mt-3" 
                            id="newReason"
                            placeholder="Other reason..."
                            name="reason"
                            onChange={this.handleChange}
                            onClick={this.handleDisableSelect}
                            />
                            <small className="mt-3">Or create a new reason</small>
                        </div>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="info" onClick={this.handleSubmit} disabled={button}>
                            Save score
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }



}

export default withAuthConsumer(Score);