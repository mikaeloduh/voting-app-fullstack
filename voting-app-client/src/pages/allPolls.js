import React, { Component } from 'react';

class AllPolls extends Component {
  constructor() {
    super();
    this.state = {
      allPolls: []
    };
  }

  async componentDidMount() {
    try {
      // this.setState({ allPolls: 'loading...' });
      let d = await fetch('/api/polls').then(res => res.json());
      this.setState({ allPolls: d });
    }
    catch(err) {
      console.log(err);
    }
  }

  render() {
    let display = this.state.allPolls.map(poll =>
      <li key={poll._id}>{poll.topic} - {poll.creater}</li>
    )
    // let { allPolls } = this.state;
    return (
      <div>
        <h2>All Polls</h2>
        <ul>
          {display}
        </ul>
      </div>
    );
  }
}

export default AllPolls;
