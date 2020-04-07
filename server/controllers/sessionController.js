const pool = require('../database/db');
const { uuid } = require('uuidv4');

const startSession = (req, res, next) => {
  let cookie = uuid();
  console.log("cookie", cookie)
  console.log("incoming", req.body)
  const queryForCookie = `INSERT INTO sessions(username,uuid) VALUES('${req.body.username}','${cookie}')`;
  pool.query(queryForCookie, (err, result) => {
    if (err) return next(err)
    res.cookie("TodoCookie", cookie, { httpOnly: true });
    res.locals.verified = 'verified';
    return next();
  });
}



module.exports = {
  startSession
}