const { pool } = require("../config/database");

// Create a new school
async function create(schoolData) {
  const { name, address, latitude, longitude } = schoolData;

  try {
    const [result] = await pool.query(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    const [newSchool] = await pool.query("SELECT * FROM schools WHERE id = ?", [
      result.insertId,
    ]);
    return newSchool[0];
  } catch (error) {
    throw error;
  }
}

// Get all schools
async function findAll() {
  try {
    const [rows] = await pool.query("SELECT * FROM schools");
    return rows;
  } catch (error) {
    throw error;
  }
}

// Find a school by ID
async function findById(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM schools WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create,
  findAll,
  findById,
};
