const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the MySQL database.");
    connection.release();
    return true;
  } catch (err) {
    console.error("Error connecting to the database:", err);
    return false;
  }
}

module.exports = { pool, testConnection };
