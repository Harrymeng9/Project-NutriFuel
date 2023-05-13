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
      email TEXT,\
      password TEXT,\
      food_favor TEXT,\
      exercise_favor TEXT,\
      friends TEXT\
    )');

    // Create table usersgroups
    await pool.query('CREATE TABLE IF NOT EXISTS usersgroups(\
      id INT PRIMARY KEY,\
      user_id INT,\
      group_id INT\
    )');

    // Create table group
    await pool.query('CREATE TABLE IF NOT EXISTS groups(\
      group_id INT PRIMARY KEY,\
      group_name TEXT,\
      group_members TEXT\
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
  return new Promise(function (resolve, reject) {
    pool.query('SELECT * FROM exerciseLog WHERE user_id=' + user_id, (err, result) => {
      if (err) {
        console.log('getExerciseLog query err', err);
        reject(err)
      }
      //console.log('exercises', result.rows)
      resolve(result.rows);
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
      //console.log(results)
      resolve(results.rows);
    })
  })
}


module.exports = {
  getExerciseLog,
  postExercise,
  pool
}

// module.exports = { pool: pool }