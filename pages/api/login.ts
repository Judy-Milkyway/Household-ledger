// pages/api/login.js
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import sequelize from "@/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const [results, metadata] = await sequelize.query(
      "SELECT * FROM users WHERE username = ?",
      {
        replacements: [username],
      }
    );

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const user = results[0];
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = sign(
      { userId: user.id, username: user.username },
      "your_jwt_secret",
      { expiresIn: "24h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
