import React from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from '../actions';

class TodosList extends React.Component {
    componentDidMount() {
        this.props.fetchTodos()
    }
    render() {
        console.log("props",this.props)
        return (
            <div>TodosList</div>
        )
    }
}

    const mapStateToProps = state => {
        console.log("state",state)
        return {todos: state.todos}
    }

export default connect(mapStateToProps, {fetchTodos}) (TodosList);