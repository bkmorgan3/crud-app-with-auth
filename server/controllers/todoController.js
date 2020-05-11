const pool = require('../database/db');

const addTodo = (req, res, next) => {
  console.log("inside addTodo",req.body)
  const addTodoQuery = `INSERT INTO todos (text) VALUES ('${req.body.todo}') RETURNING *`;
  pool.query(addTodoQuery, (err, result) => {
    if (err) return next(err);
    if (result === undefined) {
      return next()
    }
    console.log("result", result.rows)
    res.locals.todos = result.rows
    return next()
  })
}

const getTodos = (req, res, next) => {
  console.log("getting all todos")
  const getQuery = `SELECT * FROM todos;`
  pool.query(getQuery, (err, result) => {
    if (err) {
      console.error("ERROR",err);
      return next(err)
    } else {
      res.locals.todos = result.rows
    }
    return next()
  })
}

const deleteTodo = (req, res, next) => {
  console.log("deleting todo", req.params.id)
  const deleteQuery = `DELETE FROM todos WHERE todos.id=${req.params.id}`;
  pool.query(deleteQuery, (err, result) => {
    if (err) {
      console.error(err)
      return next(err)
    } else {
      console.log("result",result.rows)
      return next()
    }
  })
}

const completeTodo = (req, res, next) => {
  console.log("toggling completed todo",req.body)
  console.log("params",req.params.id)
  const updateQ = `UPDATE todos SET completed=${req.body.completed} WHERE todos.id=${req.params.id}`;
  pool.query(updateQ, (err, result) => {
    if(err) {
      console.error(err)
      return next(err)
    } else {
      res.locals.todos = result.rows
      return next()
    }
  })
}

module.exports = {
  addTodo,
  getTodos,
  deleteTodo,
  completeTodo
}