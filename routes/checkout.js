const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const userAuth = require("../middlewares/AuthenticateWithJwt");
const checkoutService = require("../services/checkoutServices");

router.post("/", userAuth, async (req, res) => {
  try {
    const session = await checkoutService.checkout(req.userId);

    res.json(session);
  } catch (error) {
    res.status(500).json({ "error message": error.message });
  }
});

module.exports = router;
