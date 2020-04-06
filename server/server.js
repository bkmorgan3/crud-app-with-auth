const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require("./controllers/userController");


const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', userController.createUser, (req, res) => {
  res.status(200).json(res.locals)
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});