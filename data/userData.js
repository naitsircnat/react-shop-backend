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

async function createUser({
  name,
  email,
  password,
  country,
  salutation,
  marketingPreferences,
}) {
  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    throw new Error("Invalid user details");
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [userResult] = await connection.query(
      "INSERT INTO users (name, email, password, country, salutation) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, country, salutation]
    );

    const id = userResult.insertId;

    if (Array.isArray(marketingPreferences)) {
      for (const pref of marketingPreferences) {
        const [prefResult] = await connection.query(
          "SELECT * FROM marketing_preferences WHERE preference=?",
          [pref]
        );

        if (prefResult.length === 0) {
          throw new Error(`Invalid marketing preference provided: ${pref}`);
        }

        const prefId = prefResult[0].id;

        await connection.query(
          "INSERT INTO user_marketing_preferences (user_id, preference_id) VALUES (?, ?)",
          [id, prefId]
        );
      }
    }
    await connection.commit();

    return id;
  } catch (error) {
    await connection.rollBack();
    throw error;
  } finally {
    await connection.release();
  }

  /*
  - Add in the marketing preferences
  - 
  */
}
