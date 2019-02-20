import React, { Component } from "react";
import "./App.css";
import AuthService from "./components/AuthService";
import withAuth from "./components/withAuth";
import HomeImageList from "./components/ItemCards/HomePage/HomeImageList";
import Search from "./components/Search";
import API from "./utils/API";

// Search route will comb through itemName and itemDescription
const Auth = new AuthService();

class App extends Component {
  state = {
    items: [],
    searchQuery: "",
    searchBool: false,
    cleared: false
  };

  handleLogout = () => {
    Auth.logout();
    this.props.history.replace("/");
  };

  goToEditProfile = () => {
    this.props.history.replace("/profile");
  };

  componentDidMount = () => {
    API.getAllItems().then(res => {
      this.setState({
        items: res.data
      });
    });
  };

  componentDidUpdate = () => {
    if (this.state.searchBool === true) {
      API.searchItems(this.state.searchQuery).then(res => {
        console.log(res);
        this.setState({
          items: res.data,
          searchBool: false
        });
      });
    } else if (this.state.cleared === false) {
      API.getAllItems().then(res => {
        this.setState({
          items: res.data,
          cleared: true
        });
      });
    }
  };

  handleSearchSubmit = query => {
    if (query !== "") {
      this.setState({
        searchQuery: query,
        searchBool: true
      });
    } else {
      this.setState({
        searchQuery: "none",
        searchBool: false,
        cleared: false
      });
    }
  };

  render() {
    return (
      <div className=" container">
        <div className="App">
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="display-4">One person's trash is another's treasure...</h1>
              <p class="lead">
              Give and get stuff for free in your local community. Don't just throw it out, recycle and reuse! 
              </p>
              <div className="App-header">
                <Search
                  handleSearchSubmit={this.handleSearchSubmit.bind(this)}
                />
              </div>
            </div>
          </div>

          <HomeImageList
            items={this.state.items}
            searchQuery={this.state.searchQuery}
          />
        </div>
      </div>
    );
  }
}

export default withAuth(App);
