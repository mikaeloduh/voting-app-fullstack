import React, { Component } from 'react';
import { Router, Route, Link, withRouter } from "react-router-dom";
import { apiCall } from "../service/api";

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
    let data = this.state.checked;
    apiCall("PUT", `/api/polls/${this.state.poll._id}`, {data: data});
    this.props.history.push(`/poll/${this.state.poll._id}`);
  }

  componentDidMount() {
    apiCall("GET", `/api/polls/${this.props.match.params.id}`)
      .then(data => {
        this.setState({poll: data});
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
