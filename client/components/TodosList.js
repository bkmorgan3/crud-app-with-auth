import React from 'react';
import Todo from './Todo'
// import { connect } from 'react-redux';
// import { fetchTodos } from '../actions';

class TodosList extends React.Component {
    componentDidMount() {
    }
    render() {
        console.log("props",this.props)
        return (
            <div>Todos List</div>
        )
    }
}

    const mapStateToProps = state => {
        console.log("state",state)
        return {todos: state.todos}
    }

export default TodosList