import React, { Component } from 'react';
import { Router, Route, Link, withRouter } from "react-router-dom";

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poll: {},
      checked: ""
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCheck(event) {
    this.setState({checked: event.target.name});
  }

  handleSubmit(event) {
    event.preventDefault();
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZjYyZDEyMDg3N2VhMDYyMzZhOTYzZSIsInVzZXJuYW1lIjoiYmFuYW5hIiwiaWF0IjoxNTI2MjU5NDA0fQ.75AsF0wQw5y4427_43S_rEylM7Kfd_s299fzL5RKWTU");
    fetch(`/api/polls/${this.state.poll._id}`, {
      method: "GET",
      headers: headers,
      body: this.state.checked
    })
      .then(res => res.json())
      .catch(err => {console.log(err)});
    this.props.history.push(`/polls/${this.state.poll._id}`);
  }

  componentDidMount() {
    fetch(`/api/polls/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({poll: data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let { topic, creater, options } = this.state.poll;
    let opts = options || [];
    let checkLi = opts.map((val, idx) => {
      return (
        <div className="form-check" key={idx}>
          <label className="form-check-label">
            <input className="form-check-input" type="radio" name={val._id}
              checked={this.state.checked === val._id} onChange={this.handleCheck} />
            {val.name}
          </label>
        </div>
      );
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Topic: {topic}</h3>
        <h4>Creater: {creater}</h4>
        <div className="form-group">
          {checkLi}
        </div>
        <input className="btn btn-primary" type="submit" value="Submit"  />

      </form>
    );
  }

}

export default withRouter(Poll);
