import React, { Component } from 'react';
import './App.css';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import HomeImageList from './components/ItemCards/HomePage/HomeImageList'
import API from './utils/API'

const Auth = new AuthService();

class App extends Component {

  state = {
    items: []
  };
  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/');
  };

  goToEditProfile = () => {
    this.props.history.replace('/profile');
  };
  componentDidMount = () => {
    API.getAllUsers()
    .then(res => {
      
      this.setState({
        items: res.data
       
      })
      
    });
    
  }
  
  render() {

    
    return (
      
      
      <div className="App">
     
        <div className="App-header">
          <h2>Welcome </h2>
        </div>
        <HomeImageList users={this.state.items}/>
      </div>
    );
  }
}

export default withAuth(App);
