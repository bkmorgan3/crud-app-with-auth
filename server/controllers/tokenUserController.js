const pool = require("../database/db");
const bcrypt = require('bcryptjs');


exports.createUser = (req, res, next) => {
  console.log("Signing up", req.body)
  return next()
}

