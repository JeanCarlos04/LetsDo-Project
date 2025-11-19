import UserSchema from "../models/UserSchema.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";

type Request = express.Request;
type Response = express.Response;

export const Register = async (req: Request, res: Response) => {
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

export const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const foundedUser = await UserSchema.findOne({ email });
    if (!foundedUser)
      return res.status(404).json({ message: "User not found" });

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
  } catch (err) {
    console.error(err);
  }
};

interface RequestType extends Request {
  userId?: String;
}

export const getProfile = async (req: RequestType, res: Response) => {
  try {
    const myUser = await UserSchema.findById(req.userId).populate([
      { path: "notifications" },
    ]);
    if (!myUser) return res.status(404).json({ message: "User not found" });

    res.json(myUser);
  } catch (err) {
    console.error(err);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { updates } = req.body;

  try {
    const foundedUser = await UserSchema.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    );

    res.json(foundedUser);
  } catch (err) {
    console.error(err);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");

  res.status(200).json({ message: "Logged out successfully" });
};
