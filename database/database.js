require('dotenv').config()
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
});

const connectDb = async () => {
  try {
    await pool.connect()

    // Create the database 'nutrifuel' in terminal
    // Then switch to the database

    // Create table exercise
    await pool.query('CREATE TABLE IF NOT EXISTS exercise(\
      exercise_id SERIAL PRIMARY KEY,\
      user_id TEXT,\
      date DATE,\
      exercise_name TEXT,\
      time INT\
    )');

    //Create table calories burned
    await pool.query('CREATE TABLE IF NOT EXISTS caloriesBurned(\
      calories_id SERIAL PRIMARY KEY,\
      user_id TEXT,\
      calories_burned INT,\
      date DATE\
    )');

    // Create table nutrition
    await pool.query('CREATE TABLE IF NOT EXISTS nutrition(\
      nutrition_id SERIAL PRIMARY KEY,\
      user_id TEXT,\
      date DATE,\
      food_name TEXT,\
      qty INT,\
      total_calories decimal(10,1)\
    )');

    // Create table user
    await pool.query('CREATE TABLE IF NOT EXISTS users(\
      user_id TEXT PRIMARY KEY,\
      username TEXT,\
      photo TEXT,\
      food_favor TEXT,\
      exercise_favor TEXT\
    )');

    console.log('Connected to PostgreSQL');
    // await client.end()
  } catch (error) {
    console.log('Failed connection to PostgreSQL', error);
  }
}

connectDb();


// Exercise
const getExerciseLog = async (user_id) => {
  var date = new Date();
  date = date.toUTCString();
  return new Promise(function (resolve, reject) {
    //console.log('user_id', user_id)
    pool.query(`SELECT * FROM exercise WHERE user_id='${user_id}' and date='${date}'`, (err, result) => {
      if (err) {
        console.log('getExerciseLog query err', err);
        // reject(err)
      } else {
        var time = 0;
        result.rows.map(entry => {
          time = time + entry.time;
        })
        result.rows.push({time: time})
        //console.log('exercises', result.rows)
        resolve(result.rows);
      }
    })
  })
}

const postExercise = async (user_id, name, time) => {
  var date = new Date();
  date = date.toUTCString();
  console.log('post things', user_id, name, date, time)
  return new Promise(function(resolve, reject) {
    pool.query(`INSERT INTO exerciseLog (user_id, name, date, time) VALUES (${user_id}, '${name}', '${date}', ${time})`, (error, results) => {
      if (error) {
        reject(error)
      }
      console.log(results)
      resolve(results.rows);
    })
  })
};

const postCaloriesBurned = async (user_id, calories_burned) => {
  //console.log(user_id, calories_burned)
  var date = new Date();
  const options = { timeZone: 'America/Los_Angeles' };
  const pacificTime = date.toLocaleString('en-US', options);
  date = pacificTime;

  return new Promise(function(resolve, reject) {
    pool.query(`select * from caloriesburned where user_id='${user_id}' and date='${date}'`, (err, res) => {
      //console.log(res.rows[0])
      if (res.rows[0] === undefined) {
        pool.query(`INSERT INTO caloriesBurned (user_id, calories_burned, date) VALUES ('${user_id}', ${calories_burned}, '${date}')`, (error, results) => {
          if (error) {
            reject(error)
          }
          //console.log('res', res.rows)
          resolve(res.rows);
        })
      } else {
        pool.query(`UPDATE caloriesburned SET calories_burned=${calories_burned} WHERE user_id='${user_id}' and date='${date}'`, (errs, ress) => {
          if (errs) {
            reject(errs)
          }
          //console.log('ress', ress.rows)
          resolve(ress.rows);
        })
      }
    })
  })
}

const deleteExercise = (user_id, exercise_id) => {
  return new Promise(function(resolve, reject) {
    pool.query(`DELETE FROM exercise  WHERE user_id='${user_id}' AND exercise_id=${exercise_id}`, (err, res) => {
      //console.log(res.rows[0])
      if (err) {
        reject(err)
      }
      //console.log('res', res.rows)
      resolve(res.rows);
    })
  })
}


module.exports = {
  getExerciseLog,
  postExercise,
  postCaloriesBurned,
  getCaloriesBurned,
  deleteExercise,
  pool
}

// module.exports = { pool: pool }
