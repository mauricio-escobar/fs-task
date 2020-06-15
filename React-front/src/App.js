import React, { Component, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import  {useDarkMode} from "./components/theme/useDarkMode"
import Toggle from "./components/theme/Toggler"
import AddTask from "./components/tasks/task-add.component";
import TaskDetail from "./components/tasks/task-detail.component";
import TasksList from "./components/tasks/tasks-list.component";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/theme/Globalstyle";
import { lightTheme, darkTheme } from "./components/theme/Themes"

const App = () => {

  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if(!mountedComponent) return <div/>

  return (
    <Router>
      <ThemeProvider theme={themeMode}>
        <>
      <GlobalStyles/>
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
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </nav>
        <div className="main-container mt-3">
          <Switch>
            <Route exact path={["/", "/tasks"]} component={TasksList} />
            <Route exact path="/add" component={AddTask} />
            <Route path="/tasks/:id" component={TaskDetail} />
          </Switch>
        </div>
      </div>
      </>
      </ThemeProvider>
    </Router>
  );
}

export default App;