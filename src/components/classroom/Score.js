import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

class Score extends Component {
    state = {
        show: false,
    }

    handleClose = () => {
        this.setState({ show: false });
      }
    
    handleShow = () => {
        this.setState({ show: true });
    }

    render() {
        return (
            <>
                <Button variant="outline-secondary rounded-pill"  onClick={this.handleShow}>
                    Score
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Score round</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    // <div> 
    // <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill" data-toggle="modal" data-target="#addPointsModal">Score</button>
    // <div class="modal fade" id="addPointsModal" tabindex="-1" role="dialog" aria-labelledby="addPointsModal" aria-hidden="true">
    //     <div class="modal-dialog modal-dialog-centered" role="document">
    //     <div class="modal-content p-3">
    //         <div class="modal-header">
    //             <img class="img-pts" src="./coolito6.svg" alt=""/>
    //             <h3 class="modal-title ml-3" id="exampleModalLabel">Ronda de Puntos</h3>
    //             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //                 <span aria-hidden="true">&times;</span>
    //             </button>
    //         </div>
    //         <div class="modal-body">
    //             <div class="form-check d-flex justify-content-around">
    //                 <div class="form-check form-check-inline flex-column-reverse">
    //                     <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
    //                     <label class="form-check-label" for="inlineRadio1">Positivo</label>
    //                 </div>
    //                 <div class="form-check form-check-inline flex-column-reverse">
    //                     <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
    //                     <label class="form-check-label" for="inlineRadio2">Negativo</label>
    //                 </div>
    //             </div>

    //             <hr/>
    //             <div class="d-flex flex-column">
    //                 <div class="form-group flex-column col-6">
    //                     <label for="exampleInputEmail1">Número de Puntos</label>
    //                     <input type="number" class="form-control" id="pts-number" aria-describedby="emailHelp" placeholder="Mínimo 1" value="1"/>
    //                 </div>
    //                 <div class="form-group">
    //                     <p class="mb-0">Puntos por:</p>

    //                     <select id="inputState" class="form-control">
    //                         <option selected>Pregunta en clase</option>
    //                         <option>Buen compañero</option>
    //                     </select>
    //                     <small>Usa una categoría guardada</small>

    //                     <input type="text" class="form-control mt-3" id="pts-concept" name="pts-concept" placeholder="Por buen compañero..."/>
    //                     <small class="mt-3">Crea una nueva categoria de puntos</small>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="modal-footer">
    //         <button type="button" class="btn btn-info">+ Añadir Puntos</button>
    //         </div>
    //     </div>
    //     </div>
    // </div>
    // </div>

}

export default Score;