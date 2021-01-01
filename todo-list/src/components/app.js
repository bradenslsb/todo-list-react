import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from "./layout/Header"
import Todos from "./compon/Todos"
import AddTodo from "./compon/AddTodo"
import About from "./compon/pages/About"
//import uuid from "uuid"
import axios from 'axios';


export default class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then(res => this.setState({ todos: res.data }))
  }
  //Toggle complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })})
  }
  //Delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }))
    
  }

  // Add todo
  addTodo = (title) => {
    axios.post("https://jsonplaceholder.typicode.com/todos", {
      title,
      completed: false
    })
      .then(res => this.setState({ todos: [...this.state.todos, res.data]}) )
    
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addToto={this.addTodo}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.props.delTodo}/>

              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
            
          </div>


        </div>
      </Router>
    );
  }
}
