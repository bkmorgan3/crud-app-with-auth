const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require("./controllers/userController");
const sessionController = require("./controllers/sessionController");
const todoController = require('./controllers/todoController')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/signup', userController.createUser, sessionController.startSession, (req, res) => {
  res.status(200).json(res.locals)
});

app.post('/api/todos', todoController.addTodo, (req, res) => {
  res.status(200).json(res.locals.todos)
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});