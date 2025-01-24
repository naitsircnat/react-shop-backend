const cartData = require("../data/cartData");

async function getCartContents(userId) {
  return await cartData.getCart(userId);
}

async function updateCartContents(userId, newCartContents) {
  if (!Array.isArray(newCartContents)) {
    throw new Error("New cart needs to be an array.");
  }

  await cartData.updateCart(userId, newCartContents);
}

module.exports = { getCartContents, updateCartContents };
