const cartService = require("./cartServices");
const orderService = require("./orderServices");
const stripeService = require("./stripeServices");

async function checkout(userId) {
  const orderItems = await cartService.getCartContents(userId);

  const orderId = await orderService.createOrder(userId, orderItems);

  const session = await stripeService.createCheckoutSession(
    userId,
    orderItems,
    orderId
  );

  await orderService.updateOrderSessionId(orderId, session.id);

  return session;
}

module.exports = {
  checkout,
};
