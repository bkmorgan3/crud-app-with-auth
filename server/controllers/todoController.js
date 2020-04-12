const pool = require('../database/db');

const addTodo = (req, res, next) => {
  const addTodoQuery = `INSERT INTO todos (text) VALUES ('${req.body.text}') RETURNING *`;
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

module.exports = {
  addTodo
}