import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './guards/PrivateRoute';

import './App.css';
import { NavBar, FooterNav} from './components/misc';
import { Login, Register } from './components/auth';
import Home from './components/home/Home';
import Classroom from './components/classroom/Classroom';
import Board from './components/board/Board';
import Calendar from './components/calendar/Calendar';

import Chat from './components/chat/Chat';
import Groups from './components/Groups/Groups';
import Timer from './components/timer/Timer';
import DetailStudent from './components/classroom/DetailStudent';
import Profile from './components/auth/Profile';



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
          <Route exact path="/board" component={Board} />
          <Route exact path="/calendar" component={Calendar} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/groups" component={Groups} />
          <Route exact path="/timer" component={Timer} />
          <Route exact path="/student" component={DetailStudent} />
          <Route exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/classroom" role={"teacher"} component={Classroom} />

          {/* <PrivateRoute exact path="/" role={"Student"} component={} />
          <Redirect to="/not-found"/> */}
        </Switch>
      </div>
    );
  }
}

export default App;
