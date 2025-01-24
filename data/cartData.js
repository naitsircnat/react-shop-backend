const pool = require("../database");

async function getCart(userId) {
  const [rows] = await pool.query(
    "SELECT c.id, c.product_id, c.quantity, p.name AS productName, CAST (price AS DOUBLE) AS price, p.image as imageUrl FROM cart_items c JOIN products p on c.product_id=p.id WHERE user_id=?",
    [userId]
  );

  return rows;
}

async function updateCart(userId, cartItems) {
  const connection = pool.getConnection();

  try {
    await connection.beginTransaction();

    await pool.query("DELETE FROM cart_items WHERE user_id=?", [userId]);

    for (let item of cartItems) {
      await pool.query(
        "INSERT INTO cart_items user_id, product_id, quantity VALUES(?, ?, ?)",
        [userId, item.product_id, item.quantity]
      );
    }

    await connection.commit();
  } catch (error) {
    connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

modules.exports = {
  getCart,
  updateCart,
};
