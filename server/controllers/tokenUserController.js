const pool = require("../database/db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.createUser = async (req, res, next) => {
  console.log("Signing up", req.body)
  try {
    let hash = await bcrypt.hashSync(req.body.password, 10);
    const userQ = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${hash}') RETURNING *`;
    await pool.query(userQ, (err, result) => {
      if (err) {
        console.error(err)
        return next()
      }
      return next();
    })
  } catch (err) {
    return next(err)
  }
}

exports.signToken = async (req, res, next) => {
  console.log("creating a token", req.body);
  try {
    let user;
    const userQ = `SELECT * FROM users WHERE username = '${req.body.username}'`;
    await pool.query(userQ, (err, result) => {
      if (err) {
        console.error(err)
        return next();
      }
      console.log("res", result.rows[0])
      user = result.rows[0]
      console.log("user", user)
      let { id, username } = user;
      let token = jwt.sign({
        id, username
      }, process.env.SECRET)
      return res.status(200).json({
        id, username, token
      })
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

