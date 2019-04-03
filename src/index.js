import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import './index.css';
import 'react-bootstrap/dist/react-bootstrap.min.js'


// import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css'
// import 'fullcalendar-reactwrapper/src/fullcalendarObjectMapper'



import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthStore } from './contexts/AuthStore';
import { fullcalendar } from 'fullcalendar/dist/fullcalendar.min.css';

ReactDOM.render(
  <Router>
    <AuthStore>
      <App />
    </AuthStore>
  </Router>,
  document.getElementById('root'));


serviceWorker.unregister();
