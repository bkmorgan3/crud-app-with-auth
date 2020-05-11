const pool = require("../database/db");
const bcrypt = require('bcryptjs');

const createUser = async (req, res, next) => {
  console.log("inside user creator", req.body)
  try {
    let hashedPW = await bcrypt.hash(req.body.password, 10)
    console.log("pw", hashedPW)
    const userQ = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${hashedPW}') RETURNING *`;
    pool.query(userQ, (err, resu) => {
      if (err) return err;
      console.log("res", resu.rows)
      res.locals.user = res.rows
      return next()
    })
  } catch (err) {
    if (err) {
      console.error(err)
      return next()
    }
  }
}

module.exports = {
  createUser
};