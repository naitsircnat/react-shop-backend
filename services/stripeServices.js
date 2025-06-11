const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function createLineItems(orderItems) {
  const lineItems = orderItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.productName,
        images: [item.imageUrl || "https://via.placeholder.com/150"],
        metadata: {
          product_id: item.product_id,
        },
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  return lineItems;
}

async function createCheckoutSession(userId, orderItems, orderId) {
  const lineItems = createLineItems(orderItems);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `https://react-shop-flax-mu.vercel.app/success`,
    cancel_url: `https://www.yahoo.com`,
    metadata: {
      userId: userId,
      orderId: orderId,
    },
  });

  return session;
}

module.exports = {
  createCheckoutSession,
  createLineItems,
};
