import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap' esto no me funciona, se lo he calzado de momento al html
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthStore } from './contexts/AuthStore';

ReactDOM.render(
  <Router>
    <AuthStore>
      <App />
    </AuthStore>
  </Router>,
  document.getElementById('root'));


serviceWorker.unregister();
