import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Index extends Component {
  
  render() {

    
    return(
      <div className="container-index">
         <img className="img-index" src="https://res.cloudinary.com/dkgr9dg9n/image/upload/v1555006343/coolSchool/web/imagen-index-coolschool.png" alt="index-coolschool"/>
        <div className="container-index-links">
          <Link className="btn-index" to="/login">LOGIN</Link>
          <Link className="btn-index" to="/register">REGISTER</Link>
        </div>
      </div>
    )
  }
}

export default Index;