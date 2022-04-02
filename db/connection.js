const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
});

db.connect(function (err) {
  if (err) throw err;
});

module.exports = db;
