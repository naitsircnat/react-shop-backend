/*
- Do all the "require"
- create app
- middleware
- create test route
- start server
*/

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
