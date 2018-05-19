import React, { Component } from 'react';

class Test extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    };
  }

  async componentDidMount() {
    try {
      let d = await fetch('/ping').then(res => res.json());
      this.setState({ customers: d });
    }
    catch(err) {
      console.log(err);
    }
  }

  render() {
    let liArray = this.state.customers.map(customer =>
      <li key={customer.id}>{customer.firstName} {customer.lastName}</li>
    )
    return (
      <div>
        <h2>Test Page</h2>
        <ul>
          {liArray}
        </ul>
      </div>
    );
  }
}

export default Test;
