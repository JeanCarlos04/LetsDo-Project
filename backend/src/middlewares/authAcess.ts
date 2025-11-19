import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import express from "express";

type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;
type RequestType = Request & {
  userId?: String;
};

dotenv.config();

export const authAcess = async (
  req: RequestType,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Error to authenticate" });

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.userId = decoded.id;
    next();
  });
};
