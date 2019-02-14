import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";

// Our Components
// import Login from './components/Login';
import Profile from './components/Profile';
// import Signup from './components/Signup';
import Navbar from './components/Navbar';

library.add(faTrash, faEdit);

// Here is if we have an id_token in localStorage
if(localStorage.getItem("id_token")) {
  // then we will attach it to the headers of each request from react application via axios
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;
}

ReactDOM.render(
    <Router>
        <div>
            <Navbar />
            <Route exact path="/" component={App} />
            {/* <Route exact path="/login" component={Login} /> */}
            {/* <Route exact path="/" component={Signup} /> */}
            <Route exact path="/profile" component={Profile} />
        </div>
    </Router>
    , document.getElementById('root')
);
registerServiceWorker();
