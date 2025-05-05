const pool = require("../database");

async function getAllProducts() {
  const [rows] = await pool.query("SELECT * FROM products");
  return rows;
}

async function getProductById(id) {
  const [rows] = await pool.query(
    "SELECT name, CAST(price AS DOUBLE) AS price, image FROM products WHERE id = ?",
    [id]
  );

  return rows[0];
}

async function getTeas() {
  const [rows] = await pool.query(
    "SELECT * FROM products WHERE category = 'tea'"
  );

  return rows;
}

async function getCoffees() {
  const [rows] = await pool.query(
    "SELECT * FROM products WHERE category = 'coffee'"
  );

  return rows;
}

async function getFeaturedCoffees() {
  const [rows] = await pool.query(
    "SELECT * FROM products WHERE category = 'coffee' LIMIT 4"
  );

  return rows;
}

async function getFeaturedTeas() {
  const [rows] = await pool.query(
    "SELECT * FROM products WHERE category = 'tea' LIMIT 4"
  );

  return rows;
}

module.exports = {
  getAllProducts,
  getProductById,
  getTeas,
  getCoffees,
  getFeaturedCoffees,
  getFeaturedTeas,
};
