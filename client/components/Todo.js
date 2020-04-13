import React from 'react';

function Todo(props) {
    console.log("The Props",props)
    return (
        <div>
            <li onClick={() => props.completeTodo(props)}>{props.text}
            <button onClick={() => props.deleteTodo(props.id)} >Delete Todo</button>
            </li>
        </div>
    )
}

export default Todo;