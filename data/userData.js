const pool = require("../database");

async function getUserByEmail(email) {
  if (!email || typeof email !== "string") {
    throw new Error("Invalid email");
  }

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
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
    await connection.rollback();
    throw error;
  } finally {
    await connection.release();
  }
}

async function updateUser(
  id,
  { name, email, password, country, salutation, marketingPreferences }
) {
  if (!id || typeof id !== "number") {
    throw new Error("Invalid ID");
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.query(
      "UPDATE users SET name=?, email=?, password=?, country=?, salutation=? WHERE id=?",
      [name, email, password, country, salutation, id]
    );

    await connection.query(
      "DELETE FROM user_marketing_preferences WHERE user_id=?",
      [id]
    );

    if (Array.isArray(marketingPreferences)) {
      for (const pref of marketingPreferences) {
        const [prefResult] = await connection.query(
          "SELECT * FROM marketing_preferences WHERE preference=?",
          [pref]
        );

        if (prefResult.length === 0) {
          throw new Error(`Invalid marketing preference : ${pref}`);
        }

        const prefId = prefResult[0].id;

        await connection.query(
          "INSERT INTO user_marketing_preferences (user_id, preference_id) VALUES(?,?)",
          [id, prefId]
        );
      }
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.release();
  }
}

async function deleteUser(id) {
  if (!id || typeof id !== "number") {
    throw new Error("Invalid ID");
  }

  const connection = await pool.getConnection();

  try {
    connection.beginTransaction();

    await connection.query(
      "DELETE FROM user_marketing_preferences WHERE ID=?",
      [id]
    );

    await connection.query("DELETE FROM users WHERE id=?", [id]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
