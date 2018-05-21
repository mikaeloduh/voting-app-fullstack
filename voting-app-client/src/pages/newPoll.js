import React, { Component } from 'react';

class NewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
      option: '',
      options: []
    };
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTopicChange(event) {
    this.setState({topic: event.target.value});
  }

  handleOptionChange(event) {
    this.setState({option: event.target.value});
  }

  handleAddOption() {
    let arr = this.state.options;
    let opt = this.state.option;
    arr.push(opt);
    this.setState({option: '', options: arr});
  }

  handleDelOption(idx) {
    let arr = this.state.options;
    arr.splice(idx, 1);
    this.setState({options: arr});
  }

  handleSubmit(event) {
    event.preventDefault();
    let { topic, options } = this.state;
    let opts = options.map( val => {return {name: val, votes: 0}} );
    let object = {
      topic: topic,
      options: opts
    };
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZjYyZDEyMDg3N2VhMDYyMzZhOTYzZSIsInVzZXJuYW1lIjoiYmFuYW5hIiwiaWF0IjoxNTI2MjU5NDA0fQ.75AsF0wQw5y4427_43S_rEylM7Kfd_s299fzL5RKWTU");
    fetch("/api/polls", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(object)
    })
    .then(res => res.json())
    .catch(err => {console.log(err)});
    this.props.history.push("/");
  }

  render() {
    let optionList = this.state.options.map((val, idx) => {
      let id = "optionList" + idx + 1;
      return (
        <div className="form-group row" key={idx}>
          <label htmlFor={id} className="col-sm-12 col-md-2 col-form-label">Option {idx + 1}</label>
          <div className="input-group col-sm-12 col-md-10">
            <input id={id} className="form-control" type="text" value={val} readOnly />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.handleDelOption.bind(this, idx)}>Remove</button>
            </div>
          </div>
        </div>
      )
    });

    return (
      <form className="row justify-content-md-center text-center" onSubmit={this.handleSubmit}>
        <div className="col-sm-12 col-md-10">
          <legend>Create New Poll</legend>
          <div className="form-group row">
            <label htmlFor="topicInput" className="col-sm-12 col-md-2">Topic</label>
            <div className="col-sm-12 col-md-10">
              <input id="topicInput" className="form-control" type="text" value={this.state.topic} onChange={this.handleTopicChange} />
            </div>
          </div>

          {optionList}

          <div className="form-group row">
            <label htmlFor="optionInput" className="col-sm-12 col-md-2 col-form-label">Option</label>
            <div className="input-group col-sm-12 col-md-10">
              <input id="optionInput" className="form-control" type="text" value={this.state.option} onChange={this.handleOptionChange} />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={this.handleAddOption}>Add Option</button>
              </div>
            </div>
          </div>

          <input className="btn btn-primary" type="submit" value="Submit"  />
        </div>
      </form>

    );
  }
}

export default NewPoll;
