import React from 'react';
import DeleteColumn from './DeleteColumn';
import CreateCard from './CreateCard';
import Card  from './Card';

export default ({ id, title, cards, fetchColumns }) => {
  
  return (
    <div className="column-item mt-3">
        <div className="d-flex flex-column">
          <div className="d-flex flex-row justify-content-between">
            <p className="p-3 m-0">{title}</p>
            <CreateCard columnId={id} fetchColumns={fetchColumns}/>
          </div>
           
          
          {cards.map(card => (
            <Card {...card} key={card.id} fetchColumns={fetchColumns}/>
          ))}
          </div>
        

        <DeleteColumn id={id} fetchColumns={fetchColumns}/> 
    </div>
  );
}