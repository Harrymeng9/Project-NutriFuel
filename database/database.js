require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  user: Process.env.USER,
  host: Process.env.HOST,
  database: Process.env.DATABASE,
  password: Process.env.PASSWORD,
  port: Process.env.PORT,
});