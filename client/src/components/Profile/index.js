import React, { Component } from 'react';
import withAuth from '../withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';

class Profile extends Component {

  state = {
    fullname: "",
    email: ""
  };

  componentDidMount() {
    console.log(this.props)
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        fullname: res.data.fullname,
        email: res.data.email
      })
    });
  }

  render() {
    return (
      <div className="container Profile">
        <h1>On the profile page!</h1>
        <p>Full Name: {this.state.fullname}</p>
        <p>Email: {this.state.email}</p>
        <Link to="/">Go home</Link>
      </div>
    )
  }
}

export default withAuth(Profile);