import React, { Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import Test from './components/test';
import AllPolls from './pages/allPolls';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <Link to="/">All Polls</Link><span> </span>
          <Link to="/test">This is a test page</Link>

        <Switch>
          <Route exact path="/" component={AllPolls} />
          <Route path="/test" component={Test} />
        </Switch>
      </div>
    );
  }
}

export default App;
