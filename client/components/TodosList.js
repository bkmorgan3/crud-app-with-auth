import React from 'react';
import Todo from './Todo';

const TodosList = (props) => {
    console.log("TDL",props)
    return (
    <div>
        <h1>Todos</h1>
       <div className="todos">
           {props.todos.map(({ id,text,completed }) => (
               <Todo key={id} id={id} text={text} deleteTodo={props.deleteTodo} completeTodo={props.completeTodo} completed={completed} />
           ))}
       </div>
    </div>
    )}

export default TodosList;