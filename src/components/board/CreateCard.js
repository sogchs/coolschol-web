import React, {Component} from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import { Modal, Button, Collapse, ButtonGroup } from 'react-bootstrap';
import boardService from '../../services/board-service';


const validators = {
    title:     v => v.length > 0,
    description:    v => v.length > 0
  }
class CreateCard extends Component {

    state = {
        card: {
          title: '',
          description: '',
          column: this.props.columnId,
          attachFiles:'',
          filePreview:'',
          dateStart:'',
          dateFinish:'',
          accountPay:'',
          amountPay:'',
          conceptPay:''
        },
        errors: {
          title: true,
          description: true
        },
        touch: {},
        show: false,
        date: false,
        pay: false,
        attach: false
      }

      handleChange = (e) => {
        const { name, value, files } = e.target;
    
        const isValid = validators[name] === undefined || validators[name](value);
    
        this.setState({
          card: {
            ...this.state.card,
            [name]: (files && files[0]) ? files[0] : value
          },
          errors: {
            ...this.state.errors,
            [name]: !isValid
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
  
    const isError = Object.values(this.state.errors).some(error => error);
    const { card, errors, touch, show, date, pay, attach } = this.state;

    return (
      <>
        <Button variant="outline-secondary" className="fas fa-plus m-2 rounded-pill" onClick={this.handleShow}></Button>

        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="titleCard">Title</label>
                <input type="text" 
                  className={`form-control form-control-sm ${touch.title ? (errors.title ? 'is-invalid' : 'is-valid') : ''}`} 
                  id="titleCard" 
                  value={card.title} 
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  name="title"
                  autoComplete="off"
                  />
              </div>

              <div className="form-group">
                <label htmlFor="descriptionCard">Description</label>
                <textarea type="text" 
                  className={`form-control form-control-sm ${touch.description ? (errors.description ? 'is-invalid' : 'is-valid') : ''}`} 
                  id="descriptionCard" 
                  value={card.description} 
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  name="description"
                  autoComplete="off"
                  rows="3"
                  />
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
                  <div id="collapse-attach">
                  {this.state.card.attachFiles && <img className="img-upload" src={URL.createObjectURL(this.state.card.attachFiles)} alt="..."/>}

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
                  <div className="m-2">
                      <div className="mt-3">
                        <label htmlFor="dateStart" className="col-form-label">Start</label>
                        <input type="date" className="ml-3"
                        name="dateStart" 
                        step="1" 
                        value={card.dateStart}
                        onChange={this.handleChange}
                        />
                      </div>
                      <div className="mt-3">
                        <label htmlFor="dateFinish" className="col-form-label">Finish</label>
                        <input className="ml-3" type="date" 
                        name="dateFinish" 
                        value={card.dateFinish}
                        onChange={this.handleChange}
                        />
                      </div>
                      
                      <div className="custom-control custom-switch mt-2">
                        <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
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


