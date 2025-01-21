const express = require("express");
const pool = require("../database");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Gets all products" });
});

router.get("/:id", (req, res) => {
  res.json({ message: `Gets product of id ${req.params.id}` });
});

module.exports = router;
