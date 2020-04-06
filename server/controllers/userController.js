const db = require("../database/db");

const bcrypt = require('bcryptjs');
const SALT = 10;

const userController = {}

userController.createUser = (req, res, next) => {
  console.log("inside create user", req.body)
  next()
}

module.exports = userController;