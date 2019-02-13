import React, { Component } from 'react';
import AuthService from '../AuthService';

class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }

  componentWillMount() {
    
    if (this.Auth.loggedIn()) {
      // this.props.history.replace('/');
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFromLogIn = event => {
    event.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        console.log(this.props)
        // once user is logged in
        // take them to their profile page
        // this.props.history.replace(`/profile`);
        window.location.replace(`/`)
      })
      .catch(err => {
        alert(err.response.data.message)
      });
  };

  

  render() {
    return (
      <div className="container">
        <div className="modal fade" id="LogInModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">Log In</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleFromLogIn}>
                  <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input className="form-control"
                      placeholder="Email goes here..."
                      name="email"
                      type="email"
                      id="email"
                      onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input className="form-control"
                      placeholder="Password goes here..."
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
    );
  }
}

export default Login;