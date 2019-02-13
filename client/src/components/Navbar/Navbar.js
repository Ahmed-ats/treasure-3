import React, { Component } from "react";
import withAuth from '../withAuth';
import { Link } from 'react-router-dom';
import AuthService from '../AuthService';
import API from '../../utils/API';
import Login from '../Login';
import Signup from '../Signup';
import './navbar.css'

class Navbar extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }
    
    state = {
        username: "",
    };

    checkIfUserExists() {
        if (this.props.user !== null) {
            API.getUser(this.props.user.id).then(res => {
                this.setState({
                    username: res.data.username,
                    fullname: res.data.fullname,
                    email: res.data.email
                })
            })
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
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hello, 
                        {" " +this.state.username}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/profile">Profile</Link>
                            <a className="dropdown-item" href="/" onClick={() => this.Auth.logout()}>Logout</a>
                            {/* <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a> */}
                        </div>
                    </li>
                </ul>
            );
        }
        else if (this.Auth.loggedIn() && window.location.pathname === "/profile") {
           
            return (
                <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hello, 
                    {" " +this.state.username}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/">Home</Link>
                        <a className="dropdown-item" href="/" onClick={() => this.Auth.logout()}>Logout</a>
                        {/* <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Something else here</a> */}
                    </div>
                </li>
            </ul>
            );
        }
        else {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                            Sign Up
                        </button>
                    </li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#LogInModal">
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
                <Signup />
                <Login />
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container">
                        <Link className="navbar-brand treasureTitle" to="/">Treasure</Link>
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

            </div>
        )
    }
}

export default withAuth(Navbar);