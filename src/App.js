import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './guards/PrivateRoute';

import './App.css';
import { NavBar, FooterNav} from './components/misc';
import { Login, Register } from './components/auth';
import Home from './components/home/Home';



class App extends Component {
  render() {
    return (
      <div className="App">
       <NavBar />
       <FooterNav />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/home" role={"teacher"} component={Home} />
          {/* <PrivateRoute exact path="/" role={"Student"} component={} />
          <Redirect to="/not-found"/> */}
        </Switch>
      </div>
    );
  }
}

export default App;
