import React, { Component } from 'react';
import withAuth from '../withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import ProfileImage from './ProfileImage';
import AddPic from './AddPic';
import ProfileImageList from '../ItemCards/Profile/ProfileImageList'

class Profile extends Component {

  state = {
    fullname: "",
    email: "",
    picture: "",
    userId: "",
    items: []
  };

  getUserData = () => {
    API.getUser(this.props.user.id).then(res => {
      this.setState({
        fullname: res.data.fullname,
        email: res.data.email,
        zipcode: res.data.zipcode,
        userId: res.data._id,
        picture: res.data.imageurl,
        items: res.data.items
      })
    })
  }

  checkIfUserExists() {
    if (!this.props.user) {
      window.location.replace("/")
    }
    else {
      this.getUserData()
    }
  }
  componentDidMount() {
    this.checkIfUserExists();
  }

  checkIfItemsUpdate() {
    
    this.setState({
      updated: true
    })
  }

  deleteItem(id) {
    API.deleteItem(id)
    this.setState({
      deletedBool: true
    })
      
  }

  componentDidUpdate() {

    if (this.state.updated === true) {
      API.getUser(this.state.userId).then(res => {
        this.setState({
          items: res.data.items,
          updated: false
        })
      });
    } 

    else if (this.state.deletedBool === true) {
      console.log(this.state)
      API.getUser(this.state.userId).then(res => {
          this.setState({
            items: res.data.items,
            deletedBool: false
          })
      })
    }

  }

  render() {

    return (
      <div className="container Profile">
        <h1>On the profile page!</h1>

        <ProfileImage userpicture={this.state.picture} />
        <br></br>
        <AddPic userId={this.state.userId} onSuccess={this.getUserData} />

        <p>Full Name: {this.state.fullname}</p>
        <p>Email: {this.state.email}</p>
        <p>Zipcode: {this.state.zipcode} </p>

        <Link to="/">Go home</Link>

        <ProfileImageList 
        itemObj={this.state.items} 
        updateMethod={this.checkIfItemsUpdate.bind(this)}
        deleteMethod={this.deleteItem.bind(this)}
        />
      </div>
    )
  }
}

export default withAuth(Profile);