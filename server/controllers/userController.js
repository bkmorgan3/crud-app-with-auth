const pool = require("../database/db");

const bcrypt = require('bcryptjs');


const createUser = (req, res, next) => {
  console.log("inside user creator", req.body)

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      console.log("salt", salt)
      if (err) return next(err)
      req.body.password = hash;
      console.log("hash", hash)

      let queryForSignup = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${req.body.password}')`;
      pool.query(queryForSignup, (err, result) => {
        if (err) return next({ err: 'There was a problem creating this user' })
        return next()
      })
    })
  })
}

module.exports = {
  createUser
};