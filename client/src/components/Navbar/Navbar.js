import React, { Component } from "react";
import { Link } from 'react-router-dom';
import AuthService from '../AuthService';
import API from '../../utils/API';

class Navbar extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }


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
        if (this.Auth.loggedIn() && window.location.pathname === "/") {
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                            Sign Up
                        </button>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
            );
        }
    };

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
            <div>
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
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle">Sign Up</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleFormSubmit}>
                                <div className="form-group">
                                        <label htmlFor="username">Full Name:</label>
                                        <input className="form-control"
                                            placeholder="Full Name:"
                                            name="fullname"
                                            type="text"
                                            id="fullname"
                                            onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username">Username:</label>
                                        <input className="form-control"
                                            placeholder="Username:"
                                            name="username"
                                            type="text"
                                            id="username"
                                            onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email address:</label>
                                        <input className="form-control"
                                            placeholder="Email Address:"
                                            name="email"
                                            type="email"
                                            id="email"
                                            onChange={this.handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd">Password:</label>
                                        <input className="form-control"
                                            placeholder="Password:"
                                            name="password"
                                            type="password"
                                            id="pwd"
                                            onChange={this.handleChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;