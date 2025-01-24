const express = require("express");
const router = express.Router();
const AuthenticateWithJwt = require("../middlewares/AuthenticateWithJwt");
const cartServices = require("../services/cartServices");

router.use(AuthenticateWithJwt);

router.get("/", async (req, res) => {
  try {
    const user_id = req.userId;

    const cart = await cartServices.getCartContents(user_id);

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    const user_id = req.userId;
    const newCart = req.body;

    await cartServices.updateCartContents(user_id, newCart);

    res.json({ message: "Cart update successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
