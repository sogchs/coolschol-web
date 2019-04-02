import React, { Component } from 'react';
import boardService from '../../services/board-service'
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Card extends Component {
  
  state = {
    show: false
  }


  handleClose = () => {this.setState({ show: false });}

  handleShow = () => {this.setState({ show: true });}

  deleteCard = () => {
    boardService.deleteCard(this.props.id)
    .then(this.props.fetchColumns)
    .then( this.setState({ show: false}))
  }

  render(props) {
    const { show } = this.state;

    const date = this.props.createdAt.slice(0, 10)


    return(
      
      <>
        
        <Link onClick={this.handleShow} to="./board" className="card-item mt-2" data-target=".bd-card-modal-xl">
            <div className="card-header p-2 bg-secondary">
                <p className="text-light">{this.props.title}</p> 
            </div>
            <div className="card-body p-2 d-flex justify-content-between align-items-center text-info bg-white">
                <p className="card-text-panel">{date}</p>
                <div className="d-flex flex-row align-items-center">
                  {this.props.attachFiles &&
                  <p className="card-text-panel mr-2"><i className="fas fa-paperclip"></i></p>}
                  {this.props.accountPay && 
                  <p className="card-text-panel mr-2"><i className="fas fa-euro-sign"></i></p>}
                  {this.props.dateStart &&
                  <p className="card-text-panel mr-2"><i className="fas fa-calendar"></i></p>}
                  
                </div>
            </div>
        </Link>

        <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.title}</Modal.Title>
              <p>{this.props.date}</p>
            </Modal.Header>
            <Modal.Body>
              <div>
                <h6>Description</h6>
                <p>{this.props.description}</p>
              </div>

              {this.props.attachFiles &&
              <div className="mt-4">
                <h6>Attach files</h6>
                {this.state.attachFiles.map(file => (
                  <img scr={file.url} key={file.id} alt=""/>
                ))}
              </div>}

              {this.props.dateStart &&
              <div className="mt-4">
                <h6>Dates</h6>
                <p>{this.props.dateStart} to {this.props.dateFinish}</p>
              </div>}

              {this.props.accountPay &&
              <div className="mt-4">
                <h6>Dates for pay</h6>
                <p className="mb-0">Account number: {this.props.accountPay}</p>
                <p className="mb-0">Concept: {this.props.conceptPay}</p>
                <p className="mb-0">Amount: {this.props.amountPay}€</p>
              </div>}
            </Modal.Body>
              <Modal.Footer>
              
              <p onClick={this.deleteCard} className="text-secondary mb-0">Delete Card</p>
              </Modal.Footer>
          </Modal>
      </>
    )
}}

export default Card;