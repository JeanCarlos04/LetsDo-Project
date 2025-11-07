import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authAcess = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Error to authenticate" });

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};
