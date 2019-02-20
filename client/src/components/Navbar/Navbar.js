import React, { Component } from "react";
import withAuth from "../withAuth";
import { Link } from "react-router-dom";
import AuthService from "../AuthService";
import API from "../../utils/API";
import Login from "../Login";
import Signup from "../Signup";
import ItemInputCard from "../ItemInputCard/ItemInputCard";
import "./navbar.css";

class Navbar extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  state = {
    username: ""
  };

  checkIfUserExists() {
    if (this.props.user !== null) {
      API.getUser(this.props.user.id).then(res => {
        this.setState({
          username: res.data.username,
          fullname: res.data.fullname,
          email: res.data.email
        });
      });
    }
  }

  componentDidMount() {
    this.checkIfUserExists();
  }

  showNavigation = () => {
    if (this.Auth.loggedIn() && window.location.pathname === "/") {
      return (
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle btn btn-secondary "
              href="/"
              id="navbarDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Hello,
              {" " + this.state.username}
            </button>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/profile">
                Profile
              </Link>
              <a
                className="dropdown-item"
                href="/"
                onClick={() => this.Auth.logout()}
              >
                Logout
              </a>
              {/* <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a> */}
            </div>
          </li>
        </ul>
      );
    } else if (
      this.Auth.loggedIn() &&
      window.location.pathname === "/profile"
    ) {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              type="button"
              className="btn  btn-dark"
              data-toggle="modal"
              data-target="#itemInputModal"
            >
              List Item
            </button>
          </li>
          <li className="nav-item">
            <a className="btn btn-secondary  " href="/" role="button">
              Go home
            </a>
          </li>
          <li className="nav-item">
            <button
              className="btn btn-secondary "
              href="/"
              onClick={() => this.Auth.logout()}
            >
              Logout
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav">
          <li className="nav-item">
            <button
              className="btn btn-secondary  "
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Sign Up
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-secondary  "
              data-toggle="modal"
              data-target="#LogInModal"
            >
              Log In
            </button>
          </li>
        </ul>
      );
    }
  };

  render() {
    return (
      <div>
        <ItemInputCard userId={this.props.user} />
        <Signup />
        <Login />
        <nav
          className="navbar myNav navbar-expand-lg fixed-top  "
          role="navigation"
        >
          <br />
          <div className="container">
            <Link className="navbar-brand" to="/">
              Treasure
            </Link>
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto" />
              {this.showNavigation()}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withAuth(Navbar);
