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

async function getTeas() {
  return await productData.getTeas();
}

async function getCoffees() {
  return await productData.getCoffees();
}

async function getFeaturedCoffees() {
  return await productData.getFeaturedCoffees();
}

async function getFeaturedTeas() {
  return await productData.getFeaturedTeas();
}

module.exports = {
  getAllProducts,
  getProductById,
  getTeas,
  getCoffees,
  getFeaturedCoffees,
  getFeaturedTeas,
};
