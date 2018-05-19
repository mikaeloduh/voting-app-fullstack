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
    arr.append(opt);
    this.setState({option: '', options: arr});
  }

  handleSubmit(event) {
    alert(`A Topic was submitted: ${this.state.topic}, option: ${this.state.option}`);
    event.preventDefault();
  }

  render() {
    let optionList = options.map((val, idx) => {
      return (
        <ul className="list-group">
          <li className="list-group-item" index={idx} >{val}</li>
        </ul>
      );
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
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" onClick="handleAddOption">Add</button>
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
