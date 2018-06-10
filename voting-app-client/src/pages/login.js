import React, { Component } from 'react';
import { LoginForm, LogoutForm } from "../components/loginForm";
import { apiCall } from "../service/api";

class Login extends Component {
  constructor() {
    super();
    this.handleLoginClick = this.handleLoginClick.bind(this);
    // this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  componentDidMount() {
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
    this.props.history.push(`/profile`);
  }

  render() {

    return (
      <div>
        <form>
          <fieldset>
            <legend>Logged-in success, welcome back!</legend>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" type="email" />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input class="form-control" id="exampleInputPassword1" placeholder="Password" type="password" />
            </div>
            <button type="button" class="btn btn-primary" onClick={this.handleLoginClick}>Submit</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default Login;
