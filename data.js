/*
- import mysql2/promise
- create pool
- export pool
*/

const mysql2 = require("mysql2/promise");

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

modules.exports = pool;
