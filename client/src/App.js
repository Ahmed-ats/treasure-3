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

  // componentDidUpdate = () => {
  //   if (this.state.searchBool === true) {
  //     API.searchItems(this.state.searchQuery).then(res => {
  //       this.setState({
  //         items: res.data,
  //         searchBool: false
  //       });
  //     });
  //   } else if (this.state.cleared === false) {
  //     API.getAllUsers().then(res => {
  //       this.setState({
  //         items: res.data,
  //         cleared: true
  //       });
  //     });
  //   }
  // };

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
      <div className="App">
        <div className="App-header">
          <Search handleSearchSubmit={this.handleSearchSubmit.bind(this)} />
        </div>

        <HomeImageList
          items={this.state.items}
          searchQuery={this.state.searchQuery}
        />
      </div>
    );
  }
}

export default withAuth(App);
