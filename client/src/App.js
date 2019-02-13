import React, { Component } from 'react';
import './App.css';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
const Auth = new AuthService();

class App extends Component {


  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/');
  };

  goToEditProfile = () => {
    this.props.history.replace('/profile');
  };

  render() {

    
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome </h2>
        </div>
        <p className="App-intro">
          
        </p>
      </div>
     
    );
  }
}

export default withAuth(App);
