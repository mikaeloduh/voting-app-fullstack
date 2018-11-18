import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { LoginForm, LogoutForm } from "../components/loginForm";
import { apiCall, setTokenHeader } from "../service/api";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  handleLoginClick() {
  }

  handleFormChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    // this.state[name] = value
    this.setState({[name]: value});
  }

  handleSubmitForm(event) {
    event.preventDefault();
    let obj = {
      email: this.state.email,
      password: this.state.password
    };
    apiCall("post", "auth/login", obj)
      .then(data => {
        localStorage.setItem("jwtToken", data.token);
        this.props.history.push(`/profile`);
      });

    // this.props.onLogin;
    // this.props.history.push(`/profile`);
  }

  render() {
    return (
      <div>
        <form>
          <fieldset>
            <legend>Please Log-in</legend>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleFormChange} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleFormChange} />
            </div>
            <button type="button" onClick={this.handleSubmitForm} className="btn btn-primary">Submit</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
