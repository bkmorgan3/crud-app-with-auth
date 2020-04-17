import React from 'react';
import TodosList from './TodosList';
import AddTodoForm from './AddTodoForm';

import styled from 'styled-components';

const Div = styled.div`
  max-width: 900px;
  /* display: flex; */
  /* justify-content: center; */
  margin: 0 auto;
  background-color: dodgerblue;
  font-family: cursive;
`;

class App extends React.Component{
 constructor(props) {
   super(props);
   this.state = {
     todos: [],
   }
   this.addTodo = this.addTodo.bind(this)
   this.deleteTodo = this.deleteTodo.bind(this)
   this.completeTodo = this.completeTodo.bind(this)
 }
 componentDidMount() {
   fetch("/api/todos")
     .then(res => res.json())
     .then(data => this.setState({todos: data}))
 }

 addTodo(todo) {
   fetch('/api/todos', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({todo})
   })
     .then(res => res.json())
     .then(data => {
       const updatedTodos = this.state.todos.concat(data)
       this.setState({ todos: updatedTodos })
     })
 }

  completeTodo({id, completed}) {
    console.log("Completing todo",id, completed)
      completed = !completed 
    // console.log("status",completed)
    
    
     fetch(`/api/todos/${id}`, {
       method: 'PUT',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({completed})
     })
       .then(res => res.json())
     .then(data => console.log("data", data))
  }

  deleteTodo(id) {
  console.log("deleting", id)
  fetch(`/api/todos/${id}`,{
    method: 'DELETE'
    })
    const updatedTodos = this.state.todos.filter(todo => todo.id !==id)
    this.setState({todos: updatedTodos})
 }
  render() {
    return (
      <Div>
        <AddTodoForm addTodo={this.addTodo} />
        <TodosList completeTodo={this.completeTodo} addTodo={this.addTodo} deleteTodo={this.deleteTodo} todos={this.state.todos} />
      </Div>
    )
  }
}

export default App;