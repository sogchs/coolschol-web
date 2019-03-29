import React, { Component } from 'react';
import { withAuthConsumer } from '../../contexts/AuthStore';
import boardService from '../../services/board-service';
import { Button } from 'react-bootstrap';
import Column from './Column';
import CreateColumn from './CreateColumn';


class Board extends Component {
  state = {
    columns: []
  }

  fetchColumns = () => {
    boardService.listColumns()
    .then(columns => this.setState({ columns }))
  }

  componentDidMount(){
    this.fetchColumns();
  }



  render() {
    
    return(
      <div className="container-columns">
       {this.state.columns.map(column => (
        <Column {...column} key={column.id} fetchColumns={this.fetchColumns}/>
      ))}

      <CreateColumn fetchColumns={this.fetchColumns} />
      </div>
    )
  }
}

export default withAuthConsumer(Board);