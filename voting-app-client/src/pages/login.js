import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LoginForm, LogoutForm } from "../components/loginForm";
import { apiCall } from "../service/api";

class Login extends Component {
  constructor() {
    super();
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  componentDidMount() {
  }

  handleLoginClick() {
    this.props.onLogin;
    this.props.history.push(`/profile`);
  }

  render() {

    return (
      <div>
        <form>
          <fieldset>
            <legend>Please Log-in</legend>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" type="email" />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input className="form-control" id="exampleInputPassword1" placeholder="Password" type="password" />
            </div>
            <button type="button" className="btn btn-primary" onClick={this.handleLoginClick}>Submit</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
