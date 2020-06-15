import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { Link } from "react-router-dom";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);
    this.closeMessage = this.closeMessage.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      submitted: false,
      message: "",
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTask() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    TaskDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          message: "You submitted successfully!",
          submitted: true,
        });
        console.log(response.data);
      })
      .catch(e => {
        this.setState({
          message: 'Error Occurred while creating a new task.'
        })
        console.log(e);
      });
  }

  newTask() {
    this.setState({
      id: null,
      title: "",
      description: "",
      submitted: false
    });
  }

  closeMessage() {
    this.setState({
      submitted: false
    })
  }

  render() {
    const { submitted } = this.state;
    return (
      <div className="submit-form">
          <div>
            <h4>Add Task</h4>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
                rows="10"
                cols="20"
              />
            </div>
            <div className="row col-md-12">
              <div className="col-md-1">
                <button onClick={this.saveTask} className="btn btn-sm btn-success">
                  Submit
                </button>  
              </div>
              <div className="col-md-1">
                <Link to={"/tasks"}>
                  <button className="btn btn-sm btn-primary">
                    Back
                  </button>
                </Link>
              </div>
            </div>

            {this.state.message && 
              <div className={ submitted ? "toast show" : "toast"} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                  <strong className="mr-auto">Info</strong>
                  <button type="button" className="ml-2 mb-1 close" onClick={ this.closeMessage } aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="toast-body">
                  { this.state.message }
                </div>
            </div>}
          </div>
      </div>
    );
  }
}