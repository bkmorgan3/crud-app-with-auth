const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require("./controllers/userController");
const sessionController = require("./controllers/sessionController");
const todoController = require('./controllers/todoController')
const { createUser, signToken, verifyPW } = require('./controllers/tokenUserController')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Signup Route
app.post('/api/auth/signup', createUser, signToken, (req, res) => {
  res.status(200).json({})
});
// Login Route
app.post('/api/auth/login', verifyPW, signToken, (req, res) => {
  res.status(200).json({})
})
// TODOS Routes
app.post('/api/todos', todoController.addTodo, (req, res) => {
  res.status(200).json(res.locals.todos)
})
app.get('/api/todos', todoController.getTodos, (req, res) => {
  res.status(200).json(res.locals.todos)
})
app.delete("/api/todos/:id", todoController.deleteTodo, (req, res) => {
  res.status(200).json(res.locals.todos)
})

app.put("/api/todos/:id", todoController.completeTodo, (req, res) => {
  res.status(200).json(res.locals.todos)
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});