import React, {Component} from 'react';
import styled, {css} from 'styled-components';

const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: #000;
    display: inline-block;
    height: 40px;
    width: 50%;
    cursor: pointer;
    background-color: #4caf50;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Label = styled.label`
    font-weight: bold;
    color: #111;
    font-size: 3rem;
`;

const Input = styled.input`
    width: 70%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 4px;


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
                <Label htmlFor="todo">Add A Todo</Label>
                <Input placeholder="Add Your Todo Item Right Here and See It Render Below." value={this.state.value} onChange={this.handleChange} type="text" />
                <Button>Add Todo</Button>
            </Form>
        </div>
        )
    }
}

export default AddTodoForm;