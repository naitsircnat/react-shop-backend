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

module.exports = {
  getAllProducts,
  getProductById,
};
