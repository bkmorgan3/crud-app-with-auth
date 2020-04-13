import React, {Component} from 'react';

class AddTodoForm extends Component {
    constructor(props) {
        super(props)
        this.state={value: ''}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e)  {
        this.setState({value: e.target.value})
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("VAL", this.state.value)
        this.props.addTodo(this.state.value)
        this.setState({value: ''})
    }
    render(props) {
    //    console.log("props in FORM", this.props)
    //    console.log("state", this.state)
        return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="todo">Add A Todo</label>
                <input value={this.state.value} onChange={this.handleChange} type="text" />
                <button>Add Todo</button>
            </form>
        </div>
        )
    }
}

export default AddTodoForm;