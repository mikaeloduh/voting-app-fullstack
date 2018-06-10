import React, { Component } from 'react';
import { apiCall } from "../service/api";

class Logout extends Component {
  constructor() {
    super();
    // this.handleLoginClick = this.handleLoginClick.bind(this);
    // this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  componentDidMount() {
  }

  render() {

    return (
      <div>
        <h3>You are logged-out</h3>
      </div>
    );
  }
}

export default Logout;
