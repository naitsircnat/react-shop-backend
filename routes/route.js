const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.send("Get cart items");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    res.send("Replace cart");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
