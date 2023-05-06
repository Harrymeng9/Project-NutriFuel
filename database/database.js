require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const getExerciseLog = async (user_id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM exerciseLog WHERE user_id=' + user_id, (err, result) => {
      if (err) {
        console.log('getExerciseLog query err', err);
        reject(err)
      }
      console.log('rows', result.rows)
      resolve(result.rows);
    })
  })
}

const postExercise = (name, time) => {
  var date = new Date();
  date = date.toUTCString();
  // return new Promise(function(resolve, reject) {
  //   pool.query(INSERT INTO exerciseLog (name, time, date) VALUES (name, time)), (error, results) => {
  //     if (error) {
  //       reject(error)
  //     }
  //     resolve(results.rows);
  //   })
  // })
}

module.exports = {
  getExerciseLog,
  postExercise
}