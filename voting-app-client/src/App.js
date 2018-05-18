import React, { Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Test from './components/test';
import AllPolls from './pages/allPolls';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>

        </header> */}
        <Navbar />
        <Switch>
          <Route exact path="/" component={AllPolls} />
          <Route path="/test" component={Test} />
        </Switch>
      </div>
    );
  }
}

export default App;
