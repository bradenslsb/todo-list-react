import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from "./layout/Header"
import Todos from "./compon/Todos"
import AddTodo from "./compon/AddTodo"
import About from "./compon/pages/About"
import uuid from "uuid"


export default class App extends Component {
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: "Take of the trash",
        completed: false
      },
      {
        id: 2,
        title: "Dinner with wife",
        completed: false
      },
      {
        id: 3,
        title: "Metting with boss",
        completed: false
      }
    ]
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
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
  }

  // Add todo
  addTodo = (title) => {
    const newTodo = {
      id: uuid.v4(),
      title: title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo]})
  }

  render() {
    return (
      <Router>
        <div className='app'>
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
