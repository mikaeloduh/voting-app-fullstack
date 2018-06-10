import React, { Component } from 'react';
import { LoginForm, LogoutForm } from "../components/loginForm";
import { apiCall } from "../service/api";

class Signup extends Component {
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
        <h3>Signup Page</h3>
      </div>
    );
  }
}

export default Signup;
