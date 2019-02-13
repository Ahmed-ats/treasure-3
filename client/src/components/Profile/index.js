import React, { Component } from 'react';
import withAuth from '../withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';
import AddPic from './AddPic';


class Profile extends Component {

  state = {
    fullname: "",
    email: "",
    picture: "",
    userId:""
  };

  checkIfUserExists() {
    if (!this.props.user) {
      window.location.replace("/")
    }
    else {
      API.getUser(this.props.user.id).then(res => {
        this.setState({
          fullname: res.data.fullname,
          email: res.data.email,
          zipcode: res.data.zipcode, 
          userId: res.data._id,
          picture: res.data.imageurl,
        })
    })
    }
}
  componentDidMount() {  
    this.checkIfUserExists();
  }

  render() {
    return (
      <div className="container Profile">
        <h1>On the profile page!</h1>
        
        <ProfileImage  userpicture = {this.state.picture} />
         <br></br>
        <AddPic userId={this.state.userId}/>

        <p>Full Name: {this.state.fullname}</p>
        <p>Email: {this.state.email}</p>
        <p>Zipcode: {this.state.zipcode} </p>

        <Link to="/">Go home</Link>
      </div>
    )
  }
}

export default withAuth(Profile);