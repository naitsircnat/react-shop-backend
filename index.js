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

app.use(cors());

app.use("/api/products", express.json(), productsRouter);
app.use("/api/users", express.json(), usersRouter);
app.use("/api/cart", express.json(), cartRouter);
app.use("/api/checkout", express.json(), checkoutRouter);
app.use("/api/stripe", stripeRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

// const PORT = process.env.port || 3000;
// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
