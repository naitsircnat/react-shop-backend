const orderData = require("../data/orderData");

async function getOrdersByUserId(userId) {
  return await orderData.getOrdersByUserId(userId);
}

async function createOrder(userId, orderItems) {
  return await orderData.createOrder(userId, orderItems);
}

async function getOrderDetails(orderId) {
  return await orderData.getOrderDetails(orderId);
}

async function updateOrderStatus(order_id, status) {
  return await orderData.updateOrderStatus(order_id, status);
}

async function updateOrderSessionId(order_id, session_id) {
  return await orderData.updateOrderSessionId(order_id, session_id);
}

module.exports = {
  getOrdersByUserId,
  createOrder,
  getOrderDetails,
  updateOrderStatus,
  updateOrderSessionId,
};
