const express = require("express");
const productService = require("../services/productServices");
const pool = require("../database");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/tea", async (req, res) => {
  try {
    const products = await productService.getTeas();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/coffee", async (req, res) => {
  try {
    const products = await productService.getCoffees();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
