const pool = require("../database/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.createUser = async (req, res, next) => {
  try {
    let hash = await bcrypt.hashSync(req.body.password, 10);
    const userQ = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${hash}') RETURNING *`;
    const { rows } = await pool.query(userQ)
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.signToken = async (req, res, next) => {
  try {
    const userQ = `SELECT * FROM users WHERE username = '${req.body.username}'`;
    const { rows } = await pool.query(userQ);
    const { id, username } = rows[0]
    let token = jwt.sign({
      id, username
    }, process.env.SECRET)
    return res.status(200).json({
      id, username, token
    })
  } catch (err) {
    console.error(err)
    if (err.code === 11000) {
      err.message = 'Error Validating'
    }
    return next({
      status: 400,
      message: err.message
    })
  }
}

exports.verifyPW = async (req, res, next) => {
  try {
    console.log("logging in", req.body)
    let userQ = `SELECT * FROM users WHERE username = '${req.body.username}'`;
    const { rows } = await pool.query(userQ)
    return next()
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    })
  }
}

