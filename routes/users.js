const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.json({ Message: "Register a new user" });
});

router.post("/login", (req, res) => {
  res.json({ Message: "Log in a user" });
});

module.exports = router;
