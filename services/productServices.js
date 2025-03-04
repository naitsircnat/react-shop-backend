const productData = require("../data/productData");

async function getAllProducts() {
  return await productData.getAllProducts();
}

async function getProductById(id) {
  const product = await productData.getProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

async function getProductsByCategory(category) {
  return await productData.getProductsByCategory(category);
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductsByCategory,
};
