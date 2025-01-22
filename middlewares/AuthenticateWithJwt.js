const jwt = require("jsonwebtoken");

async function AuthenticateWithJwt(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ Message: "authorization header is missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ Message: "Invalid or expired token" });
  }
}

module.exports = AuthenticateWithJwt;
