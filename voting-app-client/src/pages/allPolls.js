import React, { Component } from 'react';
import { apiCall } from "../service/api";

class AllPolls extends Component {
  constructor() {
    super();
    this.state = {
      allPolls: []
    };
  }

  handleOnClick(id) {
    this.props.history.push(`/poll/${id}`);
  }

  componentDidMount() {
    apiCall("GET", '/api/polls')
      .then(data => {
        this.setState({ allPolls: data });
      });
  }

  render() {
    let tableRow = this.state.allPolls.map((poll, idx) => {
      return (
        <tr className="tableRow" key={idx} onClick={this.handleOnClick.bind(this, poll._id)}>
          <th scope="row">{poll.topic}</th>
          <td>{poll.creater}</td>
          <td>{poll._id}</td>
        </tr>
      );
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
