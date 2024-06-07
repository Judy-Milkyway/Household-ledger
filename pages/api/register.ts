// pages/api/register.js
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import sequelize from "@/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } =  req.body;

  console.log(username, password, req.body);

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const hashedPassword = await hash(password, 10);

    const [results, metadata] = await sequelize.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      {
        replacements: [username, hashedPassword],
      }
    );

    const user = { id: results, username };

    const token = sign({ userId: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
