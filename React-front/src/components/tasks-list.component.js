import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { Link } from "react-router-dom";

export default class TasksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTasks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTasks() {
    TaskDataService.getAll()
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTasks();
    this.setState({
      currentTask: null,
      currentIndex: -1
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index
    });
  }

  removeAllTasks() {
    if (window.confirm('Are you going to delete all tasks?')) {
      TaskDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  deleteTask(task, index) {
    if (window.confirm('Are you going to delete this task?')) {
      TaskDataService.delete(task.id)
        .then(response => {
          alert('Successfully deleted');
        })
        .catch(e => {
          console.log(e);
        })
    }
  }

  searchTitle() {
    TaskDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tasks: response.data,
          searchTitle: ""
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tasks, currentTask, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="row col-md-12">
          <div className="col-md-6">
            <div className="list-search-box">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={this.onChangeSearchTitle}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchTitle}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <Link to={"/add"} className="nav-link btn btn btn-sm btn-primary">
              Add Task
            </Link>
          </div>
        </div>
        <div className="col-md-8">
          <h4>Tasks List</h4>
          <table className="table table-hover">
            <thead><tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                tasks &&
                tasks.map((task, index) => (
                  <tr className={
                    (index === currentIndex ? "list-active" : "")
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>
                      <div className="action-button-group">
                        <Link
                          to={"/tasks/" + task.id}
                          className="action-button btn btn-sm btn-success"
                        >
                          Edit
                        </Link>
                        <button className="action-button btn btn-sm btn-danger" onClick={()=> this.deleteTask(task, index)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                  ))
              }
            </tbody>
          </table>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTasks}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-4 list-preview">
          {currentTask ? (
            <div>
              <h4 className="list-preview-header">Task Preview</h4>
              <div className="list-preview-body">
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTask.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTask.description}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a task to preview...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}