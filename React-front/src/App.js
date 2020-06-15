import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTask from "./components/task-add.component";
import TaskDetail from "./components/task-detail.component";
import TasksList from "./components/tasks-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tasks" className="navbar-brand">
              Mauricio
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/tasks"} className="nav-link">
                  Tasks
                </Link>
              </li>
            </div>
          </nav>

          <div className="main-container mt-3">
            <Switch>
              <Route exact path={["/", "/tasks"]} component={TasksList} />
              <Route exact path="/add" component={AddTask} />
              <Route path="/tasks/:id" component={TaskDetail} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;