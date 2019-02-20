import React, { Component } from 'react';
import AuthService from '../AuthService';
import API from '../../utils/API';

class Signup extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      // this.props.history.replace('/profile');
    }
  }

  handleFormSignUp = event => {
    event.preventDefault();
    API.signUpUser(this.state.zipcode, this.state.fullname, this.state.username, this.state.email, this.state.password)
      .then(res => {
        console.log(res)
        this.Auth.login(this.state.email, this.state.password).then(res => {
          console.log(res.data);
          window.location.replace("/");
        })  
      })
      .catch(err => alert(err));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="container">

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
                <form onSubmit={this.handleFormSignUp}>
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
                  <div className="form-group">
                    <label htmlFor="zipcode">Zip code:</label>
                    <input className="form-control"
                      placeholder="Zip code:"
                      name="zipcode"
                      type="zipcode"
                      id="zipcode"
                      onChange={this.handleChange} />
                  </div>
                  <button type="submit" className="btn btn-secondary">Submit</button>
                </form>
              </div>
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;