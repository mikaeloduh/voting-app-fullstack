import React, { Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";

import AllPolls from './pages/allPolls';
import NewPoll from './pages/newPoll';
import Test from './pages/test';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={AllPolls} />
            <Route path="/newpoll" component={NewPoll} />
            <Route path="/test" component={Test} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
