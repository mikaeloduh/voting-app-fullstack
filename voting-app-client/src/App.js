import React, { Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";

import AllPolls from './pages/allPolls';
import NewPoll from './pages/newPoll';
import Poll from './pages/poll';
import Profile from './pages/profile';
import Login from './pages/login';
import Logout from './pages/logout';
import Signup from './pages/signup';
import Test from './pages/test';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.handleLoginState = this.handleLoginState.bind(this);
    this.state = {
      isLoggedIn: false,
      uid: NaN
    };
  }

  componentDidMount() {
    let s = localStorage.getItem("user") ? true : false;
    let u = localStorage.getItem("user") || NaN;
    this.handleLoginState(s, u);
  }

  handleLoginState(s, u) {
    this.setState({isLoggedIn: s});
    this.setState({uid: u});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const uid = this.state.uid;
    console.log("isLoggedIn:", isLoggedIn);
    return (
      <div className="App">
        <Navbar
          isLoggedIn={isLoggedIn}
          uid = {uid} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={AllPolls} />
            <Route path="/newpoll" component={NewPoll} />
            <Route path="/poll/:id" component={Poll} />
            <Route path="/profile" component={Profile} />
            <Route path="/test" component={Test} />
            <Route path="/login" render={props => { return (<Login onLogin={this.handleLoginState} />); }} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
