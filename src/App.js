import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import NavBar from './components/misc/NavBar';
import FooterNav from './components/misc/FooterNav';

class App extends Component {
  render() {
    return (
      <div className="App">
       <NavBar />
       <FooterNav />
        {/* <Switch>
          <Route exact path="/" component={} />
          <PrivateRoute exact path="/" role={"Teacher"} component={} />
          <PrivateRoute exact path="/" role={"Student"} component={} />
          <Redirect to="/not-found"/>
        </Switch> */}
      </div>
    );
  }
}

export default App;
