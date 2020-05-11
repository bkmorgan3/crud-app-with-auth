import React from 'react';
import styled from 'styled-components';

const LI = styled.li`
    list-style-type: none;
    margin: 1rem;
    font-size: 20px;
    /* border: 2px solid orange; */
`;

const Div = styled.div`
    display: flex;
    /* border: 2px dotted yellow; */
    justify-content:space-around;
    padding: 0 5em;

`;
const Button = styled.button`
    /* height: 22px; */
    border-radius: 3px;
    border: 2px solid #030a03;
    background-color: violetredorange;
    font-weight: bold;
    /* font-size: 14px; */
    /* border: 1px solid red; */
    height: 2em;
    align-self: center;
`;

function Todo(props) {
    console.log("The Props",props)
    return (
        <Div>
            <LI >{props.text}</LI>
            <Button onClick={() => props.deleteTodo(props.id)} >Delete Todo</Button>
            
        </Div>
    )
}

export default Todo;