import React from 'react';
import { Card } from './Card';
import boardService from '../../services/board-service';
import { Link } from 'react-router-dom';

export default ({ id, title, cards, fetchColumns }) => {

  const deleteColumn = () => {
    boardService.deleteColumn(id)
      .then(fetchColumns)
  }

  return (
    <div className="column-item">
        <div className="d-flex justify-content-between">
            <p className="p-3 m-0">Titulo del panel</p>
            <button className="fas fa-plus m-2" data-toggle="modal" data-target="#addNewCard"></button>
             
        </div>
        <div className="card-stack">
          <div className="card-item">
            {/* <a className="" style="width: 17rem;" data-toggle="modal" data-target=".bd-card-modal-xl">
                <div className="card-header p-2 bg-dark">
                    <p className="text-light">Nombre Descritvivo</p> 
                </div>
                <div className="card-body p-2 d-flex justify-content-between text-info bg-white">
                    <p className="card-text-panel">23/13/2019</p>
                    <p className="card-text-panel"><i className="fas fa-paperclip"></i></p>
                    <p className="card-text-panel"><i className="fas fa-euro-sign"></i></p>
                    <p className="card-text-panel"><i className="fas fa-link"></i></p>
                </div>
            </a> */}
          </div>
           
            {/* <a className="column-delete" data-toggle="modal" data-target="#deleteModal"><small>Borrar este panel</small></a>             */}
        </div>
    </div>
  );
}