import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import utils from './utils/utils';
import { util } from 'node-forge';

function App() {
  return (
    <div className="App">
      <TaskList />        
    </div>
  );
}

class TaskList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: utils.getSavedTodos()
    }

    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    // this.toggle = this.toggle.bind(this);

  }

  create(newTodo) {
    // this.setState({
    //   todos: [...this.state.todos, newTodo]
    // })
    this.setState({todos: [...this.state.todos, newTodo]}, () => {
      utils.saveTodos(this.state.todos)
      console.log(this.state.todos)
    })
    // utils.saveTodos(this.state.todos)
    // console.log(this.state.todos)
  }

  update(id, updatedTask) {
    const updatedTodos = this.state.todos.map((todo) => {
      if(todo.id === id) {
        return {...todo, task: updatedTask}
      }
      return todo
    })
    this.setState({todos: updatedTodos}, () => {
      utils.saveTodos(this.state.todos);
      console.log('Updated', this.state.todos)
    })
  }

  remove(id) {
    const todoIndex = this.state.todos.findIndex((todo) => todo.id === id);
    const newTodos = this.state.todos.splice(todoIndex, 1);

    this.setState({
      todos: newTodos
    })

    utils.saveTodos(this.state.todos)
  }

  // toggle(id) {

  // }

  render() {
    return (
      <div>
        <Form createTodo={this.create} />
        <ul>
          {this.state.todos.map((todo) =>
            <li>
              <Task 
              id={todo.id}
              key={todo.id}
              task={todo.task}
              completed={todo.completed}
              removeTodo={this.remove}
              updateTodo={this.update}
              toggleTodo={this.toggle}
              todo={todo}
              />
            </li>
          )}
        </ul>
      </div>
    )
  }
}

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      task: this.props.task
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.toggleInput = this.toggleInput.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    }, () => this.props.updateTodo(this.props.id, this.state.task))
    // this.setState((state) => {
    //   return {
    //     [evt.target.name]: evt.target.value
    //   }
    // }, this.props.updateTodo(this.props.id, this.state.task))
  }

  handleUpdate() {
    this.setState((state) => {
      return {
        isEditing: true
      }
    }, () => {
      this.props.updateTodo(this.props.id, this.state.task)
      // setTimeout(() => {
      //   this.setState({isEditing: false});      
      // }, 5000);
    })
    // this.setState({isEditing: true});
    // this.props.updateTodo(this.props.id, this.props.task)
    // this.setState({isEditing: false});
  }

  handleRemove(id) {
    this.props.removeTodo(this.props.id)
  }

  toggleInput() {
    this.setState({isEditing: !this.state.isEditing});
  }

  render() {
    return (
      <div>
        <input 
        type="text" value={this.state.task} 
        onDoubleClick={this.handleUpdate} 
        name='task' 
        onChange={this.handleChange}
        readOnly={!this.state.isEditing} />
        <button type="text" onClick={this.handleRemove} >x</button>
      </div>
    )
  }
}

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      task: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault();

    // let todo = {
    //   task: this.state.task,
    //   id: Date.now(),
    //   completed: false
    // }

    this.props.createTodo({...this.state, id: Date.now(), completed: false})

    // if(this.state.value !== '') {
    //   todos.push(todo)
    //   console.log(todo)
    // } else {
    //     return
    // }

    console.log(this.state)

    this.setState({
      task: ""
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
        onChange={this.handleChange}
        value={this.state.task}
        name="task" />
      </form>
    )
  }
}

export default App;
