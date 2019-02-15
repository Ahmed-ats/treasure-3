import React, { Component } from 'react';
import './App.css';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import HomeImageList from './components/ItemCards/HomePage/HomeImageList';
import Search from './components/Search'
import API from './utils/API'

// Search route will comb through itemName and itemDescription
const Auth = new AuthService();

class App extends Component {

  state = {
    items: [],
    searchQuery: '',
    searchBool: false
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

  componentDidUpdate = () => {
    if (this.state.searchBool === true) {
      console.log("It's true")
    } else {
      console.log("It's false")
    }
  }
  
  handleSearchSubmit = (query) => {
    if (query !== '') {
      this.setState({
        searchQuery: query,
        searchBool: true
      });
    } else {
      this.setState({
        searchQuery: "none",
        searchBool: false
      })
    }
  }

  render() {
    
    return (
      <div className="App">
        <div className="App-header">
          <Search handleSearchSubmit={this.handleSearchSubmit.bind(this)}/>
          <h2>Welcome </h2>
        </div>
        <HomeImageList users={this.state.items} searchQuery={this.state.searchQuery}/>
      </div>
    
    );
  }
}

export default withAuth(App);
