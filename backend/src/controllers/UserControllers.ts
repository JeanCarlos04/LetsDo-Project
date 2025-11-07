import UserSchema from "../models/UserSchema.ts";
import bcrypt from "bcryptjs";
import { populate } from "dotenv";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { user, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await UserSchema.create({
      user: user,
      user_alias: user,
      email: email,
      password: hashedPassword,
    });

    res.json(createdUser);
  } catch (err) {
    res.json({ message: "Error: " + err });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  const foundedUser = await UserSchema.findOne({ email });
  if (!foundedUser) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, foundedUser.password);
  if (!isMatch) return res.status(404).json({ message: "Invalid password" });

  const token = jwt.sign({ id: foundedUser._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.json({ message: "Logged succesfully" });
};

export const getProfile = async (req, res) => {
  const myUser = await UserSchema.findById(req.userId).populate([
    { path: "tasks" },
    { path: "notifications" },
  ]);
  if (!myUser) return res.status(404).json({ message: "User not found" });

  res.json(myUser);
};

export const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { updates } = req.body;

  const foundedUser = await UserSchema.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true }
  );

  res.json(foundedUser);
};
