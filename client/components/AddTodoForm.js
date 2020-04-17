import React, {Component} from 'react';
import styled, {css} from 'styled-components';

const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0 1em;
    padding: 0.25em 1em;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    /* padding: 10px; */

`;



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
            <Form onSubmit={this.handleSubmit}>
                <label htmlFor="todo">Add A Todo</label>
                <input value={this.state.value} onChange={this.handleChange} type="text" />
                <Button>Add Todo</Button>
            </Form>
        </div>
        )
    }
}

export default AddTodoForm;