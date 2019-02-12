import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../AuthService';
import API from '../../utils/API';

class Signup extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }

  handleFormSubmit = event => {
    event.preventDefault();
    API.signUpUser(this.state.username, this.state.email, this.state.password)
      .then(res => {
        // once the user has signed up
        // send them to the login page
        this.props.history.replace('/login');
      })
      .catch(err => alert(err));
  };

  handleChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="container">

        <h1>Items Go Here...</h1>
      </div>
    );
  }
}

export default Signup;