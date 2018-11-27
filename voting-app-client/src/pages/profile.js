import React, { Component } from 'react';
import { apiCall } from "../service/api";

class Profile extends Component {
  constructor() {
    super();
    this.state = {isLoggedIn: false};
  }

  componentDidMount() {
    // apiCall("get", )
  }

  render() {
    const uid = localStorage.getItem("user");

    return (
      <div>
        <h3>Profile page</h3>
        {uid ? (
          <p>Welcome back User {uid}!</p>
        ) : (
          <p>You are not login.</p>
        )}
      </div>
    );
  }
}

export default Profile;
