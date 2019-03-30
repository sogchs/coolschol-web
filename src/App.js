import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './guards/PrivateRoute';

import './App.css';
import { NavBar, FooterNav} from './components/misc';
import { Login, Register } from './components/auth';
import Home from './components/home/Home';
import Classroom from './components/classroom/Classroom';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/home" component={() => <NavBar back={false}/>}/><NavBar/>
        </Switch>
       
       <FooterNav />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/classroom" component={Classroom} />
          {/* <PrivateRoute exact path="/home" role={"teacher"} component={Home} /> */}
          {/* <PrivateRoute exact path="/" role={"Student"} component={} />
          <Redirect to="/not-found"/> */}
        </Switch>
      </div>
    );
  }
}

export default App;
