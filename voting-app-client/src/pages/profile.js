import React, { Component } from 'react';
import { apiCall } from "../service/api";

class Profile extends Component {
  constructor() {
    super();
    this.state = {isLoggedIn: false};
  }

  componentDidMount() {
  }

  render() {

    return (
      <div>
        <h3>Profile page</h3>
      </div>
    );
  }
}

export default Profile;
