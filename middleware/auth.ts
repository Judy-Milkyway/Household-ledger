// middleware/auth.js
import { verify } from "jsonwebtoken";
import { NextApiRequest } from "next";

export default function auth(req: NextApiRequest, res, next) {
  const token = req.cookies.token;
    console.log(token)
  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  try {
    const decoded = verify(token, "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
