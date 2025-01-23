const express = require("express");
const router = express.Router();
const userServices = require("../services/userServices");
const jwt = require("jsonwebtoken");
const AuthenticateWithJwt = require("../middlewares/AuthenticateWithJwt");

router.post("/register", async (req, res) => {
  try {
    // const { name, email, password, country, salutation, marketingPreferences } =
    //   req.body;

    // const userId = await userServices.registerUser({
    //   name,
    //   email,
    //   password,
    //   country,
    //   salutation,
    //   marketingPreferences,
    // });

    const userId = await userServices.registerUser(req.body);

    res.status(201).json({ message: "Registration successful", userId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userServices.loginUser(email, password);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, user_id: user.id });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.put("/me", AuthenticateWithJwt, async (req, res) => {
  try {
    const userId = req.userId;
    const userDetails = req.body;

    await userServices.updateUserDetails(userId, userDetails);

    res.json({ message: "User details updated successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/me", AuthenticateWithJwt, async (req, res) => {
  try {
    const userId = req.userId;

    await userServices.deleteUserAccount(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/me", AuthenticateWithJwt, async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userServices.getUserDetailsById(userId);

    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
