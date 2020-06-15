import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import ReactBSTable, { TableHeaderColumn } from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from 'react-bootstrap-table2-paginator'; 
import { Link } from "react-router-dom";

export default class TasksList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.actionButtonFormatter = this.actionButtonFormatter.bind(this);

    this.state = {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      columns: [
        {
          dataField: 'id',
          text: 'Id'
        },
        {
          dataField: 'title',
          text: 'Title',
          filter: textFilter()
        },
        {
          dataField: 'description',
          text: 'Description',
        },
        {
          dataField: 'button',
          text: 'Action',
          dataFormat: this.actionButtonFormatter
        }
      ],
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

  actionButtonFormatter(cell, row) {
    // return '<div className="action-button"><button className="btn btn-default><i className="fa fa-eye"></i></button><button className="btn btn-primary"><i className="fa fa-edit"></i></button><button className="btn btn-danger"><i className="fa fa-trash"></i></button></div>';
    return '<BootstrapButton type="submit"></BootstrapButton>';
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

  removeAllTasks() {
    TaskDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    TaskDataService.findByTitle(this.state.searchTitle)
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

  render() {
    const { tasks, columns} = this.state;

    const options = {
      sizePerPageList: [ 
        {
          text: '10', value: 10
        },
        {  
          text: '20', value: 20  
        }, {
          text: '50', value: 50  
        }, {
          text: '100', value: 100  
        }, {
          text: 'All', value: tasks.length 
        } ],
      sizePerPage: 10,   
      pageStartIndex: 0,    
      prePage: 'Prev',   
      nextPage: 'Next',   
      firstPage: 'First',   
      lastPage: 'Last'
    };  

    return (
      <div className="list row">
        <div className="row">
          <h4>Tasks List</h4>
        </div>
        <div className="row col-md-12">
          <div className="col-md-2">
            <Link to={"/add"} className="nav-link">
              <button className="btn btn-primary">
                Add Task
              </button>
            </Link>
          </div>
        </div>
        <div className="col-md-12">
          <ReactBSTable
            striped
            hover
            keyField='id'
            data={ tasks }
            columns={ columns }
            filter={ filterFactory() }
            pagination={ paginationFactory(options) } />
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTasks}
          >
            Remove All
          </button>
        </div>
      </div>
    );
  }
}