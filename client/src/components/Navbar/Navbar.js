import React, { Component } from "react";
import withAuth from '../withAuth';
import { Link } from 'react-router-dom';
import AuthService from '../AuthService';
import API from '../../utils/API';
import Login from '../Login';
import Signup from '../Signup'
import ItemInputCard from '../ItemInputCard/ItemInputCard';
class Navbar extends Component {
    constructor(props) {
        super(props);
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
           
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#itemInputModal">
                            List Item
</button>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">Hello: {this.state.username} </Link>
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
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#LogInModal">
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
               <ItemInputCard userId ={this.props.user} />
                <Signup />
                <Login />
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

            </div>
        )
    }
}

export default withAuth(Navbar);