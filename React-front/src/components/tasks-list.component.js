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
    this.changePage = this.changePage.bind(this);

    this.state = {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      searchTitle: "",
      currentPage: 0,
      perPage: 10,
      page_count: 0,
      page_items: []
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
        let page_count = response.data.length / this.state.perPage;
        this.setState({
          tasks: response.data,
          page_count: page_count
        });
        this.changePage(this.state.currentPage);
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
        let page_count = response.data.length / this.state.perPage;
        this.setState({
          tasks: response.data,
          searchTitle: "",
          page_count: page_count
        });
        this.changePage(this.state.currentPage);
      })
      .catch(e => {
        console.log(e);
      });
  }

  changePage(page_num) {
    let page_items = this.state.tasks.slice(page_num * this.state.perPage, (page_num + 1) * this.state.perPage);
    this.setState({
      currentPage: page_num,
      page_items: page_items
    });
  }

  render() {
    const { searchTitle, page_items, currentTask, currentIndex, page_count, currentPage } = this.state;

    const page_navs = [];

    for (let i = 0; i < page_count; i++) {
      page_navs.push(
        <li key={i} className="page-item"><button className="page-link" onClick={() => this.changePage(i)}>{i+1}</button></li>
        );
    }

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
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                page_items &&
                page_items.map((task, index) => (
                  <tr className={
                    (index === currentIndex ? "list-active" : "")
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}>
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
          <nav aria-label="Page navigation example">
            <ul className="pagination pg-blue">
              <li className="page-item">
                <button className="page-link" onClick={() => this.changePage(currentPage - 1)} disabled={currentPage <= 0 ? 'disabled' : '' }>Previous</button>
              </li>
              {page_navs}
              <li className="page-item">
                <button className="page-link" onClick={() => this.changePage(currentPage + 1)} disabled={currentPage >= (page_count - 1) ? 'disabled' : '' }>Next</button>
              </li>
            </ul>
          </nav>

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