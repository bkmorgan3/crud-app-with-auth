const pool = require("../database/db");
const bcrypt = require('bcryptjs');

const createUser = async (req, res, next) => {
  try {
    let hashedPW = await bcrypt.hash(req.body.password, 10)
    const userQ = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${hashedPW}') RETURNING *`;
    await pool.query(userQ, (err, resu) => {
      if (err) {
        console.error(err)
        return next()
      };
      return next()
    })
  } catch (err) {
    if (err) {
      console.error(err)
      return next()
    }
  }
}

const verifyUser = async (req, res, next) => {
  try {
    let queryforPW = `SELECT password FROM users WHERE username = '${req.body.username}'`;
    const { rows } = await pool.query(queryforPW);
    return next()
  } catch (err) {
    return next({
      status: 400,
      err: err.message
    })
  }
}

module.exports = {
  createUser,
  verifyUser
};