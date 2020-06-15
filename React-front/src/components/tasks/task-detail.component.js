import React, { Component } from "react";
import TaskDataService from "../../services/task.service";
import { Link } from "react-router-dom";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTask = this.getTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.closeMessage = this.closeMessage.bind(this);

    this.state = {
      currentTask: {
        id: null,
        title: "",
        description: "",
      },
      message: null,
      showToast: false
    };
  }

  componentDidMount() {
    this.getTask(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        description: description
      }
    }));
  }

  getTask(id) {
    TaskDataService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask() {
    TaskDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The task was updated successfully!",
          showToast: true,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/tasks')
      })
      .catch(e => {
        console.log(e);
      });
  }

  closeMessage() {
    console.log('asfda');
    this.setState({
      showToast: false
    });
  }

  render() {
    const { currentTask, showToast } = this.state;

    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>Edit Task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTask.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  value={currentTask.description}
                  onChange={this.onChangeDescription}
                  rows="10"
                  cols="20"
                />
              </div>
            </form>
            <div className="row col-md-12">
              <div className="col-md-1">
                <button
                  type="submit"
                  className="btn btn-sm btn-success"
                  onClick={this.updateTask}
                >
                  Update
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
            <div className={ showToast ? "toast show" : "toast"} role="alert" aria-live="assertive" aria-atomic="true">
              <div className="toast-header">
                <strong className="mr-auto">Info</strong>
                <button type="button" className="ml-2 mb-1 close" onClick={ this.closeMessage } aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="toast-body">
                { this.state.message }
              </div>
            </div> }
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Task...</p>
          </div>
        )}
      </div>
    );
  }
}
