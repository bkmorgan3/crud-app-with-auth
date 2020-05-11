import React from 'react';
import Todo from './Todo'
// import { connect } from 'react-redux';
// import { fetchTodos } from '../actions';

class TodosList extends React.Component {
    componentDidMount() {
    }
   
    render() {
        console.log("props pa john",this.props)
        return (
            <div>{this.props.todos.map(todo => (
                <Todo key={todo.id} id={todo.id} text={todo.text} deleteTodo={this.props.deleteTodo} />
            ))}</div>
        )
    }
}

    const mapStateToProps = state => {
        console.log("state",state)
        return {todos: state.todos}
    }

export default TodosList