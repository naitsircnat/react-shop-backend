const mysql2 = require("mysql2/promise");

// const pool = mysql2.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

module.exports = pool;
