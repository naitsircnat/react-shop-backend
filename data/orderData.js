const pool = require("../database");

async function getOrdersByUserId(userId) {
  const [rows] = await pool.query("SELECT * FROM orders WHERE user_id=?", [
    userId,
  ]);

  return rows;
}

async function createOrder(userId, orderItems) {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const [result] = connection.query(
      "INSERT INTO orders (total, user_id) VALUES (?,?)",
      [total, userId]
    );

    const orderId = result.insertId;

    for (let item of orderItems) {
      await connection.query(
        "INSERT INTO order_items (product_id, quantity, orderId) VALUES (?,?,?)",
        [item.product_id, item.quantity, orderId]
      );
    }

    await connection.commit();
    return orderId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.release();
  }
}

async function getOrderDetails(orderId) {
  const [rows] = await pool.query(
    "SELECT oi.product_id, quantity, name, price FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE order_id=?",
    [orderId]
  );

  return rows;
}

async function updateOrderStatus(order_id, status) {
  if (
    !["pending", "completed", "cancelled", "shipping", "processing"].includes(
      status
    )
  ) {
    throw new Error("Invalid status");
  }

  await pool.query("UPDATE orders SET status=? WHERE id=?", [status, order_id]);
}

async function updateOrderSessionId(order_id, session_id) {
  await pool.query("UPDATE orders SET checkout_session_id=? WHERE order_id=?", [
    session_id,
    order_id,
  ]);
}

module.exports = {
  getOrdersByUserId,
  createOrder,
  getOrderDetails,
  updateOrderStatus,
  updateOrderSessionId,
};
