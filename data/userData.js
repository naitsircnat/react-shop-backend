const pool = require("../database");

async function getUserByEmail(email) {
  if (!email || typeof email !== "string") {
    throw new Error("Invalid email");
  }

  const [rows] = await pool.query("SELECT * FROM users WHERE email=?", [email]);

  return rows[0];
}

async function getUserById(id) {
  if (!id || typeof id !== "number") {
    throw new Error("Invalid ID");
  }

  const [rows] = await pool.query("SELECT * FROM users WHERE id=?", [id]);

  const user = rows[0];

  const [preferences] = await pool.query(
    "SELECT * FROM user_marketing_preferences WHERE user_id=?",
    [id]
  );

  user.marketingPreferences = preferences.map((pref) => {
    if (pref.preference_id === 1) {
      return "email";
    } else {
      return "sms";
    }
  });

  return user;
}
