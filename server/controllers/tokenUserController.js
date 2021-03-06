const pool = require("../database/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.createUser = async (req, res, next) => {
  try {
    let hash = await bcrypt.hash(req.body.password, 10);
    const userQ = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${hash}') RETURNING *`;
    const { rows } = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [req.body.username, hash]);
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.signToken = async (req, res, next) => {
  try {

    const { username } = req.body;
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const { id } = rows[0]
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
    const { username } = req.body;
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username])
    const { password } = rows[0]
    let isMatch = await bcrypt.compare(req.body.password, password)
    if (isMatch) {
      return next()
    } else {
      return next({
        status: 400,
        message: "Invalid login credentials"
      })
    }
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    })
  }
}

