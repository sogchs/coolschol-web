import React, {Component} from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Modal, Button, Collapse, ButtonGroup } from 'react-bootstrap';
import boardService from '../../services/board-service';
import calendarService from '../../services/calendar-service';


const validations = {
    title:(value) => {
      let message;
      if(!value){
        message = 'Title is required'
      }
      return message;
    },
    description:(value) => {
      let message;
      if(!value){
        message = 'Description is required'
      }
      return message;
    }
  }
class CreateCard extends Component {

    state = {
        card: {
          title: '',
          description: '',
          column: this.props.columnId,
          attachFiles: [],
          filePreview:'',
          dateStart:'',
          dateFinish:'',
          accountPay:'',
          amountPay:'',
          conceptPay:''
        },
        errors: {
          title: validations.title(),
          description: validations.description()
        },
        touch: {},
        show: false,
        date: false,
        pay: false,
        attach: false,
        addEvent: false
      }

      handleChange = (e) => {
        const { name, value, files } = e.target;
    
        //const isValid = validations[name] === undefined || validations[name](value);
    
        this.setState({ 
          card: {
            ...this.state.card,
            [name]: (files && files[0]) ? [...this.state.card.attachFiles, files[0]] : value
          },
          errors: {
            ...this.state.errors,
            [name]: validations[name] && validations[name](value)
          } 
          
        })
      }

      handleBlur = (e) => {
        this.setState({
          touch: {
            ...this.state.touch,
            [e.target.name]: true
          }
        })
      }
    


    handleSubmit = (e) => {
      e.preventDefault();

      if(this.state.addEvent){
        calendarService.createEvent({
          title: this.state.card.title,
          classroom: this.props.classroom.id,
          start: this.state.card.dateStart,
          end: this.state.card.dateFinish,
          role: 'classroom',
          color: "rgb(30, 163, 183)"})
        
        .then(console.log("done"))
      } 
      
      
      const cardData = {
        ...this.state.card
      }
  
      boardService.createCard(cardData)
        .then(this.handleClose())
        .then(this.props.fetchColumns)
    }

    handleClose = () => {this.setState({ show: false });}

    handleShow = () => {this.setState({ show: true });}

render(){
  
    //const isError = Object.values(this.state.errors).some(error => error);
    const { card, errors, touch, show, date, pay, attach, addEvent } = this.state;

    return (
      <> {this.props.user.role === "teacher" &&
        <Button variant="outline-info" className="fas fa-plus m-2 rounded-pill" onClick={this.handleShow}></Button>
        }
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="titleCard">Title</label>
                <input type="text" 
                  className={`form-control ${touch.title && errors.title && 'is-invalid'}`} 
                  id="titleCard" 
                  value={card.title} 
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  name="title"
                  autoComplete="off"
                  />
                  <div className="invalid-feedback">{errors.title}</div>
              </div>

              <div className="form-group">
                <label htmlFor="descriptionCard">Description</label>
                <textarea type="text" 
                  className={`form-control ${touch.description && errors.description && 'is-invalid'}`} 
                  id="descriptionCard" 
                  value={card.description} 
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  name="description"
                  autoComplete="off"
                  rows="3"
                  />
                  <div className="invalid-feedback">{errors.description}</div>
              </div>

              <ButtonGroup >
                  <Button
                    onClick={() => this.setState({ attach: !attach, pay: false, date: false })}
                    aria-controls="collapse-date"
                    aria-expanded={attach}
                    variant="outline-secondary"
                  >
                    Attach
                  </Button>
                  <Button
                    onClick={() => this.setState({ date: !date, pay: false, attach: false })}
                    aria-controls="collapse-date"
                    aria-expanded={date}
                    variant="outline-secondary"
                  >
                    Date
                  </Button>
                  <Button
                    onClick={() => this.setState({ pay: !pay, date: false, attach: false })}
                    aria-controls="collapse-pay"
                    aria-expanded={pay}
                    variant="outline-secondary"
                  >
                    Pay
                  </Button>
                </ButtonGroup>
                <Collapse in={this.state.attach}>
                  <div id="collapse-attach" className="mt-3">

                  {this.state.card.attachFiles.map((img, i) => (
                    <img key={i} className="img-upload" src={URL.createObjectURL(img)} alt="..."/>
                  ))}

                  <button type="button" className="add-img btn btn-outline-info">
                    <input 
                        type="file" 
                        className="custom-file-input" 
                        name="attachFiles" id="attachFiles" 
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        lang="es"/> 
                        <i className="abc fas fa-image"></i>
                  </button>
                  </div>
                </Collapse>
                <Collapse in={this.state.date}>
                  <div id="collapse-date">
                  <div className="mt-2">
                      <p className="mt-3">Select one date</p>
                      <div className="date-card">
                        <input className="" type="date" 
                        name="dateStart" 
                        value={card.dateStart}
                        onChange={this.handleChange}
                        />
                        <label htmlFor="dateStart" className="ml-2">Start</label>
                      </div>
                      <div className="mt-3 date-card">
                        <input className="" type="date" 
                        name="dateFinish" 
                        value={card.dateFinish}
                        onChange={this.handleChange}
                        />
                        <label htmlFor="dateFinish" className="ml-2">Finish</label>
                      </div>
                      
                      <div className="custom-control custom-switch mt-2">
                        <input type="checkbox" 
                          className="custom-control-input" 
                          id="customSwitch1"
                          name="addEvent" 
                          value={addEvent}
                          onChange={() => this.setState({ addEvent : !addEvent})}
                          />
                        <label className="custom-control-label" htmlFor="customSwitch1">Include this event in a calendar</label>
                      </div>
                    </div>
                  </div>
                </Collapse>
                <Collapse in={this.state.pay}>
                  <div id="collapse-pay">
                  <div className="m-2">
                      <label htmlFor="accountPay" className="col-form-label">Account number</label>
                      <input type="text" className="form-control" 
                      id="accountPay"
                      name="accountPay"
                      value={card.accountPay}
                      onChange={this.handleChange}
                      />
                      <label htmlFor="conceptPay" className="col-form-label">Concept</label>
                      <input type="text" className="form-control" 
                      id="conceptPay"
                      name="conceptPay"
                      value={card.conceptPay}
                      onChange={this.handleChange}
                      />
                      <label htmlFor="amountPay" className="col-form-label">Amount</label>
                      <input type="text" className="form-control w-50" 
                      id="amountPay"
                      name="amountPay"
                      value={card.amountPay}
                      onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </Collapse>
              
            </form>
          </Modal.Body>
            <Modal.Footer>
              <Button variant="info" onClick={this.handleSubmit}>Create</Button>
            </Modal.Footer>
        </Modal>
      </>

    )
}}


export default withAuthConsumer(CreateCard) ;


