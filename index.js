const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./database.js");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes/checkout");
const stripeRouter = require("./routes/stripe");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkoutRouter);
app.use("/api/stripe", stripeRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
