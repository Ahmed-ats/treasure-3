import React, { Component } from "react";
import { Link } from 'react-router-dom';
import AuthService from '../AuthService';
import API from '../../utils/API';

class Navbar extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }

    state = {
        username: ""
      };

    componentDidMount() {
        API.getUser(this.props.user).then(res => {
            console.log(res.data)
          this.setState({
            username: res.data.username
          })
        //   console.log(username)
        });
      }

    showNavigation = () => {
        if (this.Auth.loggedIn() && window.location.pathname === "/" ) {
            console.log("At Home Page");
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Messages</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">List Item</Link>
                    </li>
                    <li className="nav-item">
                        {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                        <a className="nav-link" href="/" onClick={() => this.Auth.logout()}>Logout</a>
                    </li>
                </ul>
            );
        } 
        else if (this.Auth.loggedIn() && window.location.pathname === "/profile") {
            console.log("At Profile!")
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">List Item</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Hello: {this.state.username}</Link>
                    </li>
                    <li className="nav-item">
                        {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                        <a className="nav-link" href="/" onClick={() => this.Auth.logout()}>Logout</a>
                    </li>
                </ul>
            );
        }
        else {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
            );
        }
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/">React JWT App</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        {this.showNavigation()}
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;