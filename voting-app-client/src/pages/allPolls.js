import React, { Component } from 'react';

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
    fetch('/api/polls')
      .then(res => res.json())
      .then(data => {
        this.setState({ allPolls: data });
      })
      .catch(err => {
        console.log(err);
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
