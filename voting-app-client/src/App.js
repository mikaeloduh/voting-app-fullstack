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
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    return (
      <div className="App">
        <Navbar isLoggedIn={this.state.isLoggedIn} onLogin={this.handleLoginClick} onLogout={this.handleLogoutClick}/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={AllPolls} />
            <Route path="/newpoll" component={NewPoll} />
            <Route path="/poll/:id" component={Poll} />
            <Route path="/profile" component={Profile} />
            <Route path="/test" component={Test} />
            <Route path="/login" render={props => { return (<Login onLogin={this.handleLoginClick}/>); }} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
