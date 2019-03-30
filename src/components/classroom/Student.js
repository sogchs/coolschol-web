import React from 'react';

export default (props) => {
  
  return (
    <div className="student">
      <img className="avatar-card" src={props.studentIMG} alt=""/>
      <span className="avatar-points">10</span>
      <div className="card">
        <div className="card-p">
          <p className="card-name">{props.studentName}</p>
          <p className="card-surname">{props.studentSurname}</p>
        </div>
      </div>
    </div>
);
};