import React, { Component } from 'react';

class AllPolls extends Component {
  constructor() {
    super();
    this.state = {
      allPolls: []
    };
  }

  handleOnClick(id) {
    this.props.history.push(`/api/poll/${id}`);
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
    let tableRow = this.state.allPolls.map((poll, idx) => {
      return (
        <tr className="tableRow" key={idx} onClick={this.handleOnClick.bind(this, poll._id)}>
          <th scope="row">{poll.topic}</th>
          <td>{poll.creater}</td>
          <td>{poll._id}</td>
        </tr>
      )
    });

    return (
      <div>
        <h2>All Polls</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Topic</th>
              <th scope="col">Creater</th>
              <th scope="col">Poll ID</th>
            </tr>
          </thead>
          <tbody>
            {tableRow}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AllPolls;
